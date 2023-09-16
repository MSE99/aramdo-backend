import Fastify from 'fastify'
import { TodoPlugin } from './index.js'
import { createTodo, selectContent, selectId, selectStatus } from './store/todo.js'
import { __clearStore, getAllTodos, getTodoByIdFromDB, insertTodoInDB } from './store/store.js'

describe('todo routes', () => {
    let app

    beforeEach(async () => {
        app = Fastify()
        await app.register(TodoPlugin)
        __clearStore()
    })

    afterEach(() => { __clearStore() })

    it('should have a route for getting all todos.', async () => {
        const todos = [
            createTodo(1, 'foo'),
            createTodo(2, 'bar'),
            createTodo(3, 'baz'),
            createTodo(4, 'naz'),
        ]

        await Promise.all(todos.map(t => insertTodoInDB(t)))
    
        const { body } = await app.inject({
            url: '/todos',
            method: 'GET'
        })

        const gotten = JSON.parse(body).reverse().map(selectContent)
        const wanted = todos.map(selectContent)

        expect(gotten).toEqual(wanted)
    })

    it('GET /todo/:id should return bad request 400 when given a bad id.', async () => {
        const { statusCode } = await app.inject({
            url: '/todos/niz',
            method: 'GET'
        })
        expect(statusCode).toBe(400)
    })

    it('GET /todo/:id should return not found when giving an id that isn\'t stored.', async () => {
        const todos = [
            createTodo(1, 'foo'),
            createTodo(2, 'bar'),
            createTodo(3, 'baz'),
            createTodo(4, 'naz'),
        ]
        await Promise.all(todos.map(t => insertTodoInDB(t)))
    
        const { statusCode } = await app.inject({
            url: '/todos/50',
            method: 'GET'
        })
        expect(statusCode).toEqual(404)
    })


    it('POST /todo should create a new todo.', async () => {
        const { statusCode } = await app.inject({
            url: '/todos',
            method: 'POST',
            body: JSON.stringify({
                content: 'foo',
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })

        
        const allTodos = (await getAllTodos()).map(selectContent)
        
        expect(statusCode).toEqual(201)
        expect(allTodos).toEqual(['foo'])
    })

    it('PATCH /todo/:id should return not found when the todo cannot be found.', async () => {
        const { statusCode } = await app.inject({
            url: '/todos/15',
            method: 'PATCH',
            body: JSON.stringify({
                status: true,
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })

        expect(statusCode).toBe(404)
    })

    it('PATCH /todo/:id should return bad request when status is not boolean.', async () => {
        const { statusCode } = await app.inject({
            url: '/todos/15',
            method: 'PATCH',
            body: JSON.stringify({
                status: 'foo is great bar is none!',
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })

        expect(statusCode).toBe(400)
    })

    it('PATCH /todo/:id should update the status of a given todo.', async () => {
        const todo = createTodo(10, 'foo is great bar is none!')
        await insertTodoInDB(todo)
        
        const { statusCode } = await app.inject({
            url: `/todos/${selectId(todo)}`,
            method: 'PATCH',
            body: JSON.stringify({
                status: true,
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })

        const updated = await getTodoByIdFromDB(selectId(todo))

        expect(statusCode).toBe(200)
        expect(selectStatus(updated)).toBe(true)
    })

    it('DELETE /todo/:id should delete todo by id.', async () => {
        const todo = createTodo(10, 'foo is great bar is none!')
        await insertTodoInDB(todo)
        
        expect(await getAllTodos()).toEqual([todo])
        
        const { statusCode } = await app.inject({
            url: `/todos/${selectId(todo)}`,
            method: 'DELETE'
        })

        expect(await getAllTodos()).toEqual([])
        expect(statusCode).toBe(203)
    })
})
