class User {
    constructor(id, name, email, createdAt, updatedAt, password) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.password = password;
    }

}

module.exports = User;