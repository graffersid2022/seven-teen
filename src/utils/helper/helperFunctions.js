import {CometChat} from '@cometchat-pro/react-native-chat';
import data from 'emoji-mart-native/dist/utils/data';
import {grpAddLeftNotify_handle} from '../notification/notificationApi';
import { Alert, AlertIOS,Platform } from 'react-native';
export const getPickerImageResp = (res) => {
  const respArr = res?.assets;
  const imgResp = respArr?.length ? respArr[0] : null;

  if (imgResp) {
    return {
      name: imgResp.fileName,
      type: imgResp.type,
      uri: imgResp.uri,
    };
  }

  return false;
};

export const cometChatLogin_handle = async(authToken) => {
  CometChat.getLoggedinUser().then(
    (user) => {
      if (!user) {
        CometChat.login(authToken).then(
          (res) => {
            console.log('cometChat Login Successful:', res);
            return res;
          },
          (error) => {
            console.log('cometChat Login failed with exception:', {error});
            return false;
          },
        );
      }
    },
    (error) => {
      console.log('Something went wrong', error);
    },
  );
};

export const cometChatProfilePic_handle = (uid, pic) => {
  var user = new CometChat.User(uid);
  let avatar = pic;
  console.log({uid, pic});
  user.setAvatar(avatar);

  CometChat.updateCurrentUserDetails(user).then(
    (user) => {
      console.log('user profile updated');
    },
    (error) => {
      console.log('user profile error', error);
    },
  );
};

export const cometChatUserUpdate_handle = (uid, name) => {
  var user = new CometChat.User(uid);
  let setname = name;
  console.log({uid, setname});
  user.setName(setname);

  CometChat.updateCurrentUserDetails(user).then(
    (user) => {
      console.log('user profile updated');
    },
    (error) => {
      console.log('user profile error', error);
    },
  );
};

export const cometChatGroupDetail_handle = (guid, memberList) => {
  CometChat.getGroup(guid).then(
    (group) => {
      console.log('Group details fetched successfully:', group);
      const gname = group.name
      const muid = []
      for(let i=0; memberList.length>i; i++){
            const uid = memberList[i].uid
            muid.push(uid)
      }
      console.log({muid})
      grpAddLeftNotify_handle(gname,muid,[])
    },
    (error) => {
      console.log('Group details fetching failed with exception:', error);
    },
  );
};

export const cometChatLogOut_handle = () => {
  CometChat.logout().then(
    () => {
      console.log('Logout completed successfully');
    },
    (error) => {
      console.log('Logout failed with exception:', {error});
    },
  );
};

export const errorRes = (response) => {
  const {status, data} = response;
  console.log({errordata: data});

  if (status === 400) {
    // const d = alert(data.message);
    const d =  setTimeout(() => {
      Alert.alert(
        'Error',
        data.message,
        [{text: 'OK', onPress: () => console.log('ok')}],
        {cancelable: false},
      );
    }, 100);
    return d;
  }

  if (status === 404) {
    throw `NOT FOUND`;
  }

  if (status === 403) {
    throw `FORBIDDEN`;
  }

  if (status === 500) {
    console.log('Server Error');
    const d = setTimeout(() => {alert(data.message);}, 100);
    throw d;
  }

  if (status === 204) {
    throw `NO CONTENT`;
  }

  if (status === 401) {
    // const d = alert(data.message);
    const d =  setTimeout(() => {
      Alert.alert(
        'Error',
        data.message,
        [{text: 'OK', onPress: () => console.log('ok')}],
        {cancelable: false},
      );
    }, 100);
    return d;
  }

  if (status === 0) {
    console.log('Network Error');
    const d = setTimeout(() => {
             alert('Network Error');
    },100)
    throw d;
  }
};

// 201- created
// 200- success
// 204 - no content
// 400- bad request
// 401- unauthorise
// 404- not found
// 500- internal server error

// export {getPickerImageResp};
