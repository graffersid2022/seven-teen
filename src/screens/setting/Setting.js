import {
  View,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  FlatList,
  Alert,
} from 'react-native';
import React, {useState} from 'react';
import Header from '../../components/Header';
import {colors, images} from '../../constant/Theme';
import st from '../../constant/styles';
import {getUser} from '../../redux/reducers/GetUser';
import {useSelector, useDispatch} from 'react-redux';
import {useEffect} from 'react';
import {API} from '../../utils/endpoints/EndPoints';
import {postApi, logOutApi} from '../../utils/apicalls/ApiCalls';
import {
  errorRes,
  cometChatLogOut_handle,
} from '../../utils/helper/helperFunctions';
import {clearToken} from '../../redux/reducers/loginToken';
import {environment} from '../../utils/Constant';
import {clearAuth} from '../../redux/reducers/authme';
import {clearProfile} from '../../redux/reducers/profileComplete';
import {Avatar, Accessory} from 'react-native-elements';

const Setting = ({navigation}) => {
  const [arraydata, setData] = useState(array_data);
  const item = 'https://www.w3schools.com/howto/img_avatar2.png';

  const login_data = useSelector((state) => state.loginToken?.data);
  const {userdata, loading} = useSelector((state) => state.getUser);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUser(login_data?.data.id));
    const focusHandler = navigation.addListener('focus', () => {
      dispatch(getUser(login_data?.data.id));
    });
    return focusHandler;
  }, [navigation]);

  const onPress = (item) => {
    if (item.screenName != 'Logout') {
      navigation.navigate(item.screenName);
    } else {
      Alert.alert(
        'Alert',
        'Are you sure, you want to Logout?',
        [
          {
            text: 'Yes',
            onPress: () => logOut_handle(),
          },
          {
            text: 'No',
            onPress: () => console.log('No Pressed'),
            style: 'cancel',
          },
        ],
        {cancelable: false},
        //clicking out side of alert will not cancel
      );
    }
  };

  const logOut_handle = async () => {
    const api = API.LOG_OUT;
    const params = {
      refreshToken: login_data?.tokens?.refresh?.token,
    };
    try {
      const result = await postApi(api, params);
      console.log({result: result.data});
      if (result.data.success) {
        logOutApi();
        cometChatLogOut_handle();
        dispatch(clearToken());
        dispatch(clearAuth());
        dispatch(clearProfile());
      }
    } catch (e) {
      console.log(e);
      errorRes(e);
    }
  };

  renderItem = ({item, index}) => {
    return (
      <View style={[st.row, st.pd_V10, st.align_C, st.mr_H20]}>
        <View style={styles.wdh20}>
          <Image source={item.img} />
        </View>
        <TouchableOpacity style={styles.wdh60} onPress={() => onPress(item)}>
          <Text style={[st.tx16, st.color_S]}>{item.name}</Text>
        </TouchableOpacity>
        {item.screenName != 'Logout' && (
          <View style={[styles.wdh20, st.align_E]}>
            <TouchableOpacity onPress={() => onPress(item)}>
              <Image source={images.arrow_right} />
            </TouchableOpacity>
          </View>
        )}
      </View>
    );
  };

  ItemSeparatorComponent = ({}) => {
    return <View style={st.ItemSeparatorView} />;
  };

  return (
    <View style={st.flex}>
      <Header
        title={'Settings'}
        tintColor={colors.light}
        color={colors.light}
        backgroundColor={colors.success}
        onPress={() => navigation.goBack()}
      />
      <View style={[st.pd20, st.flex]}>
        <View style={st.row}>
          <View style={[styles.wdh80, st.row, st.align_C]}>
            {userdata?.user_image_path ? (
              // <Image
              //   source={{uri: environment.IMG_URL+userdata?.user_image_path}}
              //   style={styles.profileImg}
              // />
              <Avatar
                icon={{name: 'user', type: 'font-awesome', size: 90}}
                rounded
                size={90}
                source={{uri: environment.IMG_URL + userdata?.user_image_path}}
              />
            ) : (
              <View style={styles.profileImgbg}>
                <Image
                  source={images.avtar}
                  style={styles.profileImg}
                  tintColor={'#fff'}
                />
              </View>
            )}
            <View style={st.mr_H20}>
              <Text style={[st.tx16, st.color_S, st.tx_m]}>
                {userdata?.name}
              </Text>

              <Text style={st.tx12}>
                {userdata.phoneCountryCode} {userdata?.phone}
              </Text>
              <Text style={st.tx12}>{'Available'}</Text>
            </View>
          </View>
          <View style={[styles.wdh20, st.justify_C]}>
            <TouchableOpacity
              style={st.align_E}
              onPress={() => navigation.navigate('Profile_st')}>
              <Image source={images.edit_alt} />
            </TouchableOpacity>
          </View>
        </View>

        <View style={[st.mt15]} />
        <View style={[st.ItemSeparatorView]} />

        <FlatList
          data={
            login_data?.data?.role == 'user' ? arraydata : array_data_parent
          }
          renderItem={renderItem}
          ItemSeparatorComponent={ItemSeparatorComponent}
        />
      </View>
    </View>
  );
};

export default Setting;

const styles = StyleSheet.create({
  profileImg: {
    width: 80,
    height: 80,
    borderRadius: 80 / 2,
  },
  profileImgbg: {
    width: 90,
    height: 90,
    borderRadius: 90 / 2,
    backgroundColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
  },
  wdh80: {
    width: '80%',
  },
  wdh20: {
    width: '20%',
  },
  wdh60: {
    width: '60%',
  },
});

const array_data = [
  // {id: 1, name: 'Account', img: images.account, screenName: 'Account_st'},
  // {id: 2, name: 'Chat', img: images.chat, screenName: 'Chat_st'},
  // {
  //   id: 3,
  //   name: 'Notification',
  //   img: images.notifications,
  //   screenName: 'Notification_st',
  // },
  // {id: 4, name: 'Security', img: images.security, screenName: 'Security_st'},
  {id: 5, name: 'Help', img: images.help, screenName: 'Help_st'},
  {id: 6, name: 'Logout', img: images.logout, screenName: 'Logout'},
];

const array_data_parent = [
  // {id: 1, name: 'Account', img: images.account, screenName: 'Account_st'},
  // {id: 2, name: 'Chat', img: images.chat, screenName: 'Chat_st'},
  {id: 3, name: 'My Children`s', img: images.account, screenName: 'Child'},
  // {
  //   id: 4,
  //   name: 'Notification',
  //   img: images.notifications,
  //   screenName: 'Notification_st',
  // },
  // {id: 5, name: 'Security', img: images.security, screenName: 'Security_st'},
  {id: 6, name: 'Help', img: images.help, screenName: 'Help_st'},
  {id: 7, name: 'Logout', img: images.logout, screenName: 'Logout'},
];
