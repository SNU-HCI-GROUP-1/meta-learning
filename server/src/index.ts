import path from 'path';

import dotenv from 'dotenv';
import { createHttpTerminator } from 'http-terminator';

import app from './app';
import route from './route';

const port = 5555;
let httpTerminator: any = null;

try {
  const serverApp = app(route);
  const server = serverApp.listen(port, () => {
    httpTerminator = createHttpTerminator({ server });
    console.log(`Listening on ${port}...`);
  });
  server.keepAliveTimeout = 62 * 1000;
  dotenv.config({
    path: path.resolve(process.cwd(), process.env.DOT_ENV ?? '.env'),
  });
} catch (err) {
  console.log(err);
  // process.exit(1);
}

async function shutdown(code: number) {
  // eslint-disable no-console
  console.error(`exit code : ${code}`);
  if (httpTerminator) {
    console.error('Terminating server...');
    await httpTerminator.terminate();
    console.error('HTTP server closed.');
  } else {
    console.error('Server is null');
  }
}

process.on('uncaughtException', async (code: number) => {
  console.error(`uncaughtException signal received!!! code: ${code}`);
  await shutdown(code);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});

process.on('SIGTERM', async () => {
  // eslint-disable no-console
  console.error('SIGTERM signal received.');
});
