
export const createTodo = (id, content) => ({ id, content, status: false })

export const updateTodoStatus = (todo, status) => ({ ...todo, status })
