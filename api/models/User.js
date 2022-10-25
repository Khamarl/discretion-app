const db = require('../database/connect');

class User {

    constructor({ user_id, username, user_password, is_admin }) {
       this.id = user_id;
       this.username = username;
       this.password = user_password;
       this.is_admin = is_admin

    }

    static async getOneById(id) {
        const response = await db.query("SELECT * FROM user_account WHERE user_id = $1", [id]);
        if (response.rows.length != 1) {
            throw new Error("Unable to locate user.")
        }
        return new User(response.rows[0]);
    }

    static async getOneByUsername(username) {
        const response = await db.query("SELECT * FROM user_account WHERE username = $1", [username]);
        if (response.rows.length != 1) {
            throw new Error("Unable to locate user.")
        }
        return new User(response.rows[0]);
    }

    static async create(data) {
        const {username, password, is_admin} = data;
        console.log(data)
        let response = await db.query("INSERT INTO user_account (username, user_password, is_admin) VALUES ($1, $2, $3) RETURNING user_id;",
            [username, password, is_admin]);
        const newId = response.rows[0].user_id;
        console.log(newId)
        const newUser = await User.getOneById(newId);
        return newUser;
    }

    async destroy() {
        let response = await db.query("DELETE FROM post WHERE post_id = $1 RETURNING *;", [this.id]);
        return new User(response.rows[0]);
    }

}

module.exports = User;
