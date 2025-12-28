// Работа с JSON-файлами: чтение/запись/CRUD
const fs = require('fs');
const path = require('path');

function ensureFile(filePath) {
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, '[]', 'utf-8');
  }
}

function readAll(filePath) {
  ensureFile(filePath);
  const raw = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(raw || '[]');
}

function writeAll(filePath, arr) {
  fs.writeFileSync(filePath, JSON.stringify(arr, null, 2), 'utf-8');
}

function getById(filePath, id) {
  const all = readAll(filePath);
  return all.find(x => String(x.id) === String(id)) || null;
}

function addItem(filePath, item) {
  const all = readAll(filePath);
  const nextId = generateNextId(all);
  const newItem = { ...item, id: nextId };
  all.push(newItem);
  writeAll(filePath, all);
  return newItem;
}

function replaceItem(filePath, id, newItem) {
  const all = readAll(filePath);
  const idx = all.findIndex(x => String(x.id) === String(id));
  if (idx === -1) return null;
  all[idx] = { ...newItem, id: Number(id) };
  writeAll(filePath, all);
  return all[idx];
}

function patchItem(filePath, id, patchFn) {
  const all = readAll(filePath);
  const idx = all.findIndex(x => String(x.id) === String(id));
  if (idx === -1) return null;
  const current = all[idx];
  const patched = patchFn(current);
  all[idx] = patched;
  writeAll(filePath, all);
  return patched;
}

function deleteItem(filePath, id) {
  const all = readAll(filePath);
  const idx = all.findIndex(x => String(x.id) === String(id));
  if (idx === -1) return false;
  all.splice(idx, 1);
  writeAll(filePath, all);
  return true;
}

function generateNextId(all) {
  const max = all.reduce((m, x) => Math.max(m, Number(x.id) || 0), 0);
  return max + 1;
}

module.exports = {
  readAll, getById, addItem, replaceItem, patchItem, deleteItem,
};
