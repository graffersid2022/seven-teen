import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import styles from '../constant/styles';
import { colors } from '../constant/Theme';

const SimpleButton = ({onPress, title, disabled, backgroundColor}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      disabled = {disabled}
      style={[mystyles.appButtonContainer,backgroundColor && {backgroundColor},]}
      onPress={onPress}>
      <Text style={[styles.tx20, styles.color_L]}>{title}</Text>
    </TouchableOpacity>
  );
};

export default SimpleButton;

const mystyles = StyleSheet.create({
    appButtonContainer: {
      borderRadius: 50,
      paddingVertical: 10,
      paddingHorizontal: 20,
      justifyContent:"center",
      alignItems:'center',
      backgroundColor: colors.success,
      marginVertical:10
    },
  });