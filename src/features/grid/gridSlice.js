import { createSlice } from '@reduxjs/toolkit'


import myGlobalObject from '../../snake-game/globals'

export const gridSlice = createSlice({
    name: 'grid',
    initialState: {
        value: new Array(myGlobalObject.NUM_ROW).fill('empty').map(() => new Array(myGlobalObject.NUM_COL).fill('empty'))
    },
    reducers: {
        setCellValue: (state, action) => {
            state.value[action.payload.row][action.payload.col] = action.payload.val
        }
    }
})

export const { setCellValue } = gridSlice.actions

export default gridSlice.reducer