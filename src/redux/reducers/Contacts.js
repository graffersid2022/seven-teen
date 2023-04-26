import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  data: null,
}

export const contactsSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {
    setContacts: (state, action) => {
        // console.log({authme:action})
      state.data = action.payload
    },
   
  },
})


export const { setContacts } = contactsSlice.actions

export default contactsSlice.reducer