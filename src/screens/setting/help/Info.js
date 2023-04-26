import {StyleSheet, Image, View, Text, ImageBackground} from 'react-native';
import React, { useEffect, useState } from 'react';
import Header from '../../../components/Header';
import {colors, images} from '../../../constant/Theme';
import st from '../../../constant/styles';
import DeviceInfo from 'react-native-device-info';

const Info = ({navigation}) => {
  const [ver,setVer] = useState('')

  useEffect(()=>{
    let version = DeviceInfo.getVersion();
    setVer(version)
  },[]) 

  return (
    <View style={st.flex}>
      <ImageBackground source={images.Splash} style={st.flex}>
        <Header
          title={'App Info'}
          tintColor={colors.dark}
          color={colors.dark}
          backgroundColor={'transparent'}
          onPress={() => navigation.goBack()}
        />
        <View style={st.center}>
          <Image source={images.logo} />

          <View style={st.mt15}>
            <Text style={[st.tx16, st.txAlignC]}>
              {'\n'}Version {ver}
            </Text>
            <Text style={[st.tx16, st.txAlignC]}>2022 7Teen Inc.</Text>
            <Text style={[st.tx16, st.txAlignC, st.color_S, st.txDecor]}>
              {'\n'}License
            </Text>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

export default Info;

const styles = StyleSheet.create({});
