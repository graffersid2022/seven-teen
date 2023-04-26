import messaging from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-async-storage/async-storage';

export async function requestUserPermission() {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    console.log('Authorization status:', authStatus);
    getfcmToken();
  }
}

export const getfcmToken = async() => {
    let fcmtoken = await AsyncStorage.getItem('fcmtoken')
    console.log(fcmtoken, 'The old fcmtoken')
    if(!fcmtoken){
        try{
     const fcmtoken = await messaging().getToken();
     if(fcmtoken){
         console.log('new genrated fcmtoken', fcmtoken)
        await AsyncStorage.setItem('fcmtoken', fcmtoken)
     }
    }catch(e){
        console.log('token error',e)
        alert(e)
        requestUserPermission()
    }
    }
}

export const notificationListner = async() => {
    messaging().onNotificationOpenedApp(remoteMessage => {
        console.log(
          'Notification caused app to open from background state:',
          remoteMessage.notification,
        );
      });

      messaging().onMessage(async remoteMessage => {
          console.log("received in forground", remoteMessage)
      });

      messaging()
      .getInitialNotification()
      .then(remoteMessage => {
        if (remoteMessage) {
          console.log(
            'Notification caused app to open from quit state:',
            remoteMessage.notification,
          );
        }
      });
}

//---For ios 
//---1. You should have apple dev account.
//---2. Go to certificates, identifire and keys then fill it.
//---3. drag p8 file in firebase account enter team id and key id.
//---4. Go to xcode signinandcapabilities and click on plus icon and add push notification

