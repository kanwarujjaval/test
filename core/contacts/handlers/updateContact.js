const Handler = require('../../Handler');

class updateContact extends Handler {

    constructor(request, h) {
        super(request, h);
        this.userId = 1;
        try {
            this.userId = request.auth.credentials.userId;
        } catch (e) { }
    }

    async updateContact(id) {
        let qs = ``;
        if (this.request.payload.name) {
            qs += `name = '${this.request.payload.name}'`
        }
        if (this.request.payload.email) {
            qs += `,email = '${this.request.payload.email}'`
        }
        if (this.request.payload.phonenumber) {
            qs += `,phonenumber = '${this.request.payload.phonenumber}'`
        }
    
        if (qs.charAt(0) === ',') {
            qs = qs.substr(1);
        }
        console.log(qs)
        const [rows, fields] = await this.h.sql.query(`
            UPDATE contact SET 
            ${qs}
            where id = ${id}
            AND userId = ${this.userId}
        `);
        return rows;
    }

    async makeResult() {
        let id = this.request.payload.id;
        let data = await this.updateContact(id);
        this.result = data;
    }
}

module.exports = function (request, h) {
    return new updateContact(request, h).getResult();
};