# sorvibank_fr_bc

## Что это за проект

Sorvibank — **не банковское приложение**, а городская квест-игра ("сорви куш"): в городе прячут код,
кто первый нашёл его и ввёл в приложении — победил и получил денежный приз. Название и часть вёрстки
(лендинг) используют банковскую эстетику как обёртку, но доменная модель — игровая (раунды, зоны карты,
коды, призы), а не финансовая (счета, переводы).

Игровая механика (раунды, карта, коды, призовой фонд) **пока не спроектирована и не реализована** —
сделан только фундамент авторизации.

## Структура монорепо

```
sorvibank_fr_bc/
  frontend/   — React 19 + TypeScript + Vite (готова вёрстка, backend пока не подключён)
  backend/    — Node.js + Express + TypeScript + Prisma + PostgreSQL (реализована авторизация)
  docker-compose.yml — только Postgres, для локальной разработки
```

Нет workspaces/turborepo/nx — `frontend` и `backend` полностью независимые npm-проекты в одном git-репозитории.

## Frontend

Стек: **React 19 + TypeScript + Vite 6**, роутинг — **react-router v7** (`BrowserRouter`), формы —
**react-hook-form**. State-менеджера нет. HTTP-клиента (axios/fetch) и хранения токена **пока нет вообще** —
все `onSubmit` в формах делают `console.log(data)` и локальную навигацию, реальных запросов к API не отправляется.

Структура (`frontend/src`):
- `pages/` — Home, Login, Restore, SignUp
- `components/LoginForm`, `RegistrationForm`, `RestoreForm`, `ResetForm` — auth-формы, готовы к подключению к backend
- `components/Header` — есть ссылка `/account` (личный кабинет), но сама страница ещё не создана
- `components/FirstScreen` содержит заготовку auth-состояния: `const [user] = useState(false)` — точка, где появится реальный auth-контекст

Поля форм (это и есть DTO, на которые backend уже ориентируется):
- Login: `login` (email), `password` (min 8)
- Register: `name` (кириллица, min 2), `phone` (маска `+7 (999) 999-99-99`), `login` (email), `password` + `passwordAgain`
- Restore: `login` (email) — **важно:** переход на `/reset-password` происходит без передачи email (ни state, ни query)
- Reset: `code` (6 цифр), `password` + `passwordAgain`

Backend к фронту пока не подключён — это следующий отдельный шаг (пользователь планирует делать его сам,
периодически привлекая Claude).

## Backend

Стек: **Node.js + Express 5 + TypeScript + PostgreSQL + Prisma 6 + JWT (jsonwebtoken) + bcrypt**.

### Структура (`backend/src`)

```
routes/{index.ts, auth.routes.ts}
controllers/auth.controller.ts
models/{prisma.ts, user.model.ts, refreshToken.model.ts, passwordResetCode.model.ts}
middleware/{AppError.ts, asyncHandler.ts, errorHandler.ts, auth.middleware.ts, csrf.middleware.ts}
validation/auth.validation.ts   — zod-схемы, зеркалят правила фронтовых форм
utils/{tokens.ts, cookies.ts}
```

`prisma/schema.prisma` — схема БД физически обязана лежать здесь (требование Prisma CLI), а `src/models/*.model.ts` —
это data-access слой (обёртки над `PrismaClient`), не сама схема.

### Модели БД

- `User` — id (uuid), email (unique), phone (unique, нормализован до 11 цифр), passwordHash, name?, role (`USER`/`ADMIN`, дефолт `USER`), emailVerified (дефолт false), createdAt/updatedAt
- `RefreshToken` — userId, tokenHash (sha256 от случайного токена), deviceInfo, ipAddress, expiresAt, revokedAt
- `EmailVerificationToken` — задел на будущее, эндпоинтов верификации email пока нет
- `PasswordResetCode` — 6-значный код восстановления пароля, TTL 15 мин, одноразовый

### Архитектура авторизации

Полноценная production-grade cookie-based схема (не просто один JWT):

- **Access-токен** — JWT (`sub`, `role`), 15 минут, в httpOnly cookie `access_token`
- **Refresh-токен** — случайная строка (не JWT), 30 дней, в httpOnly cookie `refresh_token` (path `/api/auth`), в БД хранится только sha256-хеш
- **Ротация**: каждый `POST /refresh` отзывает старый refresh-токен и выдаёт новую пару
- **Reuse-детекция**: если пришёл уже отозванный refresh-токен (признак кражи) — отзываются **все** сессии пользователя
- **CSRF**: double-submit cookie — non-httpOnly `csrf_token` cookie должен совпадать с заголовком `X-CSRF-Token`. Защищены только `/refresh`, `/logout`, `/logout-all`, `DELETE /sessions/:id` (у `/register`/`/login` сессии ещё нет, атака неприменима)
- **Мультисессии**: `GET /sessions` — список активных сессий текущего юзера (без самих токенов), `DELETE /sessions/:id` — отозвать одну (только свою)
- В dev (`NODE_ENV=development`) cookies выставляются без флага `Secure` (иначе не потестировать по http/curl); в проде — обязательно `Secure`.

### Эндпоинты (`/api/auth/*`)

`POST /register`, `POST /login`, `GET /csrf-token`, `POST /refresh`, `POST /logout`, `POST /logout-all`,
`GET /sessions`, `DELETE /sessions/:id`, `GET /me`, `POST /restore`, `POST /reset-password`.

Восстановление пароля: код генерируется и **логируется в консоль сервера** (`[DEV] Код восстановления для ...`) —
реальная отправка email не подключена, есть `// TODO` в `auth.controller.ts` (`restore`).

Ошибки — через `AppError` + централизованный `errorHandler` (`ZodError`→400, Prisma `P2002`→409, `AppError`→свой код, иначе→500).

## Локальный запуск

```bash
# из корня — поднять Postgres (порт 5433 снаружи, чтобы не конфликтовать с локальным Postgres на 5432)
docker compose up -d

cd backend
npm run dev              # tsx watch, сервер на :4000
npm run prisma:migrate   # применить миграции после изменения schema.prisma
npm run prisma:studio    # GUI для просмотра БД
```

`.env` в `backend/` (не в git, см. `.env.example`): `DATABASE_URL`, `NODE_ENV`, `PORT`, `CORS_ORIGIN`,
`JWT_ACCESS_SECRET`, `ACCESS_TOKEN_TTL_MIN`, `REFRESH_TOKEN_TTL_DAYS`, `RESET_CODE_TTL_MINUTES`.

## Технические особенности / грабли

- **Prisma запинена на 6.19.3** (и `prisma`, и `@prisma/client`) — Prisma 7 ломает обратную совместимость
  (`datasource { url = env(...) }` в schema.prisma больше не поддерживается, требует driver adapters
  и `prisma.config.ts`). При `npm install prisma` без версии подтянется 7 — не обновлять без сознательного решения.
- **TypeScript** установлен v7 — `moduleResolution` в `tsconfig.json` должен быть `"bundler"`, не `"node"`
  (опция `node`/`node10` удалена в TS7).
- **Express 5** (не 4) — обратно совместим для текущего простого роутинга, но path-to-regexp в v5 строже
  (именованные wildcard-параметры и т.д.) — учитывать при добавлении новых роутов с параметрами.
- Backend полностью не завязан на `Authorization`-заголовок — авторизация только через httpOnly cookies,
  поэтому CORS обязателен с `credentials: true` и явным `CORS_ORIGIN` (нельзя `*`).

## Что не сделано (следующие шаги)

- Подключение фронта к реальным API-запросам (fetch с `credentials: 'include'`, чтение CSRF-cookie,
  auth-состояние, protected route для `/account`) — фронт сейчас **не трогаем**, это отдельная задача.
- Игровая механика: раунды, зоны карты, коды, призы, лидерборд — ещё не спроектирована.
- Верификация email (`EmailVerificationToken` в схеме есть, эндпоинтов нет).
- Admin-логика (`role: ADMIN` в схеме есть, реальных прав/мидлвары нет).
- Реальная отправка email (восстановление пароля сейчас только логируется в консоль).
- Полная докеризация (Dockerfile для backend/frontend, prod docker-compose) для деплоя — Postgres в Docker сейчас только для локальной разработки.
