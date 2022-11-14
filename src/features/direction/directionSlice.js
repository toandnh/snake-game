import { createSlice } from '@reduxjs/toolkit'


export const directionSlice = createSlice({
    name: 'direction',
    initialState: {
        value: 'e'
    },
    reducers: {
        setDir: (state, action) => {
            state.value = action.payload
        }
    }
})

export const { setDir } = directionSlice.actions

export default directionSlice.reducer