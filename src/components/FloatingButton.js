import React, { } from "react";
import { View, StyleSheet, Image, TouchableOpacity, Text } from "react-native";
import {images,colors} from '../constant/Theme';

interface FloatingButtonProps {
  iconName: string;
  iconSize: number;
}


const FloatingButton = ({title, iconName, iconSize, onPress , floatImage, tintColor }: FloatingButtonProps) => {
  return (
    <View>
      <TouchableOpacity style={styles.floatingContainer} onPress={onPress} >
        <View style={styles.iconBox}>
         <Image source={floatImage} style={{width:20,height:20, tintColor: tintColor}} tintColor={tintColor} />
         {title&&<Text style={styles.Textsty}>{title}</Text>}
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default FloatingButton;


const styles = StyleSheet.create({
  floatingContainer: {
    backgroundColor: colors.success,
    width:45,
    height: 45,
    borderRadius: 45/2,
    position: "absolute",
    right: 20,
    bottom: 20,
  },
  iconBox: {
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    width: "100%",
  },
  Textsty:{
    color:'#fff'
  }
});