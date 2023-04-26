import {configureStore} from '@reduxjs/toolkit';
import switchReducer from '../reducers/Switch';
import hashReducer from '../reducers/Hash';
import rememberReducer from '../reducers/Remember';
import tokenReducer from '../reducers/loginToken';
import getUserReducer from '../reducers/GetUser';
import HeaderId from '../reducers/HeaderId';
import {setupListeners} from '@reduxjs/toolkit/query';
import conversationExist from '../reducers/ConversationExists';
import authme from '../reducers/authme';
import profileComplete from '../reducers/profileComplete';
import Contacts from '../reducers/Contacts';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {combineReducers} from '@reduxjs/toolkit';

const persistConfig = {
  key: 'observeNow',
  version: 1,
  storage: AsyncStorage,
};

const hashPersistConfig = {
  key: 'hash',
  storage: AsyncStorage,
  whitelist: ['hash'],
};

const rememberPersistConfig = {
  key: 'remember',
  storage: AsyncStorage,
  whitelist: ['remember'],
};

const tokenPersistConfig = {
  key: 'token',
  storage: AsyncStorage,
  whitelist: ['token'],
};

const authPersistConfig = {
  key: 'token',
  storage: AsyncStorage,
  whitelist: ['auth'],
};

const profilePersistConfig = {
  key: 'profile',
  storage: AsyncStorage,
  whitelist: ['profile'],
};

const rootReducer = combineReducers({
  switch: switchReducer,
  hash: persistReducer(hashPersistConfig, hashReducer),
  remember: persistReducer(rememberPersistConfig, rememberReducer),
  loginToken: persistReducer(tokenPersistConfig, tokenReducer),
  getUser: getUserReducer,
  HeaderId:HeaderId,
  conversationExist: conversationExist,
  ContactsList:Contacts,
  authme : persistReducer(authPersistConfig, authme),
  profileComplete :persistReducer(profilePersistConfig, profileComplete),
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

setupListeners(store.dispatch);
