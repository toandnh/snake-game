import { createSlice } from '@reduxjs/toolkit'


const getHighScore = () => {
    let highScore = localStorage.getItem('highscore')
    if (highScore === null) {
        highScore = '0'
        localStorage.setItem('highscore', highScore)
    }
    return parseInt(highScore)
}

export const highScoreSlice = createSlice({
    name: 'high-score',
    initialState: {
        value: getHighScore()
    },
    reducers: {
        setHighScore: (state, action) => {
            state.value = action.payload
            localStorage.setItem('highscore', JSON.stringify(action.payload))
        }
    }
})

export const { setHighScore } = highScoreSlice.actions

export default highScoreSlice.reducer