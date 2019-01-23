const Handler = require('../../Handler');
const Boom = require('boom');
const session = require('./../../../Session');
// const bcrypt = require('bcrypt');

class Login extends Handler {

    constructor(request, h) {
        super(request, h);
    }

    async getUser(username, password) {
        const [rows, fields] = await this.h.sql.query(`SELECT * from user where username = '${username}' and password = '${password}'`);
        return rows;
    }

    async verifyPassword() {
        // bcrypt.compare('somePassword', hash, function (err, res) {
        //     if (res) {
        //         // Passwords match
        //     } else {
        //         // Passwords don't match
        //     }
        // });
    }

    async makeResult() {
        let user = await this.getUser(this.request.payload.username, this.request.payload.password)
        console.log(user);
        if (!user[0] || !user[0].id) {
            throw Boom.forbidden('Invalid credentials');
        }
        this.session = new session();
        let data = user[0];
        data.userId = data.id;
        delete data['id'];
        this.session.addSession(data);

        this.result = {
            token: this.session.getToken()
        }
    }
}

module.exports = function (request, h) {
    return new Login(request, h).getResult();
};