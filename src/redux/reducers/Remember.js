import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  data: null,
}

export const rememberSlice = createSlice({
  name: 'remember',
  initialState,
  reducers: {
    setRemember: (state, action) => {
      console.log({action})
      state.data = action.payload
    },
  },
})


export const { setRemember } = rememberSlice.actions

export default rememberSlice.reducer