
export const createTodo = (id, content) => ({ id, content, status: false })

export const selectId = ({ id }) => id

export const selectContent = ({ content }) => content

export const selectStatus = ({ status }) => status

export const updateTodoStatus = (todo, status) => ({ ...todo, status })

export const hasSameId = (todo, wanted) => selectId(todo) === wanted
