# L910-Framework

## Вариант 9 — Лаборатория
**Сущности:**
- experiments.json — эксперименты (string: title, number: year, boolean: isSuccessful, Date: startedAt, Array: tags)
- scientists.json — учёные (string: name, number: age, boolean: isActive, Date: joinedAt, Array: skills)

**Маршруты:**
- GET /experiments, GET /experiments/:id, POST /experiments, PUT /experiments/:id, PATCH /experiments/:id, DELETE /experiments/:id
- GET /scientists, GET /scientists/:id, POST /scientists, PUT /scientists/:id, PATCH /scientists/:id, DELETE /scientists/:id

---