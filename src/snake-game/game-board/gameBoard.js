import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { createSnake, createFood } from './createEntities'
import { handleMoveSnake } from './gameLogic'

import { setDir } from '../../features/direction/directionSlice'
import { setCellValue } from '../../features/grid/gridSlice'
import { resetScore } from '../../features/score/scoreSlice'
import { setGameOver } from '../../features/game-over/gameOverSlice'

import myGlobalObject from '../globals'

import './gameBoard.css'


const EMPTY_CELL_COLOR = 'rgba(0, 0, 0, 0.15)'
const SNAKE_CELL_COLOR = 'rgb(255, 255, 255)'
const FOOD_CELL_COLOR = 'hsl(100, 100%, 60%)'

const MAX_CELL_SIZE = window.innerWidth / 43

const useWindowSize = () => {
    const [size, setSize] = useState([window.innerHeight, window.innerWidth])

    useEffect(() => {
        const updateSize = () => {
            setSize([window.innerHeight, window.innerWidth])
        }
        window.addEventListener('resize', updateSize)
        updateSize()
        return () => window.removeEventListener('resize', updateSize)
    }, [])

    return size
}

const useKeyPressed = () => {
    const [keyPressed, setKeyPressed] = useState('')

    useEffect(() => {
        const handleKeyDown = (e) => {
            setKeyPressed(e.code)
        }
        window.addEventListener('keydown', handleKeyDown)
        return () => window.removeEventListener('keydown', handleKeyDown)
    }, [])

    return keyPressed
}

const GameBoard = () => {
    const grid = useSelector(state => state.grid.value)
    const gameOver = useSelector(state => state.gameOver.value)
    const snake = useSelector(state => state.snake.value)
    const food = useSelector(state => state.food.value)
    const dir = useSelector(state => state.dir.value)
    const score = useSelector(state => state.score.value)
    const highScore = useSelector(state => state.highScore.value)

    const [cellSize, setCellSize] = useState(MAX_CELL_SIZE)

    const keyPressed = useKeyPressed()
    const windowSize = useWindowSize()

    const dispatch = useDispatch()

    const handleDirectionKeyDown = (e) => {
        if (dir !== 's' && (e === 'ArrowUp' || e === 'KeyW'))
            dispatch(setDir('n'))
        else if (dir !== 'n' && (e === 'ArrowDown' || e === 'KeyS'))
            dispatch(setDir('s'))
        else if (dir !== 'e' && (e === 'ArrowLeft' || e === 'KeyA'))
            dispatch(setDir('w'))
        else if (dir !== 'w' && (e === 'ArrowRight' || e === 'KeyD'))
            dispatch(setDir('e'))
    }

    useEffect(() => {
        createSnake(dispatch)
        createFood(grid, dispatch)
    }, [])

    useEffect(() => {
        let boardWidth = windowSize[1] * 0.675

        let numRow = myGlobalObject.NUM_ROW
        let numCol = myGlobalObject.NUM_COL
        
        let cell = (boardWidth / numCol) - 2
        if (cell <= MAX_CELL_SIZE) {
            let boardHeight = cell * numRow + 2
            let top = Math.ceil(((windowSize[0] - boardHeight) / 2) / windowSize[0] * 100)

            setCellSize(cell)

            document.documentElement.style.setProperty('--tile-size', `${cell}px`)
            document.documentElement.style.setProperty('--y', `${top - 10}%`)
        }
    }, [windowSize])

    useEffect(() => {
        if (gameOver) {
            document.documentElement.style.setProperty('--visible', 'visible')

            if (keyPressed === 'Space') {
                document.documentElement.style.setProperty('--visible', 'hidden')
                let i = snake.length
                while (i--) {
                    dispatch(setCellValue({row: snake[i].row, col: snake[i].col, val: 'empty'}))
                }
                dispatch(setCellValue({row: food.row, col: food.col, val: 'empty'}))

                dispatch(setDir('e'))
                dispatch(resetScore())

                createSnake(dispatch)
                createFood(grid, dispatch)

                dispatch(setGameOver(false))
            }
        }
    }, [gameOver, keyPressed])

    useEffect(() => {
        if (!gameOver) {
            handleMoveSnake(grid, snake, dir, food, score, highScore, dispatch)
            handleDirectionKeyDown(keyPressed)
        }
    }, [snake])

    return (
        <div 
            className='container'>
            <div className='popupText'>Press 'space' to start a new game!</div>
            <div className={!gameOver ? 'run' : 'over'}>
                {grid.map((row, rowIndex) => (
                    row.map((cell, cellIndex) => (
                        <div 
                            className='cell'
                            key={`${rowIndex}${cellIndex}`}
                            style={{
                                backgroundColor: cell === 'empty' ? EMPTY_CELL_COLOR : 
                                                    (cell === 'snake' ? SNAKE_CELL_COLOR : FOOD_CELL_COLOR),
                                height: `${cellSize}px`,
                                width: `${cellSize}px`
                            }}>
                        </div>
                    ))
                ))}
            </div>
        </div>
    );
}

export default GameBoard