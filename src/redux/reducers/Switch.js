import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  data: [],
};

export const switchSlice = createSlice({
  name: 'switch',
  initialState,
  reducers: {
    getData: (state, action) => {
      state.data = action.payload;
    },
    setData: (state, action) => {
      const data = action.payload;
      state.data = data;
    },
  },
});

export const {getData, setData} = switchSlice.actions;

export default switchSlice.reducer;
