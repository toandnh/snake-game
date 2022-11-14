import { configureStore } from '@reduxjs/toolkit'

import gridReducer from '../features/grid/gridSlice'
import gameOverReducer from '../features/game-over/gameOverSlice'
import snakeReducer from '../features/snake/snakeSlice'
import foodReducer from '../features/food/foodSlice'
import directionReducer from '../features/direction/directionSlice'
import scoreReducer from '../features/score/scoreSlice'
import highScoreReducer from '../features/high-score/highScoreSlice'


export default configureStore({
  reducer: {
    grid: gridReducer,
    gameOver: gameOverReducer,
    snake: snakeReducer,
    food: foodReducer,
    dir: directionReducer,
    score: scoreReducer,
    highScore: highScoreReducer
  }
})