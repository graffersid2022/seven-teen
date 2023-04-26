import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Text, Image, ImageBackground} from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';
import GradientStatusBar from '../../../components/StatusBar';
import {images} from '../../../constant/Theme';
import {colors} from '../../../constant/Theme';
import styles from '../../../constant/styles';
import LinearGradient from 'react-native-linear-gradient';
import {CometChat} from '@cometchat-pro/react-native-chat';
import {
  PermissionsAndroid,
  Platform,
} from 'react-native';
import {environment} from "../../../utils/Constant";
import { getfcmToken } from '../../../utils/notification/Notification_service';

const App = ({navigation}) => {

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
          console.log('CometChat successfully init=>', res)
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
        ]);
        if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
          granted = await PermissionsAndroid.requestMultiple([
            PermissionsAndroid.PERMISSIONS.CAMERA,
            PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
            PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
            PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          ]);
        }
      }
    };
    getPermissions();
    getfcmToken();
  }, []);

  const onDone = () => {
    navigation.navigate('Login');
  };
  const onSkip = () => {
    navigation.navigate('Login');
  };

  const _renderNextButton = () => {
    return (
      <LinearGradient
        colors={['#00FFE5', '#0078FF']}
        start={{x: 1, y: 0}} // Gradient starting coordinates
        end={{x: 0, y: 0.5}} // Gradient ending coordinates
        style={mystyles.appButtonContainer}>
        <Text style={[styles.tx16, styles.color_L]}>NEXT</Text>
      </LinearGradient>
    );
  };

  const _renderSkipButton = () => {
    return (
      <View style={mystyles.appButtonContainer}>
        <Text style={styles.tx16}>Skip</Text>
      </View>
    );
  };

  const RenderItem = ({item}) => {
    return (
      <View style={styles.flex}>
        <ImageBackground style={styles.flex} source={item.image}>
          <Image source={images.intro_logo} style={styles.logosty} />
          <View style={[styles.pd20, mystyles.introImageStyle]}>
            <Text style={[styles.tx24, styles.color_S, styles.txAlignC]}>
              {item.title}
            </Text>
            <Text style={[styles.tx14, styles.txAlignC, styles.pd20]}>
              {item.text}
            </Text>
          </View>
        </ImageBackground>
      </View>
    );
  };

  return (
    <>
      <GradientStatusBar />

      <AppIntroSlider
        data={slides}
        renderItem={RenderItem}
        onDone={onDone}
        showSkipButton={true}
        onSkip={onSkip}
        activeDotStyle={{backgroundColor: colors.secondary}}
        renderNextButton={_renderNextButton}
        renderSkipButton={_renderSkipButton}
        renderDoneButton={_renderNextButton}
      />
    </>
  );
};

export default App;

const mystyles = StyleSheet.create({
  introImageStyle: {
    position: 'absolute',
    bottom: '10%',
  },
  appButtonContainer: {
    borderRadius: 50,
    paddingVertical: 10,
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const slides = [
  {
    key: 's1',
    text: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text.',
    title: 'Secure Messaging',
    image: images.intro1,
    backgroundColor: '#20d2bb',
  },
  {
    key: 's2',
    title: 'Call with friends',
    text: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text.',
    image: images.intro2,
    backgroundColor: '#febe29',
  },
  // {
  //   key: 's3',
  //   title: 'Update your daily status',
  //   text: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text.',
  //   image: images.intro,
  //   backgroundColor: '#22bcb5',
  // },
];
