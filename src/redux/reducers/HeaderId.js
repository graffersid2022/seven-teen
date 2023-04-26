import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  data: null,
}

export const headerSlice = createSlice({
  name: 'headerId',
  initialState,
  reducers: {
    setHeaderId: (state, action) => {
      state.data = action.payload
    },
  },
})


export const { setHeaderId } = headerSlice.actions

export default headerSlice.reducer