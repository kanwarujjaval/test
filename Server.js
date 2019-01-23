const Hapi = require('hapi');
const Inert = require('inert');
const Vision = require('vision');
const SqlString = require('sqlstring');

const Auth = require('./Auth');
const { queryParser } = require('./Util');

class Server {

    constructor(config, mysql) {
        this.config = config;
        this.mysql = mysql;
        this.server = Hapi.server({
            port: this.config.SERVER.PORT,
            host: this.config.SERVER.HOST,
            // routes: {
            //     validate: {
            //         failAction: function(){//handle all errors in one place}
            //     }
            // }
        });
    }

    async registerAuth() {
        await new Auth(this.server).registerAuth();
    }

    async registerPlugins() {
        await this.server.register([
            Inert,
            Vision,
            {
                plugin: require('hapi-swagger'),
                options: { info: { title: 'Test API Documentation', version: require('./package.json').version } }
            }
        ]);
    }

    async registerRoutes() {
        let contactRoutes = require('./core/contacts/routes');
        let userRoutes = require('./core/user/routes');
        await this.server.route(contactRoutes);
        await this.server.route(userRoutes);
    }

    async decorateServer() {
        this.connectionPool = await this.mysql.getConnection();
        this.server.decorate('toolkit', 'sql', this.connectionPool);
        this.server.decorate('toolkit', 'parse', queryParser(SqlString.escape));
        // allows query to be available in handlers on h.sql.query(`select 1+1 as two`)

        console.debug(await this.connectionPool.query(queryParser(SqlString.escape)`select 1+1 as two`));

        const preResponse = function (request, h) {
            const response = request.response;
            if (response.isBoom) {
                console.error(response);
                if (response.code) {
                    request.response.output.payload.errorCode = response.code;
                }
            }
            return h.continue;
        };
        this.server.ext('onPreResponse', preResponse);
    }

    async startServer() {
        await this.decorateServer();
        await this.registerAuth();
        await this.registerPlugins();
        await this.registerRoutes();
        await this.server.start();
        console.info(`Server running at: ${this.server.info.uri}`);
    }
}

module.exports = Server;