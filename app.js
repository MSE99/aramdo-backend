import createServer from 'fastify'

export const createApp = options => createServer({ logger: true, ...options })
