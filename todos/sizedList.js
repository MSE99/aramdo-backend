
export const from = (iterable, givenSize = null) => {
    const items = [...iterable]
    const size = givenSize == null ? items.length : givenSize
    return unshift(createWithSize(size), ...items)
}

export const createWithSize = (size) => ({
    size,
    items: [],
    [Symbol.iterator]() {
        return selectItems(this)[Symbol.iterator]()
    } 
})

export const selectSize = ({ size }) => size

export const selectItems = ({ items }) => items

export const changeSize = (list, nextSize) => ({ size: nextSize, items: selectItems(list).slice(0, nextSize) })

export const unshift = (list, ...items) => {
    const nextItems = [...items, ...list]
    return { ...list, items: nextItems.slice(0, selectSize(list)) }
}

export const map = (list, fn) => ({ ...list, items: selectItems(list).map(fn) })

export const filter = (list, fn) => ({ ...list, items: selectItems(list).filter(fn) })

export const reduce = (list, fn, initial) => selectItems(list).reduce(fn, initial)
