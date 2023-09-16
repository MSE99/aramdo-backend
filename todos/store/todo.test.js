import { createTodo, updateTodoStatus } from './todo.js'

describe("todo", () => {
    it('should create a new todo.', () => {
        const todo = createTodo(1, 'foo is great bar is none!')
        expect(todo).toEqual({ id: 1, content: 'foo is great bar is none!', status: false })
    })

    it('should offer a function for updating the status.', () => {
        const todo = createTodo(1, 'foo is great bar is none!')
        const updated = updateTodoStatus(todo, true)
        expect(updated).toEqual({ id: 1, content: 'foo is great bar is none!', status: true })
    })
})
