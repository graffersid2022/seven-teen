import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {colors, images} from '../constant/Theme';
import st from '../constant/styles';
import Share from 'react-native-share';

const ProfileHeader = ({onPress}) => {
  const navigation = useNavigation();

  const share_handle = () => {
    const shareOptions = {
      title: 'Share file',
      failOnCancel: false,
      saveToFiles: true,
    };
    Share.open(shareOptions)
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        err && console.log(err);
      });
  };

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
      <View style={[styles.profileOptions, st.pd_T10]}>
        <TouchableOpacity style={styles.profile}></TouchableOpacity>
        <View style={styles.options}>
          <TouchableOpacity
            onPress={() => share_handle()}
            style={{paddingHorizontal: 5}}>
            <Image source={images.share} tintColor={colors.light} />
          </TouchableOpacity>
          <TouchableOpacity style={st.pd_L20}>
            <Image source={images.outlinePhone} tintColor={colors.light} />
          </TouchableOpacity>
          <TouchableOpacity style={st.pd_H20}>
            <Image source={images.outlineVdo} tintColor={colors.light} />
          </TouchableOpacity>
          <TouchableOpacity>
            <Image source={images.menu} tintColor={colors.light} />
          </TouchableOpacity>
        </View>
      </View>
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
    alignItems: 'center',
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
  },
  options: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
});

export default ProfileHeader;
