import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {colors, images} from '../constant/Theme';
import st from '../constant/styles';
import CardImg from '../components/CardImg';
import {Menu, MenuItem, MenuDivider} from 'react-native-material-menu';
import { useSelector } from 'react-redux';

const ChatHeader = ({username, bio, picture, onlineStatus, onPress, type, id}) => {
  const [visible, setVisible] = useState(false);

  const Header_data = useSelector(state => state.HeaderId?.data);

  const hideMenu = () => {
    setVisible(false);
  };

  useEffect(()=>{
  //  console.log({Header_data})
  },[])

  const showMenu = () => setVisible(true);

  const navigation = useNavigation();
  return (
    <View style={[st.row, st.pd20, st.bg_S]}>
      <TouchableOpacity
        style={[styles.backButton, st.pd_T10]}
        onPress={onPress}>
        <Image
          source={images.left}
          style={styles.leftsty}
          tintColor={colors.light}
        />
      </TouchableOpacity>

      {!Header_data ? (
        <View style={[styles.profileOptions, st.pd_T10]}>
          <TouchableOpacity
            style={styles.profile}
            onPress={() => {
              if(type=='personal')
              navigation.navigate('ViewProfile',{id:id})
              else 
              navigation.navigate('GroupViewProfile',{id:id})
              }}>
            <CardImg src={picture} type={type} />
            {type=='personal'? 
             <View style={styles.usernameAndOnlineStatus}>
              <Text style={[st.tx16, st.color_L]}>{username}</Text>
             <Text style={[st.tx12, st.color_L]}>{onlineStatus}</Text>
            </View>
            : 
            <View style={styles.usernameAndOnlineStatus}>
              <Text style={[st.tx16, st.color_L]}>{username}</Text>
            </View>
            }
          </TouchableOpacity>
          <View style={styles.options}>
            <TouchableOpacity style={{paddingHorizontal: 5}}>
              <Image source={images.outlinePhone} tintColor={colors.light} />
            </TouchableOpacity>
            <TouchableOpacity style={st.pd_H20}>
              <Image source={images.outlineVdo} tintColor={colors.light} />
            </TouchableOpacity>
            <TouchableOpacity>
              <Menu
                style={{borderRadius: 20, padding: 5}}
                visible={visible}
                anchor={
                  <TouchableOpacity onPress={showMenu}>
                    <Image source={images.menu} tintColor={colors.light} />
                  </TouchableOpacity>
                }
                onRequestClose={hideMenu}>
                <MenuItem
                  onPress={() => {
                    hideMenu();
                    navigation.navigate('Group');
                  }}
                  textStyle={[st.tx16, st.color_S]}>
                  New Group
                </MenuItem>
                <MenuItem
                  onPress={() => {
                    hideMenu();
                    navigation.navigate('Setting');
                  }}
                  textStyle={[st.tx16, st.color_S]}>
                  Settings
                </MenuItem>
              </Menu>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <View style={[styles.profileOptions, st.pd_T10]}>
          <TouchableOpacity style={styles.profile}>
            <View style={styles.usernameAndOnlineStatus}>
              <Text style={[st.tx16, st.color_L]}>{'1'}</Text>
            </View>
          </TouchableOpacity>
          <View style={styles.options}>
            <TouchableOpacity style={{paddingRight: 15}}>
              <Image source={images.back_share} tintColor={colors.light} />
            </TouchableOpacity>
			<TouchableOpacity style={{paddingHorizontal: 5}}>
              <Image source={images.star} tintColor={colors.light} />
            </TouchableOpacity>
            <TouchableOpacity style={st.pd_H20}>
              <Image source={images.copy} tintColor={colors.light} />
            </TouchableOpacity>
			<TouchableOpacity style={{paddingHorizontal: 5}}>
              <Image source={images.delete} tintColor={colors.light} />
            </TouchableOpacity>
			<TouchableOpacity style={{paddingHorizontal: 15}}>
              <Image source={images.forward_share} tintColor={colors.light} />
            </TouchableOpacity>
            <TouchableOpacity>
              <Menu
                style={{borderRadius: 20, padding: 5}}
                visible={visible}
                anchor={
                  <TouchableOpacity onPress={showMenu}>
                    <Image source={images.menu} tintColor={colors.light} />
                  </TouchableOpacity>
                }
                onRequestClose={hideMenu}>
                <MenuItem
                  onPress={() => {
                    hideMenu();
                    navigation.navigate('Group');
                  }}
                  textStyle={[st.tx16, st.color_S]}>
                  New Group
                </MenuItem>
                <MenuItem
                  onPress={() => {
                    hideMenu();
                    navigation.navigate('Setting');
                  }}
                  textStyle={[st.tx16, st.color_S]}>
                  Settings
                </MenuItem>
              </Menu>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  backButton: {
    alignSelf: 'center',
  },
  leftsty: {
    width: 20,
    height: 20,
  },
  profileOptions: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignSelf: 'center',
    paddingLeft: 10,
  },
  profile: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#fff',
    flex: 4,
  },

  usernameAndOnlineStatus: {
    flexDirection: 'column',
    justifyContent: 'center',
    paddingHorizontal: 10,
    alignItems:'center'
  },
  options: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
});

export default ChatHeader;
