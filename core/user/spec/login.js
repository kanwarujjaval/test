const Lab = require('lab')
const Code = require('code')
const Path = require('path')
const Hapi = require('hapi')
const lab = (exports.lab = Lab.script())
const { describe, it } = lab
const expect = Code.expect

describe('inject requests with server.inject,', () => {

    it('inject a request', async () => {
        let server = new require('./../../../index').server;
        server.route(require('./../routes'));

        const injectOptions = {
            method: 'POST',
            url: '/api/v1/user/login',
            payload: {
                username: 'username',
                password: 'password'
            }
        }

        const response = await server.inject(injectOptions)

        console.log(JSON.parse(response.payload));
        expect(response.statusCode).to.equal(200)
    })
})