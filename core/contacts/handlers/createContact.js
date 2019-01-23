const Handler = require('../../Handler');

class createContact extends Handler {

    constructor(request, h) {
        super(request, h);
        this.contact = this.request.payload;
        this.userId = 1;
        try {
            this.userId = request.auth.credentials.userId;
        } catch (e) { }
    }

    async saveContact() {
        console.log(`INSERT INTO contact (name, email, phonenumber, userId) VALUES (${this.contact.name}, ${this.contact.email}, ${this.contact.phonenumber}, ${this.userId})`)
        const [rows, fields] = await this.h.sql.query(this.h.parse`INSERT INTO contact (name, email, phonenumber, userId) VALUES (${this.contact.name}, ${this.contact.email}, ${this.contact.phonenumber}, ${this.userId})`);
        return rows;
    }

    async makeResult() {
        let data = await this.saveContact();
        this.result = data;
    }
}

module.exports = function (request, h) {
    return new createContact(request, h).getResult();
};