// ** Redux Imports
import { createSlice } from '@reduxjs/toolkit'

export const authSlice = createSlice({
  name: 'fetchParams',
  initialState: {},
  reducers: {
    handleParam: (state, action) => {
      state = {
        ...state,
        ...action.payload
      }

      return state
    }
  }
})

export const { handleParam } = authSlice.actions

export default authSlice.reducer
