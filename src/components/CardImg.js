import {StyleSheet, Text, View, Image} from 'react-native';
import React from 'react';
import {images} from '../constant/Theme';
import st from '../constant/styles';
import {environment} from '../utils/Constant';

const CardImg = ({src, type}) => {
  const IMAGE_URL = environment.IMG_URL+src;
  return (
    <View style={[styles.profileContainer, st.align_C]}>
      <Image
        source={
          type == 'personal'
            ? src
              ? {uri: IMAGE_URL}
              : images.avtar
            : src
            ? {uri: IMAGE_URL}
            : images.users
        }
        style={src ? styles.profilesty : styles.prosty}
        tintColor={src ? null : '#fff'}
      />
    </View>
  );
};

export default CardImg;

const styles = StyleSheet.create({
  profilesty: {
    width: 44,
    height: 44,
    borderRadius: 44 / 2,
  },
  prosty: {
    width: 35,
    height: 35,
    borderRadius: 35 / 2,
  },
  profileContainer: {
    width: 50,
    height: 50,
    backgroundColor: '#ccc',
    justifyContent: 'center',
    borderRadius: 50 / 2,
  },
});
