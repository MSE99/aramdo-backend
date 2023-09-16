import createServer from 'fastify'
import { TodoPlugin } from './todos/index.js'
import FastifyGracefulShutdown from 'fastify-graceful-shutdown'

export const createApp = async options => {
    const app = createServer({ logger: true, ...options })
    
    await app.register(TodoPlugin)
    await app.register(FastifyGracefulShutdown)
    
    app.get('/status', async (_, res) => res.code(200).send({ message: 'everything is ok :)' }))
    
    return app
}
