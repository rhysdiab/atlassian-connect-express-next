export default function(app, server, addon) {
  server.get('/', function(req, res) {
    res.redirect('/atlassian-connect.json');
  });

  server.get('/hello-world', addon.authenticate(), (req, res) =>
    app.render(req, res, '/hello-world', req.payload)
  );

  server.get('/web-panel', addon.authenticate(), (req, res) =>
    app.render(req, res, '/web-panel', req.payload)
  );
}
