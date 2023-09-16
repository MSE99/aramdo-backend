
export const createTodo = (id, content) => ({ id, content, status: false })

export const selectId = ({ id }) => id

export const updateTodoStatus = (todo, status) => ({ ...todo, status })

export const hasSameId = (todo, wanted) => selectId(todo) === wanted
