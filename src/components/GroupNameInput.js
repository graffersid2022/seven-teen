import React, {useState, useEffect, useRef, memo} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Platform,
  Image,
  TouchableOpacity,
} from 'react-native';

import Animated, {
  useSharedValue,
  withSpring,
  withTiming,
  useAnimatedStyle,
} from 'react-native-reanimated';
import {colors, images} from '../constant/Theme';
import st from '../constant/styles';
import EmojiPicker from './emojis/EmojiPicker';

const GroupNameInput = ({msg}) => {
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const height = useSharedValue(50);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (showEmojiPicker) {
      height.value = withTiming(400);
    } else {
      height.value = withSpring(50);
    }
  }, [showEmojiPicker]);

  useEffect(() => {
    
    height.value = showEmojiPicker ? withSpring(400) : withSpring(50);
   
  }, []);

  const heightAnimatedStyle = useAnimatedStyle(() => {
    return {
      height: height.value && height.value,
    };
  });

  return (
    <Animated.View style={[styles.container, heightAnimatedStyle]}>
      <View style={styles.innerContainer}>
        <View style={styles.inputAndMicrophone}>
          <TouchableOpacity
            style={styles.emoticonButton}
            onPress={() => setShowEmojiPicker(value => !value)}>
            <Image
              source={showEmojiPicker ? images.keyboard : images.smile}
              style={styles.emoji}
            />
          </TouchableOpacity>
          <TextInput
            multiline
            placeholder={'Type message...'}
            placeholderTextColor={colors.warning}
            style={[styles.input, st.tx14, st.color_B]}
            value={message}
            onChangeText={text => [setMessage(text),msg(text)]}
          />
        </View>
      </View>
      <EmojiPicker />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
  },
  emoji: {
    width: 20,
    height: 20,
  },

  innerContainer: {
    flexDirection: 'row',
    // paddingVertical: 10,
  },
  inputAndMicrophone: {
    flexDirection: 'row',
    backgroundColor: colors.light,
    flex: 3,
    marginRight: 10,
    paddingVertical: Platform.OS === 'ios' ? 10 : 0,
    // borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'space-between',
    borderColor: colors.warning,
    borderWidth: 0.5,
    borderRadius: 50,
  },
  input: {
    backgroundColor: 'transparent',
    paddingLeft: 20,
    flex: 3,
    alignSelf: 'center',
  },

  emoticonButton: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 10,
  },
});

export default GroupNameInput;
