import { existsSync, readFileSync } from 'node:fs';

import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';
import { defineConfig } from 'vite';

const DEFAULT_API_PROXY_TARGET = 'http://localhost:3001';

function resolveApiProxyTarget() {
  const explicitTarget =
    process.env.VITE_API_PROXY_TARGET ?? process.env.VITE_API_BASE_URL;

  if (explicitTarget) {
    return explicitTarget.replace(/\/$/, '');
  }

  const serverEnvPath = new URL('../server/.env', import.meta.url);

  if (!existsSync(serverEnvPath)) {
    return DEFAULT_API_PROXY_TARGET;
  }

  const serverPort = readFileSync(serverEnvPath, 'utf8')
    .split(/\r?\n/)
    .find((line) => line.startsWith('PORT='))
    ?.slice('PORT='.length)
    .trim();

  return serverPort
    ? `http://localhost:${serverPort}`
    : DEFAULT_API_PROXY_TARGET;
}

export default defineConfig({
  plugins: [react(), svgr()],
  server: {
    port: 5173,
    proxy: {
      '/api': resolveApiProxyTarget(),
    },
  },
});
