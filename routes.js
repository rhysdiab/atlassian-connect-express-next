export default function (app, server, addon) {
  server.get('/hello-world', addon.authenticate(), (req, res) => {
    app.render(req, res, '/hello-world', req.payload);
  });

  server.get('*', (req, res, next) => {
    if (
      req.url === '/atlassian-connect.json' ||
      req.url === '/installed' ||
      req.url === '/uninstalled'
    ) {
      return next();
    }
    app.render(req, res, req.url, { ...req.payload });
  });
}
