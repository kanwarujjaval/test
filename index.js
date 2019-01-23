const ENV = process.env.NODE_ENV || 'development';
const Mysql = require('./db/Mysql');
const Server = require('./Server');
const config = require('./config');

const mysql = new Mysql(config.MYSQL);
const server = new Server(config, mysql);

let serverObject = server.startServer();

process.on('unhandledRejection', (err) => {
    console.error(err);
    process.exit(1);
});

exports.server = serverObject;