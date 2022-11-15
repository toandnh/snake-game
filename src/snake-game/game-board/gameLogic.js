import { setCellValue } from '../features/grid/gridSlice'
import { updateSnake } from '../features/snake/snakeSlice'
import { addScore } from '../features/score/scoreSlice'
import { setHighScore } from '../features/high-score/highScoreSlice'
import { setGameOver } from '../features/game-over/gameOverSlice'

import { createFood } from './createEntities'

import myGlobalObject from '../globals'


const SPEED = 100

export const handleMoveSnake = (grid, snake, dir, food, score, highScore, dispatch) => {
    let newSnake = getNewSnakeLocation(snake, dir)
    let addedScore = 0
    let isOver = false
    let isHighScore = false

    if (JSON.stringify(newSnake[0]) === JSON.stringify(snake[1])) {
        //move in the opposite direction.
    } else {
        if (JSON.stringify(newSnake[0]) === JSON.stringify(food)) {
            addedScore = 10
            if (score + addedScore > highScore)
                isHighScore = true
            increaseSnakeLength(newSnake, dir)
        }

        if (grid[newSnake[0].row][newSnake[0].col] === 'snake')
            isOver = true
        
        setTimeout(() => {
            handleDispatch(grid, snake, newSnake, score, addedScore, isHighScore, isOver, dispatch)
        }, SPEED)
    }       
}

const getNewSnakeLocation = (snake, dir) => {
    let newSnake = []
    snake.forEach((pos, index) => {
        newSnake[index] = {...pos}
    })

    let head = getNewHead(newSnake[0], dir)
    newSnake.unshift(head)
    newSnake.pop()

    return newSnake
}

const getNewHead = (head, dir) => {
    let numRow = myGlobalObject.NUM_ROW
    let numCol = myGlobalObject.NUM_COL

    let newHead = {...head}
    switch (dir) {
        case 'n':
            newHead.row -= 1
            if (newHead.row < 0)
                newHead.row = numRow - 1
            break
        case 's':
            newHead.row += 1
            if (newHead.row >= numRow) 
                newHead.row = 0
            break
        case 'e':
            newHead.col += 1
            if (newHead.col >= numCol)
                newHead.col = 0
            break
        case 'w':
            newHead.col -= 1
            if (newHead.col < 0) 
                newHead.col = numCol - 1
            break
        default:
            break
    }
    return newHead
}

const increaseSnakeLength = (snake, dir) => {
    let reverseDir = ''
    if (dir === 'n' || dir === 's')
        reverseDir = dir === 'n' ? 's' : 'n'
    else
        reverseDir = dir === 'e' ? 'w' : 'e'
    let newTail = getNewHead(snake[0], reverseDir)
    snake.push(newTail)
}

const handleDispatch = (grid, snake, newSnake, score, addedScore, isHighScore, isOver, dispatch) => {
    if (isHighScore)
        dispatch(setHighScore(score + addedScore))
    if (addedScore)
        dispatch(addScore(addedScore))

    if (isOver) {
        dispatch(setGameOver(true))
    } else {
        let i = snake.length
        while (i--)
            dispatch(setCellValue({row: snake[i].row, col: snake[i].col, val: 'empty'}))

        i = newSnake.length
        while (i--)
            dispatch(setCellValue({row: newSnake[i].row, col: newSnake[i].col, val: 'snake'}))

        if (addedScore)
            createFood(grid, dispatch)

        dispatch(updateSnake(newSnake))
    }
} 