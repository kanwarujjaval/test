const Handler = require('../../Handler');

class deleteContact extends Handler {

    constructor(request, h) {
        super(request, h);
        this.userId = 1;
        try {
            this.userId = request.auth.credentials.userId;
        } catch (e) { }
    }

    async deleteContact(id) {
        const [rows, fields] = await this.h.sql.query(`DELETE FROM contact WHERE id = ${id} AND userId = ${this.userId};`);
        return rows;
    }

    async makeResult() {
        let id = this.request.payload.id;
        let data = await this.deleteContact(id);
        this.result = data;
    }
}

module.exports = function (request, h) {
    return new deleteContact(request, h).getResult();
};