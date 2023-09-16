import { createTodo, selectId, updateTodoStatus } from './todo.js'

import { 
    __clearStore,
    getAllTodos,
    insertTodoInDB,
    updateTodoInDB,
    getTodoByIdFromDB,
    removeTodoFromDB 
} from './store.js'

describe('store', () => {
    beforeEach(() => { __clearStore() })
    afterEach(() => { __clearStore() })

    it('should allow us to add and persist a new todo.', async () => {
        const todo = createTodo(1, 'foo is great bar is none!')
        await insertTodoInDB(todo)
    
        expect(await getAllTodos()).toEqual([todo])
    })

    it('should allow us to update an existing todo.', async () => {
        const todo = createTodo(1, 'foo is great bar is none!')
        await insertTodoInDB(todo)

        const updated = updateTodoStatus(todo, true)
        await updateTodoInDB(updated)

        expect(await getAllTodos()).toEqual([updated])
    })

    it('should allow us to get a todo by id.', async () => {
        const todo = createTodo(1, 'foo is great bar is none!')
        await insertTodoInDB(todo)

        const gotten = await getTodoByIdFromDB(selectId(todo))
        
        expect(gotten).toEqual(todo)
    })

    it('should return null if the todo cannot be found.', async () => {
        const todo = createTodo(1, 'foo is great bar is none!')
        const gotten = await getTodoByIdFromDB(selectId(todo))
        expect(gotten).toBe(null)
    })

    it('should allow us to remove a todo using an id.', async () => {
        const todo = createTodo(1, 'foo is great bar is none!')
        await insertTodoInDB(todo)
        
        await removeTodoFromDB(todo.id)
        
        const gotten = await getTodoByIdFromDB(selectId(todo))
        expect(gotten).toBe(null)
    })
})
