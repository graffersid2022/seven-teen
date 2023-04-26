import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  BackHandler,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import React, {useState, useRef, useEffect} from 'react';
import {colors, images} from '../../constant/Theme';
import st from '../../constant/styles';
import {Picker} from '@react-native-picker/picker';
import * as Animatable from 'react-native-animatable';
import DateTimePicker from '@react-native-community/datetimepicker';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import PhoneInput from 'react-native-phone-number-input';
import effects from '../../constant/Animation';
import Header from '../../components/Header';
import Label from '../../components/Label';
import InputBox from '../../components/InputBox';
import SimpleButton from '../../components/SimpleButton';
import LinearGradient from 'react-native-linear-gradient';
import ImageUpload from '../../HOCs/ActionModal';
import RNExitApp from 'react-native-exit-app';
import {
  getPickerImageResp,
  cometChatLogin_handle,
} from '../../utils/helper/helperFunctions';
import {API} from '../../utils/endpoints/EndPoints';
import {getApi, patchApi, postApi, putApi} from '../../utils/apicalls/ApiCalls';
import {
  errorRes,
  cometChatProfilePic_handle,
} from '../../utils/helper/helperFunctions';
import {useSelector, useDispatch} from 'react-redux';
import Loader from '../../components/Loader';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-simple-toast';
import CardImg from '../../components/CardImg';
import {useFocusEffect} from '@react-navigation/native';
import {ValidateMail} from '../../utils/helper/validations';
import {environment} from '../../utils/Constant';
import RadioForm, {
  RadioButton,
  RadioButtonInput,
  RadioButtonLabel,
} from 'react-native-simple-radio-button';
import {setAuthme} from '../../redux/reducers/authme';
import {setProfile} from '../../redux/reducers/profileComplete';
import {Avatar, Accessory} from 'react-native-elements';

const Profile = ({navigation, imagepath}) => {
  const [parentUserName, setParentUserName] = useState('');
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [attachments, setAttachments] = useState(null);
  const [name, setName] = useState('');
  const [vname, setvname] = useState(true);
  const [gender, setGender] = useState('Male');
  const [genderIndex, setGenderIndex] = useState(0);
  const [vgender, setvGender] = useState(false);
  const [parentName, setParentName] = useState('');
  const [vparentName, setvparentName] = useState(true);
  const [parentNumber, serParentNumber] = useState('');
  const [vparentNo, setvparentNo] = useState(false);
  const [loading, setLoading] = useState(false);
  const [myData, setmyData] = useState([]);
  const [email, setEmail] = useState('');
  const [vemail, setvemail] = useState(true);
  const [parentPhoneCountryCode, setparentPhoneCountryCode] = useState('IN');

  const phoneInput = useRef(null);
  const dispatch = useDispatch();
  const login_data = useSelector((state) => state.loginToken?.data);
  const registerData = useSelector((state) => state.hash.data);

  function useExitOnBack() {
    useFocusEffect(
      React.useCallback(() => {
        const handleBackPress = () => {
          // BackHandler.exitApp();
          closeApp();
          return true;
        };
        BackHandler.addEventListener('hardwareBackPress', handleBackPress);
        return () =>
          BackHandler.removeEventListener('hardwareBackPress', handleBackPress);
      }, []),
    );
  }

  const closeApp = () => {
    Alert.alert(
      'Alert',
      'Are you sure, you want to close this application',
      [
        {
          text: 'Yes',
          onPress: () => RNExitApp.exitApp(),
        },

        {
          text: 'No',
          onPress: () => console.log('No pressed'),
        },
      ],
      {cancelable: false},
    );
  };

  useEffect(() => {
    if (login_data?.data.role == 'parent') {
      getChild_handle();
    }
    // console.log({login_data});
  }, []);

  const getChild_handle = async () => {
    const api = API.GET_CHILD + login_data?.data.id;
    try {
      setLoading(true);
      const result = await getApi(api);
      console.log({resultchild: result.data});
      if (result.status == 200) {
        const data = result.data;
        setmyData(data.data);
        setLoading(false);
      } else {
        setLoading(false);
      }
    } catch (e) {
      console.log(e);
      setLoading(false);
      errorRes(e);
    }
  };

  const approved_Child = async (childId) => {
    const api = API.APPROVED_CHILD;
    const params = {
      userId: login_data?.data?.id,
      childId: childId,
    };
    try {
      setLoading(true);
      const result = await postApi(api, params);
      console.log({result: result.data});
      if (result.status == 200) {
        setTimeout(() => {
        Alert.alert(
          'Congrats',
          result.data.message,
          [
            {
              text: 'Ok',
              onPress: () => console.log('Yes Pressed'),
            },
          ],
          {cancelable: false},
        );
        },1000)
        getChild_handle();
      }
    } catch (e) {
      setLoading(false);
      errorRes(e);
    }
  };

  const onPress_validation = () => {
    const EmailValid = ValidateMail(email);
    console.log({EmailValid});

    if (login_data?.data?.role == 'user') {
      if (
        email.trim == '' ||
        name.trim() == '' ||
        parentName.trim() == '' ||
        parentNumber.trim() == '' ||
        gender.trim() == ''
      ) {
        name.trim() == '' ? setvname(false) : null;
        parentName.trim() == '' ? setvparentName(false) : null;
        email.trim == '' ? setvemail(true) : setvemail(false);
        parentNumber.trim() == '' ? setvparentNo(true) : setvparentNo(false);
        gender.trim == '' ? setvGender(true) : setvGender(true);
      } else {
        const checkValid = phoneInput.current?.isValidNumber(parentNumber);
        if (EmailValid) {
          if (checkValid) {
            profile_handle();
          } else {
            alert(
              'Your parent number is not valid, Please enter the valid number',
            );
          }
        } else {
          alert('Incorrect email');
        }
      }
    } else {
      if (name.trim() == '' || gender.trim() == '' || email.trim() == '') {
        name.trim() == '' ? setvname(false) : null;
        gender.trim == '' ? setvGender(true) : setvGender(true);
        email.trim == '' ? setvemail(true) : setvemail(false);
      } else {
        if (EmailValid) {
          profile_handle();
        }
      }
    }
  };

  const profile_handle = async () => {
    const api = API.CREATE_PROFILE + login_data?.data.id;
    const d = new Date(date);
    const dob =
      d.getFullYear().toString() +
      '-' +
      ((d.getMonth() + 1).toString().length == 2
        ? (d.getMonth() + 1).toString()
        : '0' + (d.getMonth() + 1).toString()) +
      '-' +
      (d.getDate().toString().length == 2
        ? d.getDate().toString()
        : '0' + d.getDate().toString());

    let param;
    if (login_data?.data?.role == 'user') {
      param = {
        name: name,
        parent_name: parentName,
        parent_number: parentNumber,
        gender: gender,
        dob: dob,
        parent_username: parentUserName,
        email: email,
        parentPhoneCountryCode:
          parentPhoneCountryCode == 'IN' ? '+91' : '+' + parentPhoneCountryCode,
      };
    } else {
      param = {
        name: name,
        gender: gender,
        dob: dob,
        email: email,
      };
    }

    try {
      setLoading(true);
      const result = await putApi(api, param);
      // console.log({result: result.data});
      if (result.status == 200) {
        const data = result.data;
        dispatch(setProfile(true));
        await AsyncStorage.setItem('profileCompleted', 'true');
        if (data) {
          const user = await cometChatLogin_handle(data.cometchatAuthtoken);
          navigation.navigate('Home');
          console.log('login with cometchat auth token', user);
          setLoading(false);
        }
      }
    } catch (e) {
      setLoading(false);
      console.log(e);
      errorRes(e);
    }
  };

  const authme_handle = async () => {
    const api = API.AUTH_ME;
    console.log({api});
    try {
      const result = await getApi(api);
      console.log('----------------profileauthme---------', result.data);
      if (result.data.success) {
        const data = result.data.data;
        dispatch(setAuthme(data));
      }
    } catch (e) {
      errorRes(e);
    }
  };

  const profile_pic_upload = async (imageResp) => {
    const api = API.UPLOAD_PROFILEPIC + login_data?.data.id;
    const params = new FormData();

    params.append('avatar', imageResp);
    console.log({imageResp});
    try {
      const result = await patchApi(api, params);
      console.log({result: result.data});
      if (result.status == 200) {
        setAttachments(imageResp);
        const data = result.data;
        const filePath = environment.IMG_URL + data.filePath;
        let uid = login_data?.data.id;
        cometChatProfilePic_handle(uid, filePath);
        Toast.show('Profile pic has been uploaded on server');
      } else {
        Toast.show('Profile pic not uploaded on server');
      }
    } catch (e) {
      console.log(e);
      errorRes(e);
    }
  };

  const parentUserName_handle = async (number) => {
    const api = API.PARENTUSERNAME + login_data?.data.id;
    const params = {
      parent_name: parentName?.replace(/\s/g, ''),
      parent_number: number,
    };
    if (parentNumber) {
      try {
        const result = await postApi(api, params);
        // console.log({result: result.data});
        if (result.status == 200) {
          setParentUserName(result?.data);
        }
      } catch (e) {
        console.log(e);
        errorRes(e);
      }
    }
  };

  const hideDatePicker = () => {
    setShow(false);
  };

  const handleConfirm = (date) => {
    console.warn('A date has been picked: ', date);
    hideDatePicker();
    setShow(false);
    setDate(date);
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  const setAttachmentResp = (res) => {
    const imageResp = getPickerImageResp(res);
    if (imageResp) {
      profile_pic_upload(imageResp);
    } else {
      console.log('simulator have not camera');
    }
  };

  const AttachmentWithImage = ImageUpload(
    ({handleImageUpload, ...props}) => (
      <View style={st.align_C}>
        {/* <TouchableOpacity
          style={[styles.pr_container]}
          onPress={() => handleImageUpload()}>
          <Image
            source={!attachments ? images.user : {uri: attachments.uri}}
            style={styles.profile_img}
            tintColor={!attachments ? colors.danger : ''}
          />
          <TouchableOpacity onPress={() => handleImageUpload()}>
            <LinearGradient
              style={styles.grdnt_btn}
              colors={['#00FFE5', '#0078FF']}
              start={{x: 1, y: 0}}
              end={{x: 0, y: 0.5}}>
              <Image source={images.camera} style={styles.cal_img} />
            </LinearGradient>
          </TouchableOpacity>
        </TouchableOpacity> */}
        <Avatar
          icon={{name: 'user', type: 'font-awesome', size: 90}}
          rounded
          size={120}
          overlayContainerStyle={{backgroundColor: '#ccc'}}
          source={!attachments ? images.user : {uri: attachments.uri}}>
          <Avatar.Accessory
            size={24}
            onPress={() => {
              console.log('click photo');
              handleImageUpload();
            }}
          />
        </Avatar>
        {/* <Text style={[st.tx18, st.color_B]}>Upload profile picture</Text> */}
      </View>
    ),
    setAttachmentResp,
    null,
  );

  useExitOnBack();

  return (
    <View style={st.flex}>
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <ScrollView keyboardShouldPersistTaps="always">
          <Header title={'Personal Details'} onPress={() => closeApp()} />
          <Image source={images.profilebg} style={styles.img} />

          <AttachmentWithImage />

          <View style={st.pd20}>
            <Animatable.View
              animation={effects.fadeIn}
              delay={100}
              style={st.mt15}>
              <Label title={'Full Name'} />
              <View>
                <Image source={images.profile_icon} style={styles.logo} />
                <InputBox
                  validation={vname}
                  placeholder="Name"
                  style={st.inputs}
                  value={name}
                  onChangeText={(name) => [setName(name), setvname(true)]}
                />
              </View>
            </Animatable.View>

            <Animatable.View
              animation={effects.fadeIn}
              delay={100}
              style={st.mt15}>
              <Label title={'Email'} />
              <View>
                <Image source={images.profile_icon} style={styles.logo} />
                <InputBox
                  validation={vemail}
                  placeholder="Email"
                  style={st.inputs}
                  value={email}
                  onChangeText={(text) => [setEmail(text), setvemail(true)]}
                />
              </View>
            </Animatable.View>

            <Animatable.View
              animation={effects.fadeIn}
              delay={150}
              style={st.mt15}>
              <Label title={'Gender'} />
              <View>
                <RadioForm formHorizontal={true} animation={true}>
                  {radio_props.map((obj, i) => {
                    var onPress = (value, index) => {
                      setGender(value);
                      setGenderIndex(index);
                    };
                    return (
                      <RadioButton labelHorizontal={true} key={i}>
                        <RadioButtonInput
                          obj={obj}
                          index={i}
                          isSelected={genderIndex === i}
                          onPress={onPress}
                          buttonInnerColor={colors.success}
                          buttonOuterColor={
                            genderIndex === i ? colors.success : '#000'
                          }
                          buttonSize={10}
                          buttonStyle={{}}
                          buttonWrapStyle={[st.mt15, {marginLeft: 10}]}
                        />
                        <RadioButtonLabel
                          obj={obj}
                          index={i}
                          onPress={onPress}
                          labelStyle={[styles.tx14, st.mt15]}
                          labelWrapStyle={{marginLeft: 10}}
                        />
                      </RadioButton>
                    );
                  })}
                </RadioForm>
              </View>
            </Animatable.View>

            <Animatable.View
              animation={effects.fadeIn}
              delay={200}
              style={st.mt15}>
              <Label title={'Date of birth'} />
              <View>
                <Image source={images.Dob} style={styles.logo} />
                <View style={styles.dropdown}>
                  <View style={[st.row, st.mt15]}>
                    <Text>
                      {'    '} {date.toLocaleDateString()}
                    </Text>
                    <TouchableOpacity
                      style={{position: 'absolute', right: 5}}
                      onPress={showDatepicker}>
                      <Image
                        source={images.calender}
                        style={styles.cal_img}
                        onPress={showDatepicker}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
                {show && (
                  <DateTimePickerModal
                    isVisible={show}
                    mode="date"
                    onConfirm={handleConfirm}
                    onCancel={hideDatePicker}
                  />
                )}
              </View>
            </Animatable.View>

            {login_data?.data.role == 'user' && (
              <Animatable.View
                animation={effects.fadeIn}
                delay={250}
                style={st.mt15}>
                <Label title={'Parents Name'} />
                <View>
                  <Image source={images.profile_icon} style={styles.logo} />
                  <InputBox
                    validation={vparentName}
                    placeholder="Name"
                    style={st.inputs}
                    value={parentName}
                    onChangeText={(text) => {
                      [setParentName(text), setvparentName(true)];
                    }}
                  />
                </View>
              </Animatable.View>
            )}

            {login_data?.data.role == 'user' && (
              <Animatable.View
                animation={effects.fadeIn}
                delay={300}
                style={st.mt15}>
                <Label title={'Parents Number'} />
                <View>
                  <PhoneInput
                    ref={phoneInput}
                    textInputStyle={[
                      !vparentNo ? styles.dropdown : styles.err_dropdown,
                      // {height: 70, paddingLeft: 10, width: '100%'},
                    ]}
                    textContainerStyle={{backgroundColor: 'transparent'}}
                    containerStyle={{backgroundColor: 'transparent'}}
                    value={parentNumber}
                    disabled={parentName ? false : true}
                    defaultCode={parentPhoneCountryCode}
                    layout="first"
                    onChangeText={(text) => {
                      serParentNumber(text);
                      setvparentNo(false);
                    }}
                    onChangeFormattedText={(text) => {
                      //
                      const checkValid =
                        phoneInput.current?.isValidNumber(text);
                      console.log({checkValid});
                      if (checkValid) {
                        parentUserName_handle(text);
                      } else {
                        setParentUserName('');
                      }
                    }}
                    onChangeCountry={(text) => {
                      console.log('code', text.callingCode);
                      setparentPhoneCountryCode(text?.callingCode?.toString());
                    }}
                    textInputProps={{
                      onSubmitEditing: () => {
                        parentUserName_handle(parentNumber);
                      },
                    }}
                  />
                </View>
                <Text style={st.tx10}>{"Note: Parent name is compulsory"}</Text>
              </Animatable.View>
            )}

            <Animatable.View
              animation={effects.fadeIn}
              delay={350}
              style={st.mt15}>
              <Label title={'Parents Username'} />
              <View>
                <InputBox
                  placeholder="Name"
                  style={st.inputs}
                  value={
                    // parentUserName ? parentUserName : myData[0]?.parent_username
                    parentUserName
                      ? parentUserName
                      : myData?.length > 0
                      ? myData[0]?.parent_username
                      : ''
                  }
                  onChangeText={(text) => setParentUserName(text)}
                  disabled={true}
                />
              </View>
            </Animatable.View>
          </View>

          <View style={st.pd20}>
            {login_data?.data?.role == 'parent' && myData?.length > 0
              ? myData?.map((i) => {
                  return (
                    <View style={st.mb10}>
                      <View style={st.ItemSeparatorView} />
                      <Text style={[st.tx14, st.mt15]}>
                        {i.name} {'added you in his contact as a parent'}
                      </Text>
                      <View style={[st.row, st.mt15]}>
                        <View style={[st.wdh20]}>
                          <Image
                            source={
                              i?.user_image_path
                                ? {
                                    uri:
                                      environment.IMG_URL + i?.user_image_path,
                                  }
                                : images.avtar
                            }
                            style={styles.profileparent}
                            tintColor={i?.user_image_path ? '' : colors.light}
                          />
                        </View>
                        <View style={[st.wdh50, st.justify_C]}>
                          <Text style={[st.tx16, st.color_S]} numberOfLines={1}>
                            {i.name}
                          </Text>
                          <Text style={st.tx14}>
                            {i.phoneCountryCode} {i.phone}
                          </Text>
                          {/* <Text style={st.tx14}>{'Available'}</Text> */}
                        </View>

                        {!i.isParentVerified && (
                          <View style={[st.wdh30, st.justify_C]}>
                            <TouchableOpacity
                              style={styles.cnfmbtn}
                              onPress={() => approved_Child(i._id)}>
                              <Text style={[st.tx14, st.color_L]}>Confirm</Text>
                            </TouchableOpacity>
                          </View>
                        )}
                      </View>
                    </View>
                  );
                })
              : null}

            <SimpleButton
              title={'Continue'}
              onPress={() => {
                if (login_data?.data.role == 'user') {
                  if (registerData.user.phone.trim() === parentNumber.trim()) {
                    alert(
                      "Your parent's number and your number are the same, please try another number for the parent",
                    );
                  } else {
                    onPress_validation();
                  }
                } else {
                  onPress_validation();
                }
              }}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
      {loading && <Loader />}
    </View>
  );
};

export default Profile;

const radio_props = [
  {label: 'Male', value: 'Male'},
  {label: 'Female', value: 'Female'},
];

const styles = StyleSheet.create({
  img: {
    width: '100%',
    position: 'absolute',
    top: 0,
  },
  profileparent: {
    width: 65,
    height: 65,
    borderRadius: 65 / 2,
    backgroundColor: '#ccc',
  },
  profile_img: {
    width: 100,
    height: 100,
    borderRadius: 100 / 2,
    justifyContent: 'center',
    // marginTop:20
  },
  pr_container: {
    backgroundColor: '#ddd',
    borderRadius: 110 / 2,
    width: 108,
    height: 108,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 18,
    height: 18,
    position: 'absolute',
    top: 26,
    left: 20,
  },
  dropdown: {
    marginTop: 10,
    borderColor: colors.danger,
    borderWidth: 0.7,
    borderRadius: 50,
    paddingRight: 15,
    paddingLeft: 35,
    backgroundColor: 'transparent',
    height: 50,
    width: '100%',
  },
  err_dropdown: {
    marginTop: 10,
    borderColor: 'red',
    borderWidth: 0.7,
    borderRadius: 50,
    paddingRight: 15,
    paddingLeft: 35,
    backgroundColor: 'transparent',
    height: 50,
  },
  cal_img: {
    width: 20,
    height: 20,
  },
  grdnt_btn: {
    width: 30,
    height: 30,
    borderRadius: 30 / 2,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: -30,
    left: 20,
  },
  cnfmbtn: {
    justifyContent: 'center',
    backgroundColor: colors.success,
    paddingHorizontal: 10,
    borderRadius: 50,
    alignItems: 'center',
    paddingVertical: 5,
  },
});
