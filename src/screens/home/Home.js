import {
  View,
  BackHandler,
  Alert,
  Platform,
  PermissionsAndroid,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Tabs from '../../route/Tab';
import CustomHeader from '../../components/CustomHeader';
import st from '../../constant/styles';
import {useFocusEffect} from '@react-navigation/native';
import {cometChatProfilePic_handle} from '../../utils/helper/helperFunctions';
import {useSelector, useDispatch} from 'react-redux';
import {environment} from '../../utils/Constant';
import {getUser} from '../../redux/reducers/GetUser';
import {
  requestUserPermission,
  notificationListner,
} from '../../utils/notification/Notification_service';
import {setContacts} from '../../redux/reducers/Contacts';
import RNExitApp from 'react-native-exit-app';
import {useIsFocused} from '@react-navigation/native';
import {getContact} from '../../utils/helper/Contact';

const Home = ({navigation}) => {
  // const [phoneContactList, setPhoneContactList] = useState([]);
  const login_data = useSelector((state) => state.loginToken?.data);
  const {userdata, loading} = useSelector((state) => state.getUser);
  const dispatch = useDispatch();
  const isFocused = useIsFocused();

  useEffect(() => {
    requestUserPermission();
    notificationListner();
    getContactList();
    dispatch(getUser(login_data?.data?.id));
    if (userdata) {
      uploadPic();
    }
  }, [isFocused]);

  const getContactList = async () => {
    const list = await getContact();
    console.log({listlength: list?.length});
    dispatch(setContacts(list));
  };

  const uploadPic = () => {
    if (userdata?.user_image_path) {
      const filePath = environment.IMG_URL + userdata?.user_image_path;
      let uid = login_data?.data?.id;
      cometChatProfilePic_handle(uid, filePath);
    }
  };

  function useExitOnBack() {
    useFocusEffect(
      React.useCallback(() => {
        const handleBackPress = () => {
          // BackHandler.exitApp();
          RNExitApp.exitApp();
          return true;
        };
        BackHandler.addEventListener('hardwareBackPress', handleBackPress);
        return () =>
          BackHandler.removeEventListener('hardwareBackPress', handleBackPress);
      }, []),
    );
  }

  useExitOnBack();
  return (
    <View style={st.flex}>
      <View style={{backgroundColor: 'red', height: 90}}>
        <CustomHeader
          gotoSetting={() => navigation.navigate('Setting')}
          gotoGroup={() => navigation.navigate('Group')}
          gotoSearch={() => navigation.navigate('Search')}
          contactRefresh={() => getContactList()}
        />
      </View>
      <Tabs />
    </View>
  );
};

export default Home;
