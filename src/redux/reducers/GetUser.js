import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {API} from '../../utils/endpoints/EndPoints';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {getApi} from '../../utils/apicalls/ApiCalls';
import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';

export const getUser = createAsyncThunk('user', async id => {
  const api = API.GET_USER + id;
  const response = await getApi(api);
  // console.log({responsefromchatscreen :response.data})
  return response?.data?.user;
});

const getUserSlice = createSlice({
  name: 'getUser',
  initialState: {
    userdata: {},
    loading: false,
  },
  extraReducers: {
    [getUser.pending]: (state, action) => {
      state.loading = true;
    },
    [getUser.fulfilled]: (state, action) => {
      (state.loading = false), (state.userdata = action.payload);
    },
    [getUser.rejected]: (state, action) => {
      state.loading = false;
    },
  },
});

export default getUserSlice.reducer;

//****************RTK Quary********************************* *//
// export const getUserApi = createApi({
//   reducerPath: 'getUserApi',
//   baseQuery: fetchBaseQuery({
//     baseUrl: 'https://api-7teen.herokuapp.com/v1/',
//     prepareHeaders: async (headers, {getState}) => {
//       const token = await AsyncStorage.getItem('token');
//       const stateInfo = getState();
//       console.log({stateInfo});
//       headers.set('authorization', token);
//       return headers;
//     },
//   }),
//   endpoints: builder => ({
//     getUserById: builder.query({
//       query: id => ({
//         url: 'users/62da61ad3bec60002219f601',
//         method: 'GET',
//       }),
//     }),
//   }),
// });

// export const {useGetUserByIdQuery} = getUserApi;
