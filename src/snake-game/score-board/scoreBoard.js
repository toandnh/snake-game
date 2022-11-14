import React from 'react'
import { useSelector } from 'react-redux'

import './scoreBoard.css'

const ScoreBoard = () => {
    let highScore = useSelector(state => state.highScore.value)
    let score = useSelector(state => state.score.value)

    return (
        <div className='score-container'>
            <div className='high-score'>High Score: {highScore}</div>
            <div className='score'>Score: {score}</div>
        </div>
    );
}

export default ScoreBoard;