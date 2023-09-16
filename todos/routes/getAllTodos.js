import { getAllTodosFromDB } from '../store/store'

export default {
    method: 'GET',
    url: '/todos',
    async handler (_, __) {
        return await getAllTodosFromDB()
    }
}
