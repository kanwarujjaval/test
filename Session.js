const Boom = require('boom');
const uuid = require('uuid/v4');
const Redis = require('./db/Redis');
const Auth = require('./Auth');

class Session {

    constructor(sessionId) {
        this.redis = Redis();
        this.sessionId = sessionId || uuid();   // create new sessionId if not supplied i.e. new login
        this.session = {
            id: this.sessionId,
        };
    }

    async addSession(data) {
        Object.assign(this.session, data);
        this.session.valid = 1;
        await this.redis.hmset(this.sessionId, this.session);
        let ttl = 2592000; // 30 days
        this.redis.expire(this.sessionId, ttl);
        return this.session;
    }

    getToken() {
        return Auth.createToken(this.sessionId);
    }

    async getSession() {
        return this.redis.hgetall(this.sessionId);
    }

    deleteSession(sessionId) {
        this.redis.del(sessionId);
    }

}

module.exports = Session;