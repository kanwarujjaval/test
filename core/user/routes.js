const Joi = require('joi');
const login = require('././handlers/login');

module.exports = [
    {
        path: '/api/v1/user/login',
        method: 'POST',
        handler: login,
        options: {
            auth: {
                strategy: 'jwt',
                mode: 'optional'
            },
            validate: {
                payload: {
                    username: Joi.string().required(),
                    password: Joi.string().required()
                }
            },
            description: 'login',
            notes: 'login user api',
            tags: ['api', 'login'],
        },
    }
];

