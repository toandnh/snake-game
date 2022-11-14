import { createSlice } from '@reduxjs/toolkit'


export const scoreSlice = createSlice({
    name: 'score',
    initialState: {
        value: 0
    },
    reducers: {
        addScore: (state, action) => {
            state.value += action.payload
        },
        resetScore: (state) => {
            state.value = 0
        }
    }
})

export const { addScore, resetScore } = scoreSlice.actions

export default scoreSlice.reducer