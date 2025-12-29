# L910-Framework

## Вариант 9 — Лаборатория
**Сущности:**
- experiments.json — эксперименты (string: title, number: year, boolean: isSuccessful, Date: startedAt, Array: tags)
- scientists.json — учёные (string: name, number: age, boolean: isActive, Date: joinedAt, Array: skills)

**Маршруты:**
- GET /experiments, GET /experiments/:id, POST /experiments, PUT /experiments/:id, PATCH /experiments/:id, DELETE /experiments/:id
- GET /scientists, GET /scientists/:id, POST /scientists, PUT /scientists/:id, PATCH /scientists/:id, DELETE /scientists/:id

**Сущности:**
- clips.json — клипы (string: title, number: streamerId, boolean: isPopular, Date: createdAt, Array: tags)
- streamers.json — стримеры (string: nickname, number: followers, boolean: isOnline, Date: joinedAt, Array: categories)

**Маршруты:**
- GET /clips, GET /clips/:id, POST /clips, PUT /clips/:id, PATCH /clips/:id, DELETE /clips/:id
- GET /streamers, GET /streamers/:id, POST /streamers, PUT /streamers/:id, PATCH /streamers/:id, DELETE /streamers/:id
