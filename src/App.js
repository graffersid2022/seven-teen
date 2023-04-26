import React, {useEffect} from 'react';
import Route from './route/Route';
import {store} from './redux/store/Store';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {persistStore} from 'redux-persist';
import {CometChat} from '@cometchat-pro/react-native-chat';
import {PermissionsAndroid, Platform, Text} from 'react-native';
import {environment} from './utils/Constant';
import ErrorBoundries from '../src/components/ErrorBoundary';

let persistor = persistStore(store);

const App = () => {
  var appSetting = new CometChat.AppSettingsBuilder()
    .subscribePresenceForAllUsers()
    .setRegion(environment.REGION)
    .autoEstablishSocketConnection(true)
    .build();

  useEffect(() => {
    CometChat.init(environment.APP_ID, appSetting)
      .then((res) => {
        if (CometChat.setSource) {
          CometChat.setSource('ui-kit', Platform.OS, 'react-native');
          console.log('CometChat successfully init=>', res);
        }
      })
      .catch(() => {
        return null;
      });

    const getPermissions = async () => {
      if (Platform.OS === 'android') {
        let granted = await PermissionsAndroid.requestMultiple([
          PermissionsAndroid.PERMISSIONS.CAMERA,
          PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
          PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
        ]);
        if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
          granted = await PermissionsAndroid.requestMultiple([
            PermissionsAndroid.PERMISSIONS.CAMERA,
            PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
            PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
            PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
            PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
          ]);
        }
      }
    };
    getPermissions();
  }, []);

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ErrorBoundries>
          <Route />
        </ErrorBoundries>
      </PersistGate>
    </Provider>
  );
};

export default App;
