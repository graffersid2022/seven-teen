import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import styles from '../constant/styles';

const GradientButton = ({onPress, title}) => {
  return (
    <TouchableOpacity activeOpacity={0.8} onPress={onPress}>
      <LinearGradient
        colors={['#00FFE5', '#0078FF']}
        start={{x: 1, y: 0}} 
        end={{x: 0, y: 0.5}} 
        style={mystyles.appButtonContainer}>
        <Text style={[styles.tx16,styles.color_L]}>{title}</Text>
      </LinearGradient>
    </TouchableOpacity>
  );
};

export default GradientButton;

const mystyles = StyleSheet.create({
    appButtonContainer: {
      borderRadius: 50,
      paddingVertical: 10,
      paddingHorizontal: 20,
      justifyContent:"center",
      alignItems:'center'
    },
  });
