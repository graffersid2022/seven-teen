import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Switch,
} from 'react-native';
import React, {useState} from 'react';
import st from '../constant/styles';
import {images, colors} from '../constant/Theme';

const Accordian = ({item, navigation, mode, index, toggleSwitch_handle}) => {
  
  const toggleSwitch = (val, ind) => {
    toggleSwitch_handle(val, ind);
  };

  return (
    <View style={[st.row, st.pd_V10, st.align_C, st.mr_H20]}>
      <View style={styles.wdh80}>
        <Text style={[st.tx16, st.color_S]}>{item.name}</Text>
      </View>
      <View style={[styles.wdh20, st.align_E]}>
        {mode == 'Switch' ? (
          <Switch
            trackColor={{false: '#A6A6A6', true: colors.green}}
            thumbColor={colors.light}
            ios_backgroundColor="#3e3e3e"
            onValueChange={val => toggleSwitch(val, index)}
            value={item.status}
          />
        ) : (
          <TouchableOpacity
            onPress={() => {
              if (item?.screenName) {
                navigation.navigate(item?.screenName);
              }
            }}>
            <Image source={images.arrow_right} />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default Accordian;

const styles = StyleSheet.create({
  wdh80: {
    width: '80%',
  },
  wdh20: {
    width: '20%',
  },
  wdh60: {
    width: '60%',
  },
});
