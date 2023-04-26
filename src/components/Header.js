import {View, Text, TouchableOpacity, StyleSheet, Image, Platform} from 'react-native';
import React from 'react';
import st from '../constant/styles';
import {images} from '../constant/Theme';
import Icon from 'react-native-vector-icons/Feather';
const Header = ({title, onPress, backgroundColor, tintColor, color}) => {
  return (
    <View
      style={[
        st.row,
        st.pd20,
        st.align_C,
        backgroundColor && {backgroundColor},
        {zIndex: 999, paddingTop:Platform.OS=='android'?30:50},
      ]}>
      <View style={styles.wd20}>
        <TouchableOpacity onPress={onPress}>
          {/* <Image
            source={images.left}
            style={styles.imgsty}
            tintColor={'#fff'}
          /> */}

          <Icon name={'arrow-left'} size={25} color={tintColor} />
        </TouchableOpacity>
      </View>
      <View style={[styles.wd60]}>
        <View style={[st.align_C]}>
          <Text style={[st.tx20, st.color_B, color && {color}]}>{title}</Text>
        </View>
      </View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  wd20: {width: '8%'},
  imgsty: {width: 20, height: 20, color:'#fff'},
  wd60: {width: '80%'},
});
