# PDFNet

Базовый монорепозиторий для тестового задания Variant Group.

## Что внутри

- `server/` — Express API c endpoint `POST /api/generate`, защитой от DoS/DDoS на прикладном уровне, JSDoc и Swagger UI.
- `client/` — Vite + React + TypeScript клиент с `wouter`, `react-toastify`, `useLocalStorageState` и `DocumentsStorage`.

## Быстрый старт

```bash
npm install
cp server/.env.example server/.env
npm run dev
```

- Client: `http://localhost:5173`
- Swagger UI: `http://localhost:3001/api/docs`

## Команды

```bash
npm run dev
npm run build
npm run test
```
