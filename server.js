const { createApp } = require('./lib/framework');
const fs = require('fs');
const path = require('path');

const app = createApp();

// --- Лаборатория ---
const experimentsPath = path.join(__dirname, 'data/laboratory/experiments.json');

app.get('/experiments', (req, res) => {
  const data = JSON.parse(fs.readFileSync(experimentsPath, 'utf-8'));
  res.json(data);
});

app.get('/experiments/:id', (req, res) => {
  const data = JSON.parse(fs.readFileSync(experimentsPath, 'utf-8'));
  const exp = data.find(e => e.id == req.params.id);
  if (!exp) return res.status(404).json({ error: 'Experiment not found' });
  res.json(exp);
});

app.post('/experiments', (req, res) => {
  const data = JSON.parse(fs.readFileSync(experimentsPath, 'utf-8'));
  const newExp = req.body;
  if (!newExp.title || !newExp.year) {
    return res.status(400).json({ error: 'Invalid experiment payload' });
  }
  newExp.id = data.length ? data[data.length - 1].id + 1 : 1;
  data.push(newExp);
  fs.writeFileSync(experimentsPath, JSON.stringify(data, null, 2));
  res.status(201).json(newExp);
});

app.put('/experiments/:id', (req, res) => {
  const data = JSON.parse(fs.readFileSync(experimentsPath, 'utf-8'));
  const idx = data.findIndex(e => e.id == req.params.id);
  if (idx === -1) return res.status(404).json({ error: 'Experiment not found' });
  const updated = { ...req.body, id: data[idx].id };
  data[idx] = updated;
  fs.writeFileSync(experimentsPath, JSON.stringify(data, null, 2));
  res.json(updated);
});

app.patch('/experiments/:id', (req, res) => {
  const data = JSON.parse(fs.readFileSync(experimentsPath, 'utf-8'));
  const exp = data.find(e => e.id == req.params.id);
  if (!exp) return res.status(404).json({ error: 'Experiment not found' });
  Object.assign(exp, req.body);
  fs.writeFileSync(experimentsPath, JSON.stringify(data, null, 2));
  res.json(exp);
});

app.delete('/experiments/:id', (req, res) => {
  const data = JSON.parse(fs.readFileSync(experimentsPath, 'utf-8'));
  const idx = data.findIndex(e => e.id == req.params.id);
  if (idx === -1) return res.status(404).json({ error: 'Experiment not found' });
  const deleted = data.splice(idx, 1);
  fs.writeFileSync(experimentsPath, JSON.stringify(data, null, 2));
  res.json(deleted[0]);
});

const scientistsPath = path.join(__dirname, 'data/laboratory/scientists.json');

app.get('/scientists', (req, res) => {
  const data = JSON.parse(fs.readFileSync(scientistsPath, 'utf-8'));
  res.json(data);
});

app.get('/scientists/:id', (req, res) => {
  const data = JSON.parse(fs.readFileSync(scientistsPath, 'utf-8'));
  const sci = data.find(s => s.id == req.params.id);
  if (!sci) return res.status(404).json({ error: 'Scientist not found' });
  res.json(sci);
});

app.post('/scientists', (req, res) => {
  const data = JSON.parse(fs.readFileSync(scientistsPath, 'utf-8'));
  const newSci = req.body;
  if (!newSci.name || !newSci.age) {
    return res.status(400).json({ error: 'Invalid scientist payload' });
  }
  newSci.id = data.length ? data[data.length - 1].id + 1 : 1;
  data.push(newSci);
  fs.writeFileSync(scientistsPath, JSON.stringify(data, null, 2));
  res.status(201).json(newSci);
});

app.put('/scientists/:id', (req, res) => {
  const data = JSON.parse(fs.readFileSync(scientistsPath, 'utf-8'));
  const idx = data.findIndex(s => s.id == req.params.id);
  if (idx === -1) return res.status(404).json({ error: 'Scientist not found' });
  const updated = { ...req.body, id: data[idx].id };
  data[idx] = updated;
  fs.writeFileSync(scientistsPath, JSON.stringify(data, null, 2));
  res.json(updated);
});

app.patch('/scientists/:id', (req, res) => {
  const data = JSON.parse(fs.readFileSync(scientistsPath, 'utf-8'));
  const sci = data.find(s => s.id == req.params.id);
  if (!sci) return res.status(404).json({ error: 'Scientist not found' });
  Object.assign(sci, req.body);
  fs.writeFileSync(scientistsPath, JSON.stringify(data, null, 2));
  res.json(sci);
});

app.delete('/scientists/:id', (req, res) => {
  const data = JSON.parse(fs.readFileSync(scientistsPath, 'utf-8'));
  const idx = data.findIndex(s => s.id == req.params.id);
  if (idx === -1) return res.status(404).json({ error: 'Scientist not found' });
  const deleted = data.splice(idx, 1);
  fs.writeFileSync(scientistsPath, JSON.stringify(data, null, 2));
  res.json(deleted[0]);
});

// --- Запуск ---
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
