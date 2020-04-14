export function aceToNextPayload(req, res, next) {
  if (req.context && req.context.hostScriptUrl) {
    const payload = Object.assign({}, req.query);
    payload.hostScriptUrl = req.context.hostScriptUrl;
    req.payload = { ...payload, ...req.context };
  }
  next();
}

// Workaround for atlassian-connect-express dependency on expres render engines.
export function aceEngineSetup(server) {
  server.engine('js', (path, options, callback) => callback(null, options.message));
  server.set('views', './pages');
  server.set('view engine', 'js');
}
