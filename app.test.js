import { createApp } from './app.js'

describe('app.js', () => {
    let app

    beforeEach(async () => {
        app = await createApp({ logger: false })
    })

    test('should have a status endpoint.', async () => {
        const { statusCode, body } = await app.inject({
            url: '/status',
            method: 'GET',
        })

        expect(statusCode).toBe(200)
        expect(JSON.parse(body)).toEqual({ message: 'everything is ok :)' })
    })
})
