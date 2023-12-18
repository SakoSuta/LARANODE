class UserValidator {
    static validateUserData(userData) {
        const errors = [];

        // TODO: Ajouter données deja existantes dans la base de données (fonction en async)

        if (!userData.name || userData.name.trim() === '') {
            errors.push('The name is required.');
        }

        if (!userData.email || !this.isValidEmail(userData.email)) {
            errors.push('The email is invalid or missing.');
        }

        return errors;
    }

    static isValidEmail(email) {    
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }
}

module.exports = UserValidator;
