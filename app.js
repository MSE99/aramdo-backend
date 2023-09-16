import createServer from 'fastify'
import { TodoPlugin } from './todos/index.js'

export const createApp = async options => {
    const app = createServer({ logger: true, ...options })
    await app.register(TodoPlugin)
    
    app.get('/status', async (_, res) => res.code(200).send({ message: 'everything is ok :)' }))
    
    return app
}
