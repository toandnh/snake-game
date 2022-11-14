import { setCellValue } from '../../features/grid/gridSlice'
import { updateFood } from '../../features/food/foodSlice'
import { updateSnake } from '../../features/snake/snakeSlice'


const STARTING_ROW = 3
const STARTING_COL = 8

//generate a number from min (inclusive) to max (inclusive).
const randInt = (max, min) => {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

export const createFood = (grid, dispatch) => {
    let row = randInt(0, 15)
    let col = randInt(0, 27)

    if (grid[row][col] === 'snake') {
        row = randInt(0, 15)
        col = randInt(0, 27)
    }
    
    dispatch(updateFood({row, col}))
    dispatch(setCellValue({row: row, col: col, val: 'food'}))
}

export const createSnake = (dispatch) => {
    const snakeLength = 4
    const snake = []
    for (let i = 0; i < snakeLength; i++)
        snake.push({row: STARTING_ROW, col: STARTING_COL - i})

    let i = snake.length
    while (i--)
        dispatch(setCellValue({row: snake[i].row, col: snake[i].col, val: 'snake'}))
    dispatch(updateSnake(snake))
}