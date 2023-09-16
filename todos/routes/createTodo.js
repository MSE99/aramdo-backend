import { insertTodoInDB } from '../store/store.js'
import { createTodo } from '../store/todo.js'
import { randomInt } from 'node:crypto'

export default {
    method: 'POST',
    url: '/todos',
    schema: {
        body: {
            type: 'object',
            properties: {
                content: { type: 'string' }
            }
        }
    },
    async handler(req, res) {
        const { body } = req
        const id = randomInt(50_000)
        const todo = createTodo(id, body.content)
        await insertTodoInDB(todo)
        
        res.code(201)
        
        return todo
    }
}