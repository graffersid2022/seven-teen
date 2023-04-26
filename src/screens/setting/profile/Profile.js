import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,Alert
} from 'react-native';
import React, {useState, useEffect} from 'react';
import Header from '../../../components/Header';
import st from '../../../constant/styles';
import ImageUpload from '../../../HOCs/ActionModal';
import {getPickerImageResp} from '../../../utils/helper/helperFunctions';
import {colors, images} from '../../../constant/Theme';
import LinearGradient from 'react-native-linear-gradient';
import InputBox from '../../../components/InputBox';
import Label from '../../../components/Label';
import SimpleButton from '../../../components/SimpleButton';
import {useSelector, useDispatch} from 'react-redux';
import Toast from 'react-native-simple-toast';
import {API} from '../../../utils/endpoints/EndPoints';
import {
  errorRes,
  cometChatProfilePic_handle,
  cometChatUserUpdate_handle,
} from '../../../utils/helper/helperFunctions';
import {postApi, patchApi} from '../../../utils/apicalls/ApiCalls';
import {environment} from '../../../utils/Constant';
import {getUser} from '../../../redux/reducers/GetUser';
import Loader from '../../../components/Loader';
import {Avatar, Accessory} from 'react-native-elements';

const Profile = ({navigation}) => {
  const [attachments, setAttachments] = useState(null);
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const [about, setAbout] = useState('');
  const [loader, setLoading] = useState(false);
  const {userdata, loading} = useSelector((state) => state.getUser);
  const dispatch = useDispatch();
  const login_data = useSelector((state) => state.loginToken?.data);

  useEffect(() => {
    setName(userdata.name);
    setNumber(userdata.phone);
  }, []);

  const editProfile_handle = async () => {
    const api = API.EDIT_USER + login_data?.data?.id;
    const params = {
      name: name,
    };
    try {
      setLoading(true);
      const result = await postApi(api, params);
      console.log({result: result.data});
      if (result.data.success) {
        setLoading(false);
        cometChatUserUpdate_handle(login_data?.data?.id, name);
        dispatch(getUser(login_data?.data?.id));
        setTimeout(() => {
          // alert('Congratulations',result.data.message);
          Alert.alert(
            'Congratulations',
            result.data.message,
            [{text: 'OK', onPress: () => console.log('ok')}],
            {cancelable: false},
          );
        
        },100)
        Toast.show(result.data.message);
      } else {
        setLoading(false);
      }
    } catch (e) {
      console.log(e);
      setLoading(false);
      errorRes(e);
    }
  };

  const profile_pic_upload = async (imageResp) => {
    const api = API.UPLOAD_PROFILEPIC + login_data?.data.id;
    const formdata = new FormData();
    if (imageResp) formdata.append('avatar', imageResp);
    try {
      const result = await patchApi(api, formdata);
      console.log({result: result.data.data});
      if (result.status == 200) {
        setAttachments(imageResp);
        const data = result.data;
        const filePath = environment.IMG_URL + data.filePath;
        dispatch(getUser(login_data?.data.id));
        cometChatProfilePic_handle(login_data?.data.id, filePath);
        Toast.show('Profile pic has been uploaded on server');
      } else {
        Toast.show('Profile pic not uploaded on server');
      }
    } catch (e) {
      Toast.show('Server error');
      console.log('-----------------e', e);
      errorRes(e);
    }
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
      <View style={[st.align_C, st.mt15]}>
        <Avatar
          icon={{name: 'user', type: 'font-awesome', size: 90}}
          rounded
          size={120}
          source={
            userdata.user_image_path
              ? {uri: environment.IMG_URL + userdata.user_image_path}
              : !attachments
              ? images.avtar
              : {uri: attachments.uri}
          }>
          <Avatar.Accessory
            size={24}
            onPress={() => {
              console.log('click photo');
              handleImageUpload();
            }}
          />
        </Avatar>
      </View>
    ),
    setAttachmentResp,
    null,
  );

  return (
    <View style={st.flex}>
      <Header
        title={'Profile'}
        tintColor={colors.light}
        color={colors.light}
        backgroundColor={colors.success}
        onPress={() => navigation.goBack()}
      />
      <ScrollView style={st.flex} keyboardShouldPersistTaps={'always'}>
        <AttachmentWithImage />

        <View style={st.pd20}>
          <View style={[st.ItemSeparatorView]} />

          <View style={st.mt15}>
            <Label title={'     Name'} />
            <View>
              <Image source={images.profile_icon} style={styles.inputIcon} />
            </View>
            <InputBox
              placeholder={'Enter Name'}
              value={name}
              onChangeText={(text) => setName(text)}
            />
          </View>

          {/* <View style={st.mt15}>
            <Label title={'     About'} />
            <InputBox
              placeholder={'Enter About'}
              value={about}
              onChangeText={text => setAbout(text)}
            />
          </View> */}

          <View style={st.mt15}>
            <Label title={'     Contact Number'} />
            <View>
              <Image source={images.call} style={styles.inputIcon} />
            </View>
            <InputBox
              placeholder={'Enter Number'}
              value={number}
              onChangeText={(text) => setNumber(text)}
              disabled={true}
            />
            <Text style={[st.tx10, st.color_S]}>You can't edit the number</Text>
          </View>
        </View>
      </ScrollView>
      <View style={st.pd20}>
        <SimpleButton
          title={'Save Changes'}
          onPress={() => editProfile_handle()}
        />
      </View>
      {loader && <Loader />}
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  profile_img: {
    width: 120,
    height: 120,
    borderRadius: 120 / 2,
    justifyContent: 'center',
    backgroundColor: '#fff',
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
    // position: 'absolute',
    // top: -30,
    // left: 30,
    marginLeft: 55,
    marginTop: -20,
  },
  inputIcon: {
    width: 20,
    height: 20,
    position: 'absolute',
    left: 25,
    top: 24,
  },
});
