const Handler = require('../../Handler');

class createContact extends Handler {

    constructor(request, h) {
        super(request, h);
        this.userId = 1;
        try {
            this.userId = request.auth.credentials.userId;
        } catch (e) { }
        this.skip = this.request.query.skip || 0;
        this.limit = this.request.query.limit ||10
    }

    async searchContact(searchKey) {
        /**
         * either get all the text search results from mysql and then put them into redis as 
         * result.userId:uuid() : JSON
         * then get the keys where userId:matches to get result for the current user only
         * OR
         * create temporary table and utilize the db index
         * 
         * SELECT id, name, email FROM contact where MATCH(name, email) AGAINST('ituyiu');
         */
        
        const [rows, fields] = await this.h.sql.query(`
            SELECT MATCH(name, email) AGAINST('(${searchKey}*) ("${searchKey}")' IN BOOLEAN MODE) score, 
            id, phonenumber, name, email, userId
            FROM contact
            having score>0
            and userId = ${this.userId}
            ORDER BY score 
            DESC LIMIT ${this.skip}, ${this.limit}
        
        `);
        console.log(rows, fields);
        return rows;
    }

    async getContactsByName(name) {
        const [rows, fields] = await this.h.sql.query(`SELECT id, name, email, phonenumber FROM contact where name like '${name}%' `);
        console.log(rows, fields);
        return rows;
    }

    async getContactsByEmail(email) {
        const [rows, fields] = await this.h.sql.query(`SELECT id, name, email, phonenumber FROM contact where email = '${email}' `);
        console.log(rows, fields);
        return rows;
    }

    async makeResult() {
        let data = [];
        if (this.request.query.search) {
            data = await this.searchContact(this.request.query.search);
        } else if (this.request.query.name) {
            data = await this.getContactsByName(this.request.query.name)
        } else if (this.request.query.email) {
            data = await this.getContactsByEmail(this.request.query.email)
        }
        this.result = data;
    }
}

module.exports = function (request, h) {
    return new createContact(request, h).getResult();
};