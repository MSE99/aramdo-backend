import { getAllTodosFromDB } from '../store/store.js'

export default {
    method: 'GET',
    url: '/todos',
    async handler (_, __) {
        return await getAllTodosFromDB()
    }
}
