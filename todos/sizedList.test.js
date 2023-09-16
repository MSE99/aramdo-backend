import * as SizedList from './sizedList.js'

describe("SizedList", () => {
    it('should create a new SizedList.', () => {
        const list = SizedList.createWithSize(30)
        const arr = [...list]

        expect(arr).toEqual([])
        expect(SizedList.selectSize(list)).toEqual(30)
    })

    it('should only keep the 3 recent items in the list.', () => {
        const list = SizedList.unshift(
            SizedList.createWithSize(3),
            10, 20, 30
        )

        const updatedList = SizedList.unshift(list, 40, 50)
        expect(SizedList.selectItems(updatedList)).toEqual([40, 50, 10])
    })

    it('should be able to build a list from an iterable.', () => {
        const iterable = [10, 20, 30]
        const list = SizedList.from(iterable, 2)
        expect(SizedList.selectItems(list)).toEqual([10, 20])
    })

    it('should be an iterable.', () => {
        const list = SizedList.from([10, 20, 30, 40, 50])
        const arr = [...list]
        expect(arr).toEqual([10, 20, 30, 40, 50])
    })

    it('should have a map function for creating a new list.', () => {
        const list = SizedList.from([1, 2, 3, 4, 5])
        const mapped = SizedList.map(list, x => x * 10)
        expect([...mapped]).toEqual([10, 20, 30, 40, 50])
    })

    it('should have a filter function for creating a new filtered list.', () => {
        const list = SizedList.from([1, 2, 3, 4, 5])
        const filtered = SizedList.filter(list, x => x % 2 === 0)
        expect([...filtered]).toEqual([2, 4])
    })

    it('should have a reduce function for reducing the list into a single item.', () => {
        const list = SizedList.from([1, 2, 3, 4, 5])
        expect(
            SizedList.reduce(list, (acc, x) => acc + x, 0)
        ).toEqual(15)
    })
})
