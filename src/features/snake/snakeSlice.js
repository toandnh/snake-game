import { createSlice } from '@reduxjs/toolkit'


export const snakeSlice = createSlice({
    name: 'snake',
    initialState: {
        value: []
    },
    reducers: {
        updateSnake: (state, action) => {
            state.value = action.payload
        }
    }
})

export const { updateSnake } = snakeSlice.actions

export default snakeSlice.reducer