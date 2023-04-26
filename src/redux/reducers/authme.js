import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  data: null,
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthme: (state, action) => {
        // console.log({authme:action})
      state.data = action.payload
    },
    clearAuth : (state) => {
      state.data = null
    }
  },
})


export const { setAuthme, clearAuth } = authSlice.actions

export default authSlice.reducer