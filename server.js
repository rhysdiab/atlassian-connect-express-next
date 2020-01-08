const express = require('express');
const next = require('next');

// https://expressjs.com/en/guide/using-middleware.html
const bodyParser = require('body-parser');
const compression = require('compression');
const cookieParser = require('cookie-parser');
const errorHandler = require('errorhandler');
const morgan = require('morgan');

// atlassian-connect-express also provides a middleware
const ace = require('atlassian-connect-express');
const hbs = require('express-hbs');

// Use Handlebars as view engine:
// https://npmjs.org/package/express-hbs
// http://handlebarsjs.com

// We also need a few stock Node modules
const http = require('http');
const os = require('os');
const helmet = require('helmet');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();
const atlassianConnect = require('./atlassian-connect.js');

const aceToNextPayload = function(req, res, next) {
  if (req.context && req.context.hostScriptUrl) {
    const payload = Object.assign({}, req.query);
    payload.hostScriptUrl = req.context.hostScriptUrl;
    req.payload = payload;
  }
  next();
};

app.prepare().then(() => {
  const server = express();

  const addon = ace(server);

  // See config.json
  const port = addon.config.port();
  server.set('port', port);

  // Log requests, using an serverropriate formatter by env
  server.use(morgan(dev ? 'dev' : 'combined'));

  // Atlassian security policy requirements
  // http://go.atlassian.com/security-requirements-for-cloud-servers
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

  // Include request parsers
  server.use(bodyParser.json());
  server.use(bodyParser.urlencoded({ extended: false }));
  server.use(cookieParser());

  // Gzip responses when serverropriate
  server.use(compression());

  // Include atlassian-connect-express middleware
  server.use(addon.middleware());

  // Atlassian security policy requirements
  // http://go.atlassian.com/security-requirements-for-cloud-apps
  server.use(helmet.noCache());

  server.use(aceToNextPayload);

  server.engine('js', (path, options, callback) => callback(null, options.message));
  server.set('views', './pages');
  server.set('view engine', 'js');

  // // Configure Handlebars
  const viewsDir = `${__dirname}/views`;
  server.engine('hbs', hbs.express4({ partialsDir: viewsDir }));
  server.set('view engine', 'hbs');
  server.set('views', viewsDir);

  // Show nicer errors in dev mode
  if (dev) server.use(errorHandler());

  server.get('/', (req, res) => {
    console.log('called redirect!!!');
    res.redirect('/atlassian-connect.json');
  });
  // server.get('/atlassian-connect.json', (req, res) => {
  //   console.log('called atlassianconnect file!!!');
  //   res.send('/atlassian-connect.json')
  // });
  server.all('*', (req, res) => handle(req, res));

  http.createServer(server).listen(port, err => {
    if (err) throw err;
    console.log(`App server running at http://${os.hostname()}:${port}`);
    // Enables auto registration/de-registration of app into a host in dev mode
    if (dev) addon.register();
  });
});
