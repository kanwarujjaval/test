const Joi = require('joi');
const createContact = require('././handlers/createContact');
const getContact = require('././handlers/getContact');
const updateContact = require('././handlers/updateContact');
const deleteContact = require('././handlers/deleteContact');

module.exports = [
    {
        path: '/api/v1/contact/',
        method: 'POST',
        handler: createContact,
        options: {
            auth: {
                strategy: 'jwt',
                mode: 'optional'
            },
            validate: {
                payload: {
                    name: Joi.string().required(),
                    email: Joi.string().email(),
                    phonenumber: Joi.string().min(9).required(),
                },
                headers: Joi.object({ authorization: Joi.string().optional() }).unknown()
            },
            description: 'Create contact',
            notes: 'create new contact api',
            tags: ['api', 'contact'],
        },
    },
    {
        path: '/api/v1/contact/',
        method: 'PUT',
        handler: updateContact,
        options: {
            auth: {
                strategy: 'jwt',
                mode: 'optional'
            },
            validate: {
                payload: {
                    id: Joi.number().required(),
                    name: Joi.string().optional(),
                    email: Joi.string().email().optional(),
                    phoneNumber: Joi.string().min(9).optional(),
                },
                headers: Joi.object({ authorization: Joi.string().optional() }).unknown()
            },
            description: 'Update contact',
            notes: 'update an existing contact api',
            tags: ['api', 'contact'],
        },
    },
    {
        path: '/api/v1/contact/',
        method: 'GET',
        handler: getContact,
        options: {
            auth: {
                strategy: 'jwt',
                mode: 'optional'
            },
            validate: {
                query: {
                    search: Joi.string().optional(),
                    name: Joi.string().optional(),
                    email: Joi.string().email().optional(),
                    skip: Joi.number().optional(),
                    limit: Joi.number().optional(),
                },
                headers: Joi.object({ authorization: Joi.string().optional() }).unknown()
            },
            description: 'Get contact',
            notes: 'search contact api',
            tags: ['api', 'contact'],
        },
    },
    {
        path: '/api/v1/contact/',
        method: 'DELETE',
        handler: deleteContact,
        options: {
            auth: {
                strategy: 'jwt',
                mode: 'optional'
            },
            validate: {
                payload: {
                    id: Joi.number().required()
                },
                headers: Joi.object({ authorization: Joi.string().optional() }).unknown()
            },
            description: 'Delete contact',
            notes: 'delete contact api',
            tags: ['api', 'contact'],
        },
    },
];

