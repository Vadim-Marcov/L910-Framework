// Мини-фреймворк без внешних библиотек
const http = require('http');
const url = require('url');

function createApp() {
  const routes = [];
  const middlewares = [];
  let errorHandler = null;

  function addRoute(method, path, handler) {
    const parts = path.split('/').filter(Boolean);
    routes.push({ method: method.toUpperCase(), pathParts: parts, handler });
  }

  function matchRoute(method, pathname) {
    const reqParts = pathname.split('/').filter(Boolean);
    for (const r of routes) {
      if (r.method !== method.toUpperCase()) continue;
      if (r.pathParts.length !== reqParts.length) continue;
      const params = {};
      let ok = true;
      for (let i = 0; i < r.pathParts.length; i++) {
        const rp = r.pathParts[i];
        const qp = reqParts[i];
        if (rp.startsWith(':')) {
          params[rp.slice(1)] = decodeURIComponent(qp);
        } else if (rp !== qp) {
          ok = false;
          break;
        }
      }
      if (ok) return { route: r, params };
    }
    return null;
  }

  async function parseBody(req) {
    return new Promise((resolve, reject) => {
      let data = '';
      req.on('data', chunk => { data += chunk; });
      req.on('end', () => {
        if (!data) return resolve(null);
        const ct = req.headers['content-type'] || '';
        if (ct.includes('application/json')) {
          try { resolve(JSON.parse(data)); } catch (e) { reject(e); }
        } else if (ct.includes('application/x-www-form-urlencoded')) {
          const obj = {};
          data.split('&').forEach(pair => {
            const [k, v] = pair.split('=');
            obj[decodeURIComponent(k)] = decodeURIComponent(v || '');
          });
          resolve(obj);
        } else {
          resolve(data);
        }
      });
      req.on('error', reject);
    });
  }

  function enhanceRes(res) {
    res.status = function(code) {
      res.statusCode = code;
      return res;
    };
    res.send = function(data) {
      if (typeof data === 'object' && !Buffer.isBuffer(data)) {
        res.setHeader('Content-Type', 'application/json; charset=utf-8');
        res.end(JSON.stringify(data));
      } else {
        res.end(data);
      }
    };
    res.json = function(obj) {
      res.setHeader('Content-Type', 'application/json; charset=utf-8');
      res.end(JSON.stringify(obj));
    };
  }

  async function handle(req, res) {
    const { pathname, query } = url.parse(req.url, true);
    req.query = query || {};
    enhanceRes(res);

    let idx = 0;
    const next = (err) => {
      if (err) {
        if (errorHandler) return errorHandler(err, req, res, () => {});
        res.statusCode = 500;
        return res.end(JSON.stringify({ error: 'Internal Server Error', details: String(err) }));
      }
      if (idx < middlewares.length) {
        const mw = middlewares[idx++];
        try { mw(req, res, next); } catch (e) { next(e); }
      } else {
        dispatch();
      }
    };

    async function dispatch() {
      const match = matchRoute(req.method, pathname);
      if (!match) {
        res.status(404).json({ error: 'Not Found' });
        return;
      }
      req.params = match.params;
      try {
        if (['POST', 'PUT', 'PATCH'].includes(req.method)) {
          req.body = await parseBody(req);
        } else {
          req.body = null;
        }
        await match.route.handler(req, res);
      } catch (e) {
        if (errorHandler) return errorHandler(e, req, res, () => {});
        res.status(500).json({ error: 'Internal Server Error', details: e.message });
      }
    }

    next();
  }

  const app = {
    use(fn) { middlewares.push(fn); },
    get: (path, h) => addRoute('GET', path, h),
    post: (path, h) => addRoute('POST', path, h),
    put: (path, h) => addRoute('PUT', path, h),
    patch: (path, h) => addRoute('PATCH', path, h),
    delete: (path, h) => addRoute('DELETE', path, h),
    onError(fn) { errorHandler = fn; },
    listen(port, cb) {
      const server = http.createServer(handle);
      server.listen(port, cb);
      return server;
    },
  };

  return app;
}

module.exports = { createApp };
