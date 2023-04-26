import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  data: null,
}

export const tokenSlice = createSlice({
  name: 'token',
  initialState,
  reducers: {
    setToken: (state, action) => {
        // console.log({actionlogin:action})
      state.data = action.payload
    },
    clearToken : (state) => {
      state.data = null
    }
  },
})


export const { setToken, clearToken } = tokenSlice.actions

export default tokenSlice.reducer