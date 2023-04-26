import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  data: null,
}

export const hashSlice = createSlice({
  name: 'hash',
  initialState,
  reducers: {
    setHashKey: (state, action) => {
      // console.log({action})
      state.data = action.payload
    },
  },
})


export const { setHashKey } = hashSlice.actions

export default hashSlice.reducer