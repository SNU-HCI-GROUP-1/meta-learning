import app from './app';
import { createHttpTerminator } from 'http-terminator';
import route from './route';

const port = 3000;
let httpTerminator: any = null;

try {
  const serverApp = app(route);
  const server = serverApp.listen(port, () => {
    httpTerminator = createHttpTerminator({ server });
    console.log(`Listening on ${port}...`);
  });
  server.keepAliveTimeout = 62 * 1000;
} catch (err) {
  console.log(err);
  process.exit(1);
}
