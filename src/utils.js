const checker = [[-1, -1], [0, -1], [1, -1], [-1, 0], [1, 0], [-1, 1], [0, 1], [1, 1]]

const formulateGrid = (grid) => {
    const aliveCells = grid.filter(item => checkAmountOfNeighbours(item, grid) === 2 || checkAmountOfNeighbours(item, grid) === 3)
    const regenCells = regenerateCells(grid)
    return nextGenerationCells([...aliveCells, ...regenCells])
}

const checkAmountOfNeighbours = (singleCell, remainingCells)  => {
    let neighbours = 0
    checker.forEach(item => {
        const xCoord = item[0] + singleCell[0]
        const yCoord = item[1] + singleCell[1]
        if (remainingCells.some(eachItem => eachItem[0] === xCoord && eachItem[1] === yCoord)) {
            neighbours++
        }
    })
    return neighbours
}

const regenerateCells = (grid) => {
    const result = []
    grid.forEach(cell => {
        checker.forEach(item => {2
            const xCoord = item[0] + cell[0]
            const yCoord = item[1] + cell[1]
            const newCoords = [xCoord, yCoord]
            if ((checkAmountOfNeighbours(newCoords, grid)) === 3) {
                result.push(newCoords)
            }
        })
    })
    return nextGenerationCells(result)
}

const nextGenerationCells = array => {
    const newSet = new Set()
    array.forEach(item => {
        newSet.add(`${item[0]},${item[1]}`)
    })
    return [...newSet].map(item => item.split(',').map(Number))
    .filter(item => item[0] >= 0 && item[1] >= 0)
    .sort((a, b) => a[0] - b[0] !== 0 ? a[0] - b[0] : a[1] - b[1])
}

const printNextGeneration = grid => {
    process.stdout.write(`\n`)
    const outerArray = grid.map(item => item.split(',').map(Number))
    formulateGrid(outerArray).forEach(item => {
        const newString = `${item[0]}, ${item[1]}`
        process.stdout.write(`${newString}\n`)
    })
    process.stdout.write('end\n\n')
    process.exit()
}

module.exports = {
    formulateGrid,
    checkAmountOfNeighbours,
    regenerateCells,
    printNextGeneration
}