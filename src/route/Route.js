import React, { useState } from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Splash from '../screens/onboarding/splash/Splash';
import Login from '../screens/onboarding/login/Login';
// import Signup from '../screens/onboarding/signup/Signup';
import Verify from '../screens/onboarding/verify/Verify';
import Intro from '../screens/onboarding/intro/Intro';
import Home from '../screens/home/Home';
import Profile from '../screens/createProfile/Profile';
import Messages from '../screens/messages/Messages';
import Setting from '../screens/setting/Setting';
import Account_st from '../screens/setting/account/Account';
import Profile_st from '../screens/setting/profile/Profile';
import Chat_st from '../screens/setting/chat/Chat';
import Notification_st from '../screens/setting/notification/Notification';
import Security_st from '../screens/setting/security/Security';
import Help_st from '../screens/setting/help/Help';
import ChangeNumber from '../screens/setting/account/changenumber/ChangeNumber';
import FAQs from '../screens/setting/help/FAQs';
import Terms from '../screens/setting/help/Terms';
import Policy from '../screens/setting/help/Policy';
import Info from '../screens/setting/help/Info';
import Group from '../screens/group/Group';
import GroupName from '../screens/group/GroupName';
import Search from '../screens/search/Search';
import ViewProfile from '../screens/chats/viewProfile/ViewProfile';
import GroupViewProfile from '../screens/chats/viewProfile/GroupViewProfile';
import {useDispatch, useSelector} from 'react-redux';
import {useEffect} from 'react';
import SignUp from '../screens/onboarding/signup/Signup';
import Camera from '../screens/cameraImg/Camera';
import Contacts from '../screens/contacts/Contacts';
import {
  CometChatUI,
  CometChatMessages,
  CometChatUserListWithMessages,
  CometChatUserList,
  CometChatGroupListWithMessages,
  CometChatGroupList,
  CometChatConversationListWithMessages,
  CometChatConversationList,
} from '../cometchat-pro-react-native-ui-kit/CometChatWorkspace/src/index';
import Child from '../parentflow/mychild/Child';
import ChildContacts from '../parentflow/childContact/ChildContacts';
import ParentOfChild from '../parentflow/parentOfChild/ParentOfChild';
import CallDetails from '../screens/calls/CallDetails';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Stack = createStackNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator initialRouteName="Splash">
      <Stack.Screen
        name="Splash"
        component={Splash}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Intro"
        component={Intro}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Login"
        component={Login}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="SignUp"
        component={SignUp}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Verify"
        component={Verify}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

function HomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Splash"
        component={Splash}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Home"
        component={Home}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Profile"
        component={Profile}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Messages"
        component={Messages}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Setting"
        component={Setting}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Account_st"
        component={Account_st}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Profile_st"
        component={Profile_st}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Chat_st"
        component={Chat_st}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Security_st"
        component={Security_st}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Notification_st"
        component={Notification_st}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Help_st"
        component={Help_st}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ChangeNumber"
        component={ChangeNumber}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="FAQs"
        component={FAQs}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Terms"
        component={Terms}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Policy"
        component={Policy}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Info"
        component={Info}
        options={{headerShown: false}}
      />
      {/* <Stack.Screen
        name="Group"
        component={Group}
        options={{headerShown: false}}
      /> */}
      <Stack.Screen
        name="GroupName"
        component={GroupName}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Search"
        component={Search}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ViewProfile"
        component={ViewProfile}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="GroupViewProfile"
        component={GroupViewProfile}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Camera"
        component={Camera}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Contacts"
        component={Contacts}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Child"
        component={Child}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ChildContacts"
        component={ChildContacts}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ParentOfChild"
        component={ParentOfChild}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="CallDetails"
        component={CallDetails}
        options={{headerShown: false}}
      />
      {/*  */}

      {/* Comet Chat UIs */}
      <Stack.Screen
        name="Conversation"
        component={CometChatConversationListWithMessages}
      />
      <Stack.Screen
        name="ConversationComponent"
        component={CometChatConversationList}
      />
      <Stack.Screen name="Group" component={CometChatGroupListWithMessages} />
      <Stack.Screen name="GroupComponent" component={CometChatGroupList} />

      <Stack.Screen name="UsersComponent" component={CometChatUserList} />
      <Stack.Screen
        name="CometChatMessages"
        component={CometChatMessages}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Users"
        component={CometChatUserListWithMessages}
        options={{headerBackTitle: ''}}
      />
    </Stack.Navigator>
  );
}

const Route = () => {
  const token = useSelector((state) => state.loginToken.data);
  const [data,setData] = useState(null)
  useEffect(()=>{
    getToken();
  },[])

  const getToken = async() => {
    const token = await  AsyncStorage.getItem('token');
    setData(token)
  }
  return (
    <NavigationContainer>
      {token ? <HomeStack /> : <AuthStack />}
    </NavigationContainer>
  );
};

export default Route;
