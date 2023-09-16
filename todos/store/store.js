import { createWithSize, unshift, filter, reduce } from './sizedList.js'
import { hasSameId, selectId } from './todo.js'

let store = createWithSize(10)

export const insertTodoInDB = async todo => {
   const nextStore = unshift(store, todo)
   store = nextStore
}

export const updateTodoInDB = async next => {
    const filtered = filter(store, todo => !hasSameId(todo, selectId(next)))
    store = unshift(filtered, next)
}

export const getTodoByIdFromDB = async id => {
    const result = reduce(store, (acc, todo) => {
        if (hasSameId(todo, id)) {
            return todo
        }

        return acc
    }, null)

    return result
}

export const removeTodoFromDB = async id => {
    store = filter(store, todo => !hasSameId(todo, id))
}

export const getAllTodos = async () => Array.from(store)

export const __clearStore = async () => { store = createWithSize(1000) }
