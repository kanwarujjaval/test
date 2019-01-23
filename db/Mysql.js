const mysql = require('mysql2/promise');

class DatabaseConnection {

    /**
     * @param dbConfig inject current db Config
     */
    constructor(dbConfig = null) {
        this.connection = null;
        this.CONFIG = dbConfig;
    }

    makeConfigObject() {
        if (!this.CONFIG || !this.CONFIG.HOST) {
            throw new Error('Invalid database configuration');
        }
        const config = {
            user: this.CONFIG.USER,
            password: this.CONFIG.PASSWORD,
            host: this.CONFIG.HOST,
            port: this.CONFIG.PORT,
            database: this.CONFIG.DATABASE,
            connectionLimit: this.CONFIG.CONNECTION_LIMIT || 1
        };
        this.configObject = config;
    }

    async makeConnection() {
        this.makeConfigObject();
        this.connection = await mysql.createPool(this.configObject);
    }

    async getConnection() {
        await this.makeConnection();
        return this.connection;
    }

    async closeConnections() {
        this.connection.end();
    }
}

module.exports = DatabaseConnection;