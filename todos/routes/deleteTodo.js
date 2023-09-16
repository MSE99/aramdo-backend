import { removeTodoFromDB } from '../store/store'

export default {
    method: 'DELETE',
    url: '/todos/:id',
    schema: {
        params: {
            id: { type: 'integer' }
        },
    },
    async handler (req, res) {
        const id = Number(req.params.id)
        const todo = await removeTodoFromDB(id)
        
        res.code(203)
    }
}