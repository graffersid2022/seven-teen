import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,Alert
} from 'react-native';
import React, {useState, useEffect, useRef} from 'react';
import {colors, family, images} from '../../../constant/Theme';
import styles from '../../../constant/styles';
import Label from '../../../components/Label';
import SimpleButton from '../../../components/SimpleButton';
import {loginApi} from '../../../utils/apicalls/ApiCalls';
import {API} from '../../../utils/endpoints/EndPoints';
import {ValidateMobile} from '../../../utils/helper/validations';
import {errorRes} from '../../../utils/helper/helperFunctions';
import {setHashKey} from '../../../redux/reducers/Hash';
import {useDispatch, useSelector} from 'react-redux';
import Loader from '../../../components/Loader';
import CheckBox from '@react-native-community/checkbox';
import {setRemember} from '../../../redux/reducers/Remember';
import PhoneInput from 'react-native-phone-number-input';
import AsyncStorage from '@react-native-async-storage/async-storage';
import messaging from '@react-native-firebase/messaging';

const Login = ({navigation}) => {
  const [loading, setLoading] = useState(false);
  const [phone, setPhone] = useState('');
  const [vnumber, setvnumber] = useState(false);
  const [toggleCheckBox, setToggleCheckBox] = useState(false);
  const [phoneCountryCode, setphoneCountryCode] = useState('IN');
  const phoneInput = useRef(null);

  const remember_data = useSelector((state) => state.remember?.data);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log({remember_data});
    getRememberData();
  }, []);

  const getRememberData = () => {
    const data = remember_data?.remember;
    const number = remember_data?.number;
    if (data == true) {
      setToggleCheckBox(true);
      if (number) {
        setPhone(number);
      }
    }
  };

  onPress = () => {
    const mobileError = ValidateMobile(phone);
    if (phone?.trim() == '') {
      phone.trim() == '' ? setvnumber(false) : null;
    }
    console.log({mobileError});
    if (mobileError) {
      const checkValid = phoneInput.current?.isValidNumber(phone);
      console.log({checkValid});
      if (checkValid) {
        Auth_Handle();
      } else {
        alert('Your number is not valid, Please enter the valid number');
      }
    }
  };

  const Auth_Handle = async () => {
    // let fcmtoken = await AsyncStorage.getItem('fcmtoken')
    const fcmtoken = await messaging().getToken();
    const api = API.REGISTER;
    console.log({fcmtoken});
    const param = {
      phone: phone,
      email: 'roshnigupta518@gmail.com',
      phoneCountryCode:
        phoneCountryCode == 'IN' ? '+91' : '+' + phoneCountryCode,
      FCMToken: fcmtoken?.toString(),
    };
    if (fcmtoken) {
      try {
        console.log({api, param});
        setLoading(true);
        const result = await loginApi(api, param);
        console.log({result});
        const data = {
          remember: toggleCheckBox,
          number: phone,
        };
        dispatch(setRemember(data));
        if (result.status == 201) {
          setLoading(false);
          navigation.navigate('Verify');
          const data = result.data;
          dispatch(setHashKey(data));
        } else {
          alert(result.data.message);
          setLoading(false);
        }
      } catch (e) {
          setLoading(false);
          errorRes(e);
      }
    } else {
      alert('token not exists');
    }
  };

  const onSubmitEditing = () => {
    // setvnumber(false);
  };
  const data = remember_data;
  return (
    <View style={styles.flex}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <KeyboardAvoidingView
          style={styles.flex}
          behavior={Platform.OS === 'ios' ? 'padding' : null}>
          <ScrollView
            contentContainerStyle={mystyles.contentContainer}
            keyboardShouldPersistTaps="always">
            <ImageBackground source={images.signup} style={styles.flex}>
              <Image source={images.intro_logo} style={styles.logosty} />
              <View style={mystyles.container}>
                <Text style={[styles.tx24, styles.color_S, styles.txAlignC]}>
                  {'Sign Up'}
                </Text>
                <View style={styles.pd20}>
                  <Label title={'Phone Number'} />
                  <View>
                    <PhoneInput
                      ref={phoneInput}
                      textInputStyle={[
                        // !vnumber ? styles.dropdown : styles.err_dropdown,
                        styles.dropdown,
                      ]}
                      textContainerStyle={{backgroundColor: 'transparent'}}
                      containerStyle={{backgroundColor: 'transparent'}}
                      // value={phone}
                      defaultValue={data?.remember?data.number:""}
                      defaultCode={phoneCountryCode}
                      layout="first"
                      onChangeText={(text) => {
                        setPhone(text);
                        // , setvnumber(true);
                      }}
                      onChangeCountry={(text) => {
                        console.log('code', text.callingCode);
                        setphoneCountryCode(text?.callingCode?.toString());
                      }}
                      onChangeFormattedText={(text) => {}}
                      textInputProps={{
                        onSubmitEditing: onSubmitEditing,
                      }}
                    />
                  </View>
                  <View style={[styles.row, styles.align_C]}>
                    <CheckBox
                      disabled={false}
                      tintColors={{true: colors.success}}
                      onCheckColor={colors.success}
                      value={toggleCheckBox}
                      onValueChange={(newValue) => {
                        setToggleCheckBox(newValue);
                        const data = {
                          remember: newValue,
                          number: phone,
                        };
                        dispatch(setRemember(data));
                      }}
                    />
                    <Text style={[styles.tx14, styles.mr_H20]}>
                      Remember me
                    </Text>
                  </View>
                </View>
                <View style={[styles.mr_H20, styles.mb10]}>
                  <SimpleButton title={'Sign Up'} onPress={() => onPress()} />

                  <TouchableOpacity
                    onPress={() => [navigation.navigate('Login')]}>
                    <Text style={[styles.tx12, styles.txAlignC]}>
                      {'Already have an account? '}
                      <Text
                        style={[styles.color_S, {fontFamily: family.semibold}]}>
                        {'Sign in'}
                      </Text>
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </ImageBackground>
          </ScrollView>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
      {loading && <Loader />}
    </View>
  );
};

export default Login;

const mystyles = StyleSheet.create({
  contentContainer: {
    flexGrow: 1,
    justifyContent: 'space-between',
    flexDirection: 'column',
  },
  bgimg: {
    width: '100%',
    height: '65%',
    resizeMode: 'cover',
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
  inputIcon: {
    width: 20,
    height: 20,
    position: 'absolute',
    left: 25,
    top: 24,
  },
});
