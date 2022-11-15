import { createSlice } from '@reduxjs/toolkit'


export const foodSlice = createSlice({
    name: 'food',
    initialState: {
        value: {}
    },
    reducers: {
        updateFood: (state, action) => {
            state.value = action.payload
        }
    }
})

export const { updateFood } = foodSlice.actions

export default foodSlice.reducer