import { createApp } from './app.js'

async function main() {
    const server = createApp()
    await server.listen({ port: 3030 })
}

main()
