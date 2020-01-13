import ace from 'atlassian-connect-express';
import bodyParser from 'body-parser';
import express from 'express';
import next from 'next';
import morgan from 'morgan';
import helmet from 'helmet';
import os from 'os';
import http from 'http';
import { aceToNextPayload, aceEngineSetup } from './lib/aceAdaptors';
import setupRoutes from './routes.js';

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();
  const addon = ace(server);

  const port = addon.config.port();

  // Log requests, using an appropriate formatter by env
  const devEnv = server.get('env') == 'development';
  server.use(morgan(devEnv ? 'dev' : 'combined'));

  // Atlassian security policy requirements
  // http://go.atlassian.com/security-requirements-for-cloud-apps
  // HSTS must be enabled with a minimum age of at least one year
  server.use(
    helmet.hsts({
      maxAge: 31536000,
      includeSubDomains: false,
    })
  );
  server.use(
    helmet.referrerPolicy({
      policy: ['origin-when-cross-origin'],
    })
  );

  // Configure Express middleware.
  aceEngineSetup(server);
  server.use(addon.middleware());
  server.use(aceToNextPayload);
  server.use(bodyParser.json());
  server.use(bodyParser.urlencoded({ extended: false }));

  // Define you app routes in routes.js
  setupRoutes(app, server, addon, handle);

  // Boot the HTTP server
  http.createServer(server).listen(port, () => {
    console.log(`App server running at http://${os.hostname()}:${port}`);

    // Enables auto registration/de-registration of app into a host in dev mode
    if (devEnv) addon.register();
  });
});
