const UserRepository = require('../Repository/UserRepository');
const UserValidator = require('../Validator/UserValidator');

class UserController {
    async createUser(req, res) {
        try {
            const { name, email } = req.body;

            let validateErrors = UserValidator.validateUserData(req.body);
            if (validateErrors.length > 0) {
                return res.status(422).json({ errors: validateErrors });
            }

            const newUser = await UserRepository.createUser({
                name,
                email,
            });

            return res.status(201).json(newUser);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Error creating user' });
        }
    }

    async getUser(req, res) {
        try {
            const userId = req.params.id;
            const user = await UserRepository.getUserById(userId);
    
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
    
            return res.status(200).json(user);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Error recovering user' });
        }
    }
    
    async getAllUser(req, res) {
        try {
            const users = await UserRepository.getAllUser();
            return res.status(200).json(users);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Error recovering users' });
        }
    }

    async updateUser(req, res) {
        try {
            const userId = req.params.id;
            const updateData = req.body;

            let validateErrors = UserValidator.validateUserData(updateData);
            if (validateErrors.length > 0) {
                return res.status(422).json({ errors: validateErrors });
            }

            let user = await UserRepository.getUserById(userId);
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            
            await UserRepository.updateUser(userId, updateData);
            
            user = await UserRepository.getUserById(userId);
            
            return res.status(200).json(user);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Error updating user' });
        }
    }

    async deleteUser(req, res) {
        try {
            const userId = req.params.id;

            let user = await UserRepository.getUserById(userId);
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            await UserRepository.deleteUser(userId);
    
            return res.status(204).send();
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Error deleting user' });
        }
    }
    
}

module.exports = UserController;
