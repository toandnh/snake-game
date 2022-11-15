import { createSlice } from '@reduxjs/toolkit'


export const gameOverSlice = createSlice({
    name: 'game-over',
    initialState: {
        value: false
    },
    reducers: {
        setGameOver: (state, action) => {
            state.value = action.payload
        }
    }
})

export const { setGameOver } = gameOverSlice.actions

export default gameOverSlice.reducer