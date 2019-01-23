const _redis = require('redis');
const { promisify } = require('util');

class Redis {

    constructor(redisConfig = null) {
        let config = {
            db: 0
        };
        Object.assign(config, redisConfig);
        this.client = _redis.createClient(config); // default config for local unauthenticated redis
    }

    get() {
        return promisify(this.client.get).bind(this.client).call(this, ...arguments);
    }

    set() {
        return promisify(this.client.set).bind(this.client).call(this, ...arguments);
    }

    hmget() {
        return promisify(this.client.hmget).bind(this.client).call(this, ...arguments);
    }

    hmset() {
        return promisify(this.client.hmset).bind(this.client).call(this, ...arguments);
    }

    expire() {
        return promisify(this.client.expire).bind(this.client).call(this, ...arguments);
    }

    del() {
        return promisify(this.client.del).bind(this.client).call(this, ...arguments);
    }

    hdel() {
        return promisify(this.client.hdel).bind(this.client).call(this, ...arguments);
    }

    hgetall() {
        return promisify(this.client.hgetall).bind(this.client).call(this, ...arguments);
    }

    static getInstance(redisConfig = null) {
        return (Redis.instance == null) ? Redis.instance = new Redis(redisConfig) : Redis.instance;
    }

}

module.exports = Redis.getInstance;