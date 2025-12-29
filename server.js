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

// --- Твич ---
const clipsPath = path.join(__dirname, 'data/twitch/clips.json');
const streamersPath = path.join(__dirname, 'data/twitch/streamers.json');

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
  const data = JSON.parse(fs.readFileSync(clipsPath, 'utf-8'));
  const idx = data.findIndex(c => c.id == req.params.id);
  if (idx === -1) return res.status(404).json({ error: 'Clip not found' });
  const updated = { ...req.body, id: data[idx].id };
  data[idx] = updated;
  fs.writeFileSync(clipsPath, JSON.stringify(data, null, 2));
  res.json(updated);
});

app.patch('/clips/:id', (req, res) => {
  const data = JSON.parse(fs.readFileSync(clipsPath, 'utf-8'));
  const clip = data.find(c => c.id == req.params.id);
  if (!clip) return res.status(404).json({ error: 'Clip not found' });
  Object.assign(clip, req.body);
  fs.writeFileSync(clipsPath, JSON.stringify(data, null, 2));
  res.json(clip);
});

app.delete('/clips/:id', (req, res) => {
  const data = JSON.parse(fs.readFileSync(clipsPath, 'utf-8'));
  const idx = data.findIndex(c => c.id == req.params.id);
  if (idx === -1) return res.status(404).json({ error: 'Clip not found' });
  const deleted = data.splice(idx, 1);
  fs.writeFileSync(clipsPath, JSON.stringify(data, null, 2));
  res.json(deleted[0]);
});

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
  if (!newStreamer.nickname || !newStreamer.followers) {
    return res.status(400).json({ error: 'Invalid streamer payload' });
  }
  newStreamer.id = data.length ? data[data.length - 1].id + 1 : 1;
  data.push(newStreamer);
  fs.writeFileSync(streamersPath, JSON.stringify(data, null, 2));
  res.status(201).json(newStreamer);
});

app.put('/streamers/:id', (req, res) => {
  const data = JSON.parse(fs.readFileSync(streamersPath, 'utf-8'));
  const idx = data.findIndex(s => s.id == req.params.id);
  if (idx === -1) return res.status(404).json({ error: 'Streamer not found' });
  const updated = { ...req.body, id: data[idx].id };
  data[idx] = updated;
  fs.writeFileSync(streamersPath, JSON.stringify(data, null, 2));
  res.json(updated);
});

app.patch('/streamers/:id', (req, res) => {
  const data = JSON.parse(fs.readFileSync(streamersPath, 'utf-8'));
  const streamer = data.find(s => s.id == req.params.id);
  if (!streamer) return res.status(404).json({ error: 'Streamer not found' });
  Object.assign(streamer, req.body);
  fs.writeFileSync(streamersPath, JSON.stringify(data, null, 2));
  res.json(streamer);
});

app.delete('/streamers/:id', (req, res) => {
  const data = JSON.parse(fs.readFileSync(streamersPath, 'utf-8'));
  const idx = data.findIndex(s => s.id == req.params.id);
  if (idx === -1) return res.status(404).json({ error: 'Streamer not found' });
  const deleted = data.splice(idx, 1);
  fs.writeFileSync(streamersPath, JSON.stringify(data, null, 2));
  res.json(deleted[0]);
});

// --- Театр ---
const actorsFile = path.join(__dirname, 'data/theatre/actors.json');
const playsFile = path.join(__dirname, 'data/theatre/plays.json');

app.get("/actors", (req, res) => {
  try {
    const data = JSON.parse(fs.readFileSync(actorsFile, "utf8"));
    res.json(data);
  } catch {
    res.json([]);
  }
});

app.get("/actors/:id", (req, res) => {
  const id = Number(req.params.id);
  const data = JSON.parse(fs.readFileSync(actorsFile, "utf8"));
  const actor = data.find(a => a.id === id);
  if (!actor) return res.status(404).json({ error: "Actor not found" });
  res.json(actor);
});

app.post("/actors", (req, res) => {
  const data = JSON.parse(fs.readFileSync(actorsFile, "utf8"));
  const payload = req.body || {};
  if (!payload.name || payload.age == null) {
    return res.status(400).json({ error: "Invalid actor payload" });
  }
  payload.id = data.length ? data[data.length - 1].id + 1 : 1;
  data.push(payload);
  fs.writeFileSync(actorsFile, JSON.stringify(data, null, 2), "utf8");
  res.status(201).json(payload);
});

app.put("/actors/:id", (req, res) => {
  const id = Number(req.params.id);
  let data = JSON.parse(fs.readFileSync(actorsFile, "utf8"));
  const index = data.findIndex(a => a.id === id);
  if (index === -1) return res.status(404).json({ error: "Actor not found" });

  const updated = { ...req.body, id };
  if (!updated.name || updated.age == null) {
    return res.status(400).json({ error: "Missing required fields" });
  }
  data[index] = updated;
  fs.writeFileSync(actorsFile, JSON.stringify(data, null, 2), "utf8");
  res.json(updated);
});

app.patch("/actors/:id", (req, res) => {
  const id = Number(req.params.id);
  let data = JSON.parse(fs.readFileSync(actorsFile, "utf8"));
  const index = data.findIndex(a => a.id === id);
  if (index === -1) return res.status(404).json({ error: "Actor not found" });

  data[index] = { ...data[index], ...req.body, id };
  fs.writeFileSync(actorsFile, JSON.stringify(data, null, 2), "utf8");
  res.json(data[index]);
});

app.delete("/actors/:id", (req, res) => {
  const id = Number(req.params.id);
  let data = JSON.parse(fs.readFileSync(actorsFile, "utf8"));
  const index = data.findIndex(a => a.id === id);
  if (index === -1) return res.status(404).json({ error: "Actor not found" });

  const [deleted] = data.splice(index, 1);
  fs.writeFileSync(actorsFile, JSON.stringify(data, null, 2), "utf8");
  res.json(deleted);
});

app.get("/plays", (req, res) => {
  try {
    const data = JSON.parse(fs.readFileSync(playsFile, "utf8"));
    res.json(data);
  } catch {
    res.json([]);
  }
});

app.get("/plays/:id", (req, res) => {
  const id = Number(req.params.id);
  const data = JSON.parse(fs.readFileSync(playsFile, "utf8"));
  const play = data.find(p => p.id === id);
  if (!play) return res.status(404).json({ error: "Play not found" });
  res.json(play);
});

app.post("/plays", (req, res) => {
  const data = JSON.parse(fs.readFileSync(playsFile, "utf8"));
  const payload = req.body || {};
  if (!payload.title || !payload.author) {
    return res.status(400).json({ error: "Invalid play payload" });
  }
  payload.id = data.length ? data[data.length - 1].id + 1 : 1;
  if (!Array.isArray(payload.actors)) payload.actors = [];
  data.push(payload);
  fs.writeFileSync(playsFile, JSON.stringify(data, null, 2), "utf8");
  res.status(201).json(payload);
});

app.put("/plays/:id", (req, res) => {
  const id = Number(req.params.id);
  let data = JSON.parse(fs.readFileSync(playsFile, "utf8"));
  const index = data.findIndex(p => p.id === id);
  if (index === -1) return res.status(404).json({ error: "Play not found" });

  const updated = { ...req.body, id };
  if (!updated.title || !updated.author || updated.duration == null) {
    return res.status(400).json({ error: "Missing required fields" });
  }
  if (!Array.isArray(updated.actors)) updated.actors = [];
  data[index] = updated;
  fs.writeFileSync(playsFile, JSON.stringify(data, null, 2), "utf8");
  res.json(updated);
});

app.patch("/plays/:id", (req, res) => {
  const id = Number(req.params.id);
  let data = JSON.parse(fs.readFileSync(playsFile, "utf8"));
  const index = data.findIndex(p => p.id === id);
  if (index === -1) return res.status(404).json({ error: "Play not found" });

  data[index] = { ...data[index], ...req.body, id };
  fs.writeFileSync(playsFile, JSON.stringify(data, null, 2), "utf8");
  res.json(data[index]);
});

app.delete("/plays/:id", (req, res) => {
  const id = Number(req.params.id);
  let data = JSON.parse(fs.readFileSync(playsFile, "utf8"));
  const index = data.findIndex(p => p.id === id);
  if (index === -1) return res.status(404).json({ error: "Play not found" });

  const [deleted] = data.splice(index, 1);
  fs.writeFileSync(playsFile, JSON.stringify(data, null, 2), "utf8");
  res.json(deleted);
});

// --- Электроника ---
const engineersPath = path.join(__dirname, 'data/electronics/engineers.json');
const equipmentPath = path.join(__dirname, 'data/electronics/equipment.json');

app.get('/engineers', (req, res) => {
  const data = JSON.parse(fs.readFileSync(engineersPath, 'utf8'));
  res.json(data);
});

app.get('/engineers/:id', (req, res) => {
  const data = JSON.parse(fs.readFileSync(engineersPath, 'utf8'));
  const engineer = data.find(e => e.id == req.params.id);
  if (!engineer) return res.status(404).json({ error: 'Engineer not found' });
  res.json(engineer);
});

app.post('/engineers', (req, res) => {
  const data = JSON.parse(fs.readFileSync(engineersPath, 'utf8'));
  const newEngineer = req.body;
  if (!newEngineer.name || !newEngineer.specialization) {
    return res.status(400).json({ error: 'Invalid engineer payload' });
  }
  newEngineer.id = data.length ? data[data.length - 1].id + 1 : 1;
  data.push(newEngineer);
  fs.writeFileSync(engineersPath, JSON.stringify(data, null, 2));
  res.status(201).json(newEngineer);
});

app.put('/engineers/:id', (req, res) => {
  const data = JSON.parse(fs.readFileSync(engineersPath, 'utf8'));
  const idx = data.findIndex(e => e.id == req.params.id);
  if (idx === -1) return res.status(404).json({ error: 'Engineer not found' });

  const updated = { ...req.body, id: data[idx].id };
  data[idx] = updated;
  fs.writeFileSync(engineersPath, JSON.stringify(data, null, 2));
  res.json(updated);
});

app.patch('/engineers/:id', (req, res) => {
  const data = JSON.parse(fs.readFileSync(engineersPath, 'utf8'));
  const engineer = data.find(e => e.id == req.params.id);
  if (!engineer) return res.status(404).json({ error: 'Engineer not found' });

  Object.assign(engineer, req.body);
  fs.writeFileSync(engineersPath, JSON.stringify(data, null, 2));
  res.json(engineer);
});

app.delete('/engineers/:id', (req, res) => {
  const data = JSON.parse(fs.readFileSync(engineersPath, 'utf8'));
  const idx = data.findIndex(e => e.id == req.params.id);
  if (idx === -1) return res.status(404).json({ error: 'Engineer not found' });

  const deleted = data.splice(idx, 1);
  fs.writeFileSync(engineersPath, JSON.stringify(data, null, 2));
  res.json(deleted[0]);
});

app.get('/equipment', (req, res) => {
  const data = JSON.parse(fs.readFileSync(equipmentPath, 'utf8'));
  res.json(data);
});

app.get('/equipment/:id', (req, res) => {
  const data = JSON.parse(fs.readFileSync(equipmentPath, 'utf8'));
  const item = data.find(eq => eq.id == req.params.id);
  if (!item) return res.status(404).json({ error: 'Equipment not found' });
  res.json(item);
});

app.post('/equipment', (req, res) => {
  const data = JSON.parse(fs.readFileSync(equipmentPath, 'utf8'));
  const newItem = req.body;
  if (!newItem.name || !newItem.type) {
    return res.status(400).json({ error: 'Invalid equipment payload' });
  }
  newItem.id = data.length ? data[data.length - 1].id + 1 : 1;
  data.push(newItem);
  fs.writeFileSync(equipmentPath, JSON.stringify(data, null, 2));
  res.status(201).json(newItem);
});

app.put('/equipment/:id', (req, res) => {
  const data = JSON.parse(fs.readFileSync(equipmentPath, 'utf8'));
  const idx = data.findIndex(eq => eq.id == req.params.id);
  if (idx === -1) return res.status(404).json({ error: 'Equipment not found' });

  const updated = { ...req.body, id: data[idx].id };
  data[idx] = updated;
  fs.writeFileSync(equipmentPath, JSON.stringify(data, null, 2));
  res.json(updated);
});

app.patch('/equipment/:id', (req, res) => {
  const data = JSON.parse(fs.readFileSync(equipmentPath, 'utf8'));
  const item = data.find(eq => eq.id == req.params.id);
  if (!item) return res.status(404).json({ error: 'Equipment not found' });

  Object.assign(item, req.body);
  fs.writeFileSync(equipmentPath, JSON.stringify(data, null, 2));
  res.json(item);
});

app.delete('/equipment/:id', (req, res) => {
  const data = JSON.parse(fs.readFileSync(equipmentPath, 'utf8'));
  const idx = data.findIndex(eq => eq.id == req.params.id);
  if (idx === -1) return res.status(404).json({ error: 'Equipment not found' });

  const deleted = data.splice(idx, 1);
  fs.writeFileSync(equipmentPath, JSON.stringify(data, null, 2));
  res.json(deleted[0]);
});

// --- Запуск ---
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
