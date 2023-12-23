const Routes = require('../routes/index');

class Router {
  constructor(server) {
    this.server = server;
    this.initializeRouting();
  }

  initializeRouting() {
    this.server.on("request", this.routeRequest.bind(this));
  }

  routeRequest(req, res) {
    Routes(req, res);
  }
}

module.exports = Router;
