import 'dotenv/config';

import { createApp } from './app.js';
import { createOpenAICoverLetterService } from './services/generateCoverLetter.js';

const port = Number(process.env.PORT ?? 3001);
const app = createApp({
  coverLetterService: createOpenAICoverLetterService(),
  clientOrigin: process.env.CLIENT_ORIGIN ?? 'http://localhost:5173',
});

app.listen(port, () => {
  console.log(`PDFNet server listening on http://localhost:${port}`);
  console.log(`Swagger UI available at http://localhost:${port}/api/docs`);
});
