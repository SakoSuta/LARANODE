const pool = require('../../bootstrap/Db');

class UserRepository {
    async createUser(userData) {
        const query = 'INSERT INTO users(name, email, password, created_at, updated_at) VALUES($1, $2, $3, $4, $5) RETURNING *';
        const values = [userData.name, userData.email, userData.password, new Date(), new Date()];
        const result = await pool.query(query, values);
        return result.rows[0];
    }

    async getAllUser() {
        const query = 'SELECT * FROM users';
        const result = await pool.query(query);
        return result.rows;
    }

    async getUserById(userId) {
        const query = 'SELECT * FROM users WHERE id = $1';
        const values = [userId];
        const result = await pool.query(query, values);
        return result.rows[0];
    }

    async updateUser(userId, updateData) {
        const set = [];
        const values = [];
        let paramIndex = 1;
    
        if (updateData.name) {
            set.push(`name = $${paramIndex}`);
            values.push(updateData.name);
            paramIndex++;
        }
        if (updateData.email) {
            set.push(`email = $${paramIndex}`);
            values.push(updateData.email);
            paramIndex++;
        }
    
        set.push(`updated_at = $${paramIndex}`);
        values.push(new Date());
    
        if (set.length === 0) {
            throw new Error("No data provided to update");
        }
    
        const query = `UPDATE users SET ${set.join(', ')} WHERE id = $${paramIndex}`;
        values.push(userId);
    
        await pool.query(query, values);
    }
    

    async deleteUser(userId) {
        const query = 'DELETE FROM users WHERE id = $1';
        const values = [userId];
        await pool.query(query, values);
    }       
}

module.exports = UserRepository;
