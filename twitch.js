const { createApp } = require('./lib/framework');
const fs = require('fs');
const path = require('path');

const app = createApp();

// --- STREAMERS ---
const streamersPath = path.join(__dirname, 'data/streamers.json');

app.get('/streamers', (req, res) => {
  const data = JSON.parse(fs.readFileSync(streamersPath, 'utf-8'));
  res.json(data);
});

app.get('/streamers/:id', (req, res) => {
  const data = JSON.parse(fs.readFileSync(streamersPath, 'utf-8'));
  const streamer = data.find(s => s.id == req.params.id);
  if (!streamer) return res.status(404).json({ error: 'Streamer not found' });
  res.json(streamer);
});

app.post('/streamers', (req, res) => {
  const data = JSON.parse(fs.readFileSync(streamersPath, 'utf-8'));
  const newStreamer = req.body;
  if (!newStreamer.nickname || !newStreamer.game) {
    return res.status(400).json({ error: 'Invalid streamer payload' });
  }
  newStreamer.id = data.length ? data[data.length - 1].id + 1 : 1;
  data.push(newStreamer);
  fs.writeFileSync(streamersPath, JSON.stringify(data, null, 2));
  res.status(201).json(newStreamer);
});

app.put('/streamers/:id', (req, res) => {
  let data = JSON.parse(fs.readFileSync(streamersPath, 'utf-8'));
  const idx = data.findIndex(s => s.id == req.params.id);
  if (idx === -1) return res.status(404).json({ error: 'Streamer not found' });
  const updated = { ...req.body, id: data[idx].id };
  data[idx] = updated;
  fs.writeFileSync(streamersPath, JSON.stringify(data, null, 2));
  res.json(updated);
});

app.patch('/streamers/:id', (req, res) => {
  let data = JSON.parse(fs.readFileSync(streamersPath, 'utf-8'));
  const streamer = data.find(s => s.id == req.params.id);
  if (!streamer) return res.status(404).json({ error: 'Streamer not found' });
  Object.assign(streamer, req.body);
  fs.writeFileSync(streamersPath, JSON.stringify(data, null, 2));
  res.json(streamer);
});

app.delete('/streamers/:id', (req, res) => {
  let data = JSON.parse(fs.readFileSync(streamersPath, 'utf-8'));
  const idx = data.findIndex(s => s.id == req.params.id);
  if (idx === -1) return res.status(404).json({ error: 'Streamer not found' });
  const deleted = data.splice(idx, 1);
  fs.writeFileSync(streamersPath, JSON.stringify(data, null, 2));
  res.json(deleted[0]);
});

// --- CLIPS ---
const clipsPath = path.join(__dirname, 'data/clips.json');

app.get('/clips', (req, res) => {
  const data = JSON.parse(fs.readFileSync(clipsPath, 'utf-8'));
  res.json(data);
});

app.get('/clips/:id', (req, res) => {
  const data = JSON.parse(fs.readFileSync(clipsPath, 'utf-8'));
  const clip = data.find(c => c.id == req.params.id);
  if (!clip) return res.status(404).json({ error: 'Clip not found' });
  res.json(clip);
});

app.post('/clips', (req, res) => {
  const data = JSON.parse(fs.readFileSync(clipsPath, 'utf-8'));
  const newClip = req.body;
  if (!newClip.title || !newClip.streamerId) {
    return res.status(400).json({ error: 'Invalid clip payload' });
  }
  newClip.id = data.length ? data[data.length - 1].id + 1 : 1;
  data.push(newClip);
  fs.writeFileSync(clipsPath, JSON.stringify(data, null, 2));
  res.status(201).json(newClip);
});

app.put('/clips/:id', (req, res) => {
  let data = JSON.parse(fs.readFileSync(clipsPath, 'utf-8'));
  const idx = data.findIndex(c => c.id == req.params.id);
  if (idx === -1) return res.status(404).json({ error: 'Clip not found' });
  const updated = { ...req.body, id: data[idx].id };
  data[idx] = updated;
  fs.writeFileSync(clipsPath, JSON.stringify(data, null, 2));
  res.json(updated);
});

app.patch