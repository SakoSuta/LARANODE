const UserRepository = require('../Repository/UserRepository');
const UserValidator = require('../Validator/UserValidator');

class UserController {

    constructor(req, res) {
        this.req = req;
        this.res = res;
        this.userRepository = new UserRepository();
    }

    async parseRequestBody(req) {
        return new Promise((resolve, reject) => {
            let body = '';
            req.on('data', chunk => {
                body += chunk.toString();
            });
            req.on('end', () => {
                try {
                    resolve(JSON.parse(body));
                } catch (error) {
                    reject(error);
                }
            });
        });
    }

    async createUser() {
        try {
            const { name, email } = await this.parseRequestBody(this.req);

            let validateErrors = UserValidator.validateUserData({ name, email });
            if (validateErrors.length > 0) {
                this.res.writeHead(422, { "Content-Type": "application/json" });
                this.res.write(JSON.stringify({ errors: validateErrors }));
                this.res.end();
            }

            const newUser = await this.userRepository.createUser({ name, email });
            this.res.writeHead(201, { "Content-Type": "application/json" });
            this.res.write(JSON.stringify(newUser));
            this.res.end();
        } catch (error) {
            console.error(error);
            this.res.writeHead(500, { "Content-Type": "application/json" });
            this.res.write(JSON.stringify({ error: 'Error creating user' }));
            this.res.end();
        }
    }

    async getUser() {
        try {
            const userId = this.req.url.split("/")[2];
            const user = await this.userRepository.getUserById(userId);
    
            if (!user) {
                this.res.writeHead(404, { "Content-Type": "application/json" });
                this.res.write(JSON.stringify({ message: 'User not found' }));
                this.res.end();
            }
            this.res.writeHead(200, { "Content-Type": "application/json" });
            this.res.write(JSON.stringify(user));
            this.res.end();
        } catch (error) {
            console.error(error);
            this.res.writeHead(500, { "Content-Type": "application/json" });
            this.res.write(JSON.stringify({ error: 'Error recovering user' }));
            this.res.end();
        }
    }
    
    async getAllUser() {
        try {
            const users = await this.userRepository.getAllUser();
            this.res.writeHead(200, { "Content-Type": "application/json" });
            this.res.write(JSON.stringify(users));
            this.res.end();
        } catch (error) {
            console.error(error);
            this.res.writeHead(500, { "Content-Type": "application/json" });
            this.res.write(JSON.stringify({ error: 'Error recovering users' }));
            this.res.end();
        }
    }

    async updateUser() {
        try {
            const userId = this.req.url.split("/")[2];
            const updateData = await this.parseRequestBody(this.req);

            let validateErrors = UserValidator.validateUserData(updateData);
            if (validateErrors.length > 0) {
                this.res.writeHead(422, { "Content-Type": "application/json" });
                this.res.write(JSON.stringify(validateErrors));
                this.res.end()
            }

            let user = await this.userRepository.getUserById(userId);
            if (!user) {
                this.res.writeHead(404, { "Content-Type": "application/json" });
                this.res.write(JSON.stringify({ message: 'User not found' }));
                this.res.end();
            }
            
            await this.userRepository.updateUser(userId, updateData);
            
            this.res.writeHead(200, { "Content-Type": "application/json" });
            this.res.write(JSON.stringify(user));
            this.res.end();
        } catch (error) {
            console.error(error);
            this.res.writeHead(500, { "Content-Type": "application/json" });
            this.res.write(JSON.stringify({ error: 'Error updating user' }));
            this.res.end();
        }
    }

    async deleteUser() {
        try {
            const userId = this.req.url.split("/")[2];

            let user = await this.userRepository.getUserById(userId);
            if (!user) {
                this.res.writeHead(404, { "Content-Type": "application/json" });
                this.res.write(JSON.stringify({ message: 'User not found' }));
                this.res.end();
            }

            await this.userRepository.deleteUser(userId);
    
            this.res.writeHead(204, { "Content-Type": "application/json" });
            this.res.write(JSON.stringify({ message: 'User deleted' }));
            this.res.end();
        } catch (error) {
            console.error(error);
            this.res.writeHead(500, { "Content-Type": "application/json" });
            this.res.write(JSON.stringify({ error: 'Error deleting user' }));
            this.res.end();
        }
    }
    
}

module.exports = UserController;
