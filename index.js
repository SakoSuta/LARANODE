const http = require('http');
const Router = require('./bootstrap/Router.js');

const server = http.createServer();
new Router(server);

const port = process.env.PORT || 2000;
server.listen(port, () => {
  console.log(`Server running at port:${port}`);
});