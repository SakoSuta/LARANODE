const UserController = require('../app/Controllers/UserController');

const Routes = (req, res) => {
    const userController = new UserController(req, res);

    if (req.url.startsWith("/users")) {
        const isUserRootUrl = req.url === "/users";
        const isUserSpecificUrl = req.url.match(/\/users\/\w+/);

        if (isUserRootUrl && req.method === "GET") {
            // TODO: Implement get all users
        } else if (isUserSpecificUrl && req.method === "GET") {
            userController.getUser();
        } else if (isUserRootUrl && req.method === "POST") {
            userController.createUser();
        } else if (isUserSpecificUrl && req.method === "PUT") {
            userController.updateUser();
        } else if (isUserSpecificUrl && req.method === "DELETE") {
            userController.deleteUser();
        } else {
            res.writeHead(405, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ message: "Method Not Allowed" }));
        }
    } else {
            res.writeHead(404, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ message: "Not Found" }));
    }
};

module.exports = Routes;