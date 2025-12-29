# L910-Framework

## Вариант 9 — Лаборатория
**Сущности:**
- experiments.json — эксперименты (string: title, number: year, boolean: isSuccessful, Date: startedAt, Array: tags)
- scientists.json — учёные (string: name, number: age, boolean: isActive, Date: joinedAt, Array: skills)

**Маршруты:**
- GET /experiments, GET /experiments/:id, POST /experiments, PUT /experiments/:id, PATCH /experiments/:id, DELETE /experiments/:id
- GET /scientists, GET /scientists/:id, POST /scientists, PUT /scientists/:id, PATCH /scientists/:id, DELETE /scientists/:id

---

## Вариант 13 — Театр
**Сущности:**
- actors.json — актёры (string: name, number: age, boolean: isActive, Date: joinedAt, Array: skills)
- plays.json — пьесы (string: title, string: author, number: duration, boolean: isRunning, Array: actors)

**Маршруты:**
- GET /actors, GET /actors/:id, POST /actors, PUT /actors/:id, PATCH /actors/:id, DELETE /actors/:id
- GET /plays, GET /plays/:id, POST /plays, PUT /plays/:id, PATCH /plays/:id, DELETE /plays/:id

---

## Вариант 3 — Твич
**Сущности:**
- clips.json — клипы (string: title, number: streamerId, Date: createdAt, boolean: isPopular)
- streamers.json — стримеры (string: nickname, number: followers, boolean: isActive, Date: joinedAt, Array: games)

**Маршруты:**
- GET /clips, GET /clips/:id, POST /clips, PUT /clips/:id, PATCH /clips/:id, DELETE /clips/:id
- GET /streamers, GET /streamers/:id, POST /streamers, PUT /streamers/:id, PATCH /streamers/:id, DELETE /streamers/:id

---

## Вариант 21 — Электроника
**Сущности:**
- engineers.json — инженеры (string: name, number: age, boolean: isActive, Date: joinedAt, Array: specialization)
- equipment.json — оборудование (string: name, string: type, number: price, boolean: inStock, Array: specs)

**Маршруты:**
- GET /engineers, GET /engineers/:id, POST /engineers, PUT /engineers/:id, PATCH /engineers/:id, DELETE /engineers/:id
- GET /equipment, GET /equipment/:id, POST /equipment, PUT /equipment/:id, PATCH /equipment/:id, DELETE /equipment/:id
