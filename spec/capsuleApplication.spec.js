const { expect } = require('chai')
const { capsule, checkAmountOfNeighbours, regenerateCells, Comparator } = require('../')

const grid1 = [[1, 2], [1, 3], [1, 4]]
const grid2 = [[2, 2], [2, 3], [3, 2], [3, 3]]
const grid3 = [[1, 2], [1, 3], [1, 4], [1, 5]]
const remainingCells = [[1, 2], [1, 3], [1, 4], [2, 1], [2, 2]]

describe('Capsule Application - Bacteria', () => {
    it('Returns an empty array when passed an empty array', () => {
        expect(capsule([])).to.eql([])
    })
    
    // Checking the amount of neighbours for each cell 
    it('Returns the amount of neighbours of a specified cell', () => {
        const singleCell = [0, 0]
        expect(checkAmountOfNeighbours(singleCell, remainingCells)).to.equal(0)
    })
    it('Returns the amount of neighbours of a specified cell', () => {
        const singleCell = [1, 0]
        expect(checkAmountOfNeighbours(singleCell, remainingCells)).to.equal(1)
    })
    it('Returns the amount of neighbours of a specified cell', () => {
        const singleCell = [1, 1]
        expect(checkAmountOfNeighbours(singleCell, remainingCells)).to.equal(3)
    })
    it('Returns the amount of neighbours of a specified cell', () => {
        const singleCell = [2, 3]
        expect(checkAmountOfNeighbours(singleCell, remainingCells)).to.equal(4)
    })

    
    // Compare arrays within arrays and sort
    it('Compare arrays within arrays and sort then into order', () => {
        const array = [[1, 3], [1, 1], [1, 2]]
        expect(array.sort(Comparator)).to.eql([[1, 1], [1, 2], [1, 3]])
    })
    it('Compare arrays within arrays and sort then into order', () => {
        const array = [[0, 3], [0, 11], [0, 2]]
        expect(array.sort(Comparator)).to.eql([[0, 2], [0, 3], [0, 11]])
    })
    it('Compare arrays within arrays and sort then into order', () => {
        const array = [[3, 2], [3, 3], [2, 2], [2, 3]]
        expect(array.sort(Comparator)).to.eql([[2, 2], [2, 3], [3, 2], [3, 3]])
    })
  
    // Calculates the regeneration of dead cells
    it('Cell regeneration to regenerate dead cells with 3 live neighbours', () => {
        expect(regenerateCells(grid1)).to.eql([[0, 3], [2, 3]])
    })
    it('Cell regeneration to regenerate dead cells with 3 live neighbours', () => {
        expect(regenerateCells(grid2)).to.eql(grid2)
    })
    it('Cell regeneration to regenerate dead cells with 3 live neighbours', () => {
        const answer = [[0, 3], [0, 4], [2, 3], [2, 4]]
        expect(regenerateCells(grid3)).to.eql(answer)
    })

    // Final capsule result
    it('An input will return a new array of live cells', () => {
        const answer = [[0, 3], [1, 3], [2, 3]]
        expect(capsule(grid1)).to.eql(answer)
    })
    it('An input will return a new array of live cells', () => {
        expect(capsule(grid2)).to.eql(grid2)
    })
    it('An input will return a new array of live cells', () => {
        const finalQuestion = [[1, 2], [2, 2], [3, 2], [1000000001 ,1000000002], [1000000002 ,1000000002], [1000000003 ,1000000002]]
        const finalAnswer = [[2, 1], [2, 2], [2, 3], [1000000002 ,1000000001], [1000000002 ,1000000002], [1000000002 ,1000000003]]
        expect(capsule(finalQuestion)).to.eql(finalAnswer)
    })
})