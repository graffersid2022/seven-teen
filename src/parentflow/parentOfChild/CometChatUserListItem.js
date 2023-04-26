import React from 'react';
import { useState, useEffect } from 'react';
import { Text, View, TouchableHighlight, TouchableOpacity, StyleSheet } from 'react-native';
import { CometChatUserPresence, CometChatAvatar } from '../../cometchat-pro-react-native-ui-kit/CometChatWorkspace/src/components/Shared';
import style from '../../cometchat-pro-react-native-ui-kit/CometChatWorkspace/src/components/Users/CometChatUserListItem/styles';
import theme from '../../cometchat-pro-react-native-ui-kit/CometChatWorkspace/src/resources/theme';
import { images, colors } from '../../constant/Theme';
import st from '../../constant/styles';

const CometChatUserListItem = (props) => {
  const viewTheme = { ...theme, ...props.theme };

  useEffect(()=>{
    // console.log({props:props.user})
  },[])
    
  return (
    // <TouchableHighlight
    //   key={props.user.uid}
    //   onPress={() => props.clickHandler(props.user)}
    //   underlayColor={viewTheme.backgroundColor.listUnderlayColor}>
      <View style={style.listItem}>
        <View style={[style.avatarStyle, { borderRadius: 22 }]}>
          <CometChatAvatar
            image={{ uri: props.user.avatar }}
            cornerRadius={22}
            borderColor={viewTheme.color.secondary}
            borderWidth={0}
            name={props.user.name}
          />
          <CometChatUserPresence
            status={props.user.status}
            cornerRadius={18}
            style={{ top: 30 }}
            borderColor={viewTheme.color.white}
            borderWidth={2}
          />
        </View>
        <View style={[styles.userNameStyle]}>
          <Text numberOfLines={1} style={[st.tx14,st.color_B,st.txCap]}>
            {props.user.name}
          </Text>
          <Text numberOfLines={1} style={st.tx12}>
           {props.user.phoneCountryCode} {props.user.phone}
          </Text>
         
        </View>
        <TouchableOpacity 
              style={[styles.cnfmbtn]}
              onPress={() => props.clickHandler(props.user)}>
              <Text style={[st.tx14, st.color_L]}>Start Chat</Text>
            </TouchableOpacity>
       
      </View>
    // </TouchableHighlight>
  );
};

export default CometChatUserListItem;
const styles = StyleSheet.create({
  cnfmbtn: {
    justifyContent: 'center',
    backgroundColor: colors.success,
    paddingHorizontal: 10,
    borderRadius: 50,
    alignItems: 'center',
    paddingVertical: 5,
  },
  userNameStyle:{
    width:'60%'
  }
});