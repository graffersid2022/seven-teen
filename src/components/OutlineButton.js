import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import styles from '../constant/styles';
import {colors} from '../constant/Theme';

const OutlineButton = ({onPress, title}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={mystyles.appButtonContainer}
      onPress={onPress}>
      <Text style={[styles.tx20, styles.color_B]}>{title}</Text>
    </TouchableOpacity>
  );
};

export default OutlineButton;

const mystyles = StyleSheet.create({
  appButtonContainer: {
    borderRadius: 50,
    paddingVertical: 8,
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: colors.success,
    borderWidth:2,
    marginVertical:10
  },
});
