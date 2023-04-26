import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  data: null,
}

export const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    setProfile: (state, action) => {
        console.log({actionlogin:action})
      state.data = action.payload
    },
    clearProfile : (state) => {
      state.data = null
    }
  },
})


export const { setProfile, clearProfile } = profileSlice.actions

export default profileSlice.reducer