import {
  View,
  Text,
  Image,
  StyleSheet,
  ImageBackground,
  ScrollView,
  Platform,
  KeyboardAvoidingView,
  Alert,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {colors, family, images} from '../../../constant/Theme';
import styles from '../../../constant/styles';
import SimpleButton from '../../../components/SimpleButton';
import AsyncStorage from '@react-native-async-storage/async-storage';
import effects from '../../../constant/Animation';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import Header from '../../../components/Header';
import {useSelector, useDispatch} from 'react-redux';
import {API} from '../../../utils/endpoints/EndPoints';
import {getApi, loginApi, postApi} from '../../../utils/apicalls/ApiCalls';
import Loader from '../../../components/Loader';
import {errorRes} from '../../../utils/helper/helperFunctions';
import {setToken} from '../../../redux/reducers/loginToken';
import {setAuthme} from '../../../redux/reducers/authme';
import {setHashKey} from '../../../redux/reducers/Hash';

const Verify = ({navigation}) => {
  const [loading, setLoading] = useState(false);
  const [code, setOtp] = useState('');
  const [seconds, setSeconds] = useState(60);

  const dispatch = useDispatch();
  const registerData = useSelector((state) => state.hash.data);

  const onPress = () => {
    if (code) {
      otp_handle();
    } else {
      alert('Please fill otp');
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [seconds]);

  const otp_handle = async () => {
    const api = API.VERIFY_OTP;
    const param = {
      phone: registerData.user.phone,
      otp: code,
      hash: registerData.hash,
      phoneCountryCode: registerData.user.phoneCountryCode,
    };
    try {
      setLoading(true);
      const result = await loginApi(api, param);
      console.log({result:result?.data});
      if (result.status == 200) {
        const data = result.data;
        dispatch(setToken(data));
        console.log({data});
        setLoading(false);
        const token = data?.tokens?.access?.token;
        await AsyncStorage.setItem('token', token);
      } else {
        // alert(result.data.message);
        setTimeout(() => {
        Alert.alert('Congratulations', result.data.message, [
          {
            text: 'Okay',
            onPress: () => navigation.navigate('Login'),
          },
        ]);
      },1000)
        setOtp('');
        setLoading(false);
      }
    } catch (e) {
      setLoading(false);
      setOtp('');
      errorRes(e);
    }
  };

  const resendOtp_hanlde = async () => {
    console.log(
      '---------------------------------------',
      registerData?.data,
    );
    const api = API.RESEND_OTP;
    const param = {
      phone: registerData?.user?.phone,
      email: 'roshnigupta518@gmail.com',
      phoneCountryCode: registerData?.user?.phoneCountryCode,
    };
    try {
      console.log('-------------resend otp');
      setLoading(true);
      const result = await loginApi(api, param);
      console.log({result: result?.data});
      const data = result?.data;
      if (data) {
        setLoading(false);
        setSeconds(60);
        setOtp('');
        dispatch(setHashKey(data));
      }
    } catch (e) {
      setLoading(false);
      errorRes(e);
    }
  };

  return (
    <View style={styles.flex}>
      <ImageBackground source={images.otp} style={styles.flex}>
        <Header title={'Enter OTP Code'} onPress={() => navigation.goBack()} />
        <KeyboardAvoidingView
          style={styles.flex}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
          <ScrollView
            contentContainerStyle={mystyles.contentContainer}
            keyboardShouldPersistTaps="always">
            <View style={[mystyles.container, styles.pd20]}>
              <Text style={[styles.tx16, styles.color_S, styles.txAlignC]}>
                {'Code has been sent to '} {registerData?.data?.phone}
              </Text>

              <OTPInputView
                style={{width: '100%', height: 100}}
                pinCount={4}
                code={code} //You can supply this prop or not. The component will be used as a controlled / uncontrolled component respectively.
                onCodeChanged={(code) => {
                  setOtp(code);
                }}
                autoFocusOnLoad={false}
                codeInputFieldStyle={[mystyles.underlineStyleBase, styles.tx18]}
                codeInputHighlightStyle={mystyles.underlineStyleHighLighted}
                onCodeFilled={(code) => {
                  console.log(`Code is ${code}, you are good to go!`);
                }}
              />

              <Text
                style={[
                  styles.tx16,
                  styles.txAlignC,
                  {color: seconds == 0 ? colors.success : colors.warning},
                ]}
                onPress={() => {
                  if (seconds == 0) {
                    resendOtp_hanlde();
                  }
                }}>
                {'Resend Code in '}
                <Text style={[styles.color_S, {fontFamily: family.semibold}]}>
                  {seconds}s
                </Text>
              </Text>

              <Text style={[styles.tx10, styles.txAlignC]}>
                OTP will be expire in 5 mintues
              </Text>

              <SimpleButton
                title={'Verify'}
                onPress={() => {
                  onPress();
                }}
              />
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </ImageBackground>
      {loading && <Loader />}
    </View>
  );
};

export default Verify;

const mystyles = StyleSheet.create({
  bgimg: {
    flex: 1,
  },
  contentContainer: {
    flexGrow: 1,
    justifyContent: 'space-between',
    flexDirection: 'column',
  },
  container: {
    // flex: 1,
    // justifyContent: 'flex-end',
    marginHorizontal: 20,
    paddingTop: 5,
    backgroundColor: colors.light,
    borderColor: colors.light,
    borderWidth: 0.6,
    shadowColor: colors.dark,
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: Platform.OS == 'ios' ? 0.2 : 0.5,
    shadowRadius: 5,
    position: 'absolute',
    bottom: Platform.OS == 'ios' ? 20 : 0,
    width: '90%',
    borderRadius: 5,
  },
  borderStyleBase: {
    width: 30,
    height: 45,
  },

  borderStyleHighLighted: {
    borderColor: colors.success,
  },

  underlineStyleBase: {
    width: 63,
    height: 50,
    borderWidth: 2,
    borderColor: colors.success,
    borderRadius: 20,
  },
});
