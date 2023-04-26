import React, {memo} from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';

import shortnameToUnicode from '../../utils/helper/shortnameToUnicode';

const Emoji = ({item, onMsg}) => {
  return (
    <TouchableOpacity
      style={styles.emojiContainer}
      onPress={item => {
        onMsg(item);
      }}>
      <Text style={styles.emoji}>{shortnameToUnicode[`:${item}:`]}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  emojiContainer: {
    marginHorizontal: 9,
  },
  emoji: {
    fontSize: 25,
  },
});

export default Emoji;
