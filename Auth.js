const hapiAuthJWT = require('hapi-auth-jwt2');
const JWT = require('jsonwebtoken');
const redis = require('./db/Redis')();
const JWT_SECRET_KEY = 'temp_test';

class Auth {
    constructor(server) {
        this.server = server;
    }

    async registerAuth() {
        await this.server.register(hapiAuthJWT);

        this.server.auth.strategy('jwt', 'jwt', {
            key: process.env.JWT_KEY || JWT_SECRET_KEY,
            validate: this.validate,
            verifyOptions: { algorithms: ['HS256'] }
        });
        this.server.auth.default('jwt');
    }

    async validate(decoded, request) {
        let session = await redis.hgetall(decoded);
        if (!session || !session.id || !Number(session.valid))
            return { isValid: false }
        console.log(session);
        return {
            isValid: true,
            credentials: session
        };
    };

    static createToken(data) {
        return JWT.sign(data, process.env.JWT_KEY || JWT_SECRET_KEY);
    }
}

module.exports = Auth;