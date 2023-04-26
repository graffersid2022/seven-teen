import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  data: null,
}

export const conversationExistSlice = createSlice({
  name: 'conversationExists',
  initialState,
  reducers: {
    setConversationExist: (state, action) => {
      // console.log({action})
      state.data = action.payload
    },
  },
})


export const { setConversationExist } = conversationExistSlice.actions

export default conversationExistSlice.reducer