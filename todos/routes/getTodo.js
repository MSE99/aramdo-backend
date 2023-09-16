import { getTodoByIdFromDB } from '../store/store.js'

export default {
    method: 'GET',
    url: '/todos/:id',
    schema: {
        params: {
            id: { type: 'integer' }
        },
    },
    async handler (req, res) {
        const id = Number(req.params.id)
        const todo = await getTodoByIdFromDB(id)
    
        if (!todo) {
            res.code(404)
            return { error: 'not found' }
        } else {
            return todo
        }
    }
}