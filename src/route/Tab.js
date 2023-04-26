import React, {useEffect} from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import Chats from '../screens/chats/Chats';
import Calls from '../screens/calls/Calls';
import Status from '../screens/status/Status';
import {MyTabBar} from './MyTabBar';
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
import {useSelector, useDispatch} from 'react-redux';

const Tab = createMaterialTopTabNavigator();

function HomeStack() {
  return (
    <Tab.Navigator
      swipeEnabled={false}
      tabBar={props => <MyTabBar {...props} />}
      backBehaviour="initialRoute">    
      <Tab.Screen component={CometChatConversationListWithMessages} name="Chats" />   
      <Tab.Screen name="Groups" component={CometChatGroupListWithMessages} />
      <Tab.Screen name="Calls" component={Calls} />
    </Tab.Navigator>
  );
}

const Tabs = () => {
  return <HomeStack />;
};

export default Tabs;
