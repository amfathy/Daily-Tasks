# Daily Tasks

## Features

- Role-based authentication (JWT)
  - **Secretary office (`secretary`)**: view past days, upcoming days and next month; add and delete tasks.
  - **Head office (`head`)**: view 3 / 7 / 15 / 30 days at once; delete tasks.
- Mark tasks as done (both roles).
- Each day card resizes according to its content, so empty days don't waste space.
- Today's card is highlighted.

## Tech Stack

- **Backend:** Node.js, Express, TypeScript, MongoDB (Mongoose), Zod, JWT
- **Frontend:** React (Vite)

## Project Structure

```
daily-tasks/
├── backend/src/
│   ├── controllers/   each controller has its own service
│   ├── services/      business logic and database access
│   ├── routes/
│   ├── models/
│   ├── middlewares/   auth, validate, error
│   ├── validation/    Zod schemas
│   ├── index.ts
│   └── seed.ts        creates the default users
└── frontend/src/
    ├── components/    Login, Navbar, DayCard
    ├── pages/         SecretaryPage, HeadPage
    ├── hooks/         useTasks
    └── api.js
```

## Requirements

- Node.js
- MongoDB running on the server machine

## Installation & Running

### 1) Backend setup

```bash
cd backend
npm install
```

Create `backend/.env`:

```
PORT=3000
MONGO_URI=mongodb://127.0.0.1:27017/daily-tasks
JWT_SECRET_KEY=your_secret_key_here
```

Create the default users (run once):

```bash
npm run seed
```

| Username | Password | Role |
|---|---|---|
| `secretary` | `1234` | Secretary office |
| `head` | `1234` | Head office |

> Change the passwords in `backend/src/seed.ts` before real use.

### 2) Build the frontend

```bash
cd frontend
npm install
npm run build
```

### 3) Start the server

```bash
cd backend
npm start
```

Open it from any device on the same network:

```
http://SERVER-IP:3000
```

To find the server IP on Windows, run `ipconfig` in CMD and use the `IPv4 Address` value.

## Development Mode

```bash
# Terminal 1
cd backend && npm run dev      # port 3000

# Terminal 2
cd frontend && npm run dev     # port 5173
```

## API

All routes are under `/api` and require `Authorization: Bearer <token>` except login.

| Method | Route | Description | Access |
|---|---|---|---|
| POST | `/api/auth/login` | Login | Everyone |
| GET | `/api/tasks?from=YYYY-MM-DD&to=YYYY-MM-DD` | Get tasks between two dates | Secretary + Head |
| POST | `/api/tasks` | Add a task `{ text, date }` | Secretary |
| PUT | `/api/tasks/:id/toggle` | Toggle done / not done | Secretary + Head |
| DELETE | `/api/tasks/:id` | Delete a task | Secretary + Head |

## Notes

- If other devices can't open the site, allow port 3000 through the firewall on the server machine.
- The `.env` file is not committed to Git (it's listed in `.gitignore`).
