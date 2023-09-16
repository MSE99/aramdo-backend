import { getTodoByIdFromDB, updateTodoInDB } from '../store/store.js'
import { updateTodoStatus } from '../store/todo.js'

export default {
    method: 'PATCH',
    url: '/todos/:id',
    schema: {
        body: {
            type: 'object',
            properties: {
                status: { type: 'boolean' }
            }
        },
        params: {
            id: { type: 'integer' }
        }
    },
    async handler(req, res) {
        const id = req.params.id
        const body = req.body

        const todo = await getTodoByIdFromDB(id)

        if (!todo) {
            res.code(404)
            return { error: 'not found' }
        }

        const updated = updateTodoStatus(todo, body.status)
        await updateTodoInDB(updated)

        return updated
    }
}