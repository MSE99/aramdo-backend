import getAllTodos from './routes/getAllTodos.js'
import getTodo from './routes/getTodo.js'
import deleteTodo from './routes/deleteTodo.js'
import createTodo from './routes/createTodo.js'
import changeTodoStatus from './routes/changeTodoStatus.js'

export async function TodoPlugin(app) {
    app.route(getAllTodos)
    app.route(getTodo)
    app.route(deleteTodo)
    app.route(createTodo)
    app.route(changeTodoStatus)
}
