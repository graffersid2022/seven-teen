import React, {useState, useRef} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Modal} from 'react-native';
import {
  FlingGestureHandler,
  Directions,
  State,
} from 'react-native-gesture-handler';
import Animated, {
  withSpring,
  useAnimatedStyle,
  useAnimatedGestureHandler,
  useSharedValue,
} from 'react-native-reanimated';

import st from '../constant/styles';
import {colors, images} from '../constant/Theme';
import SimpleButton from './SimpleButton';
import OutlineButton from './OutlineButton';
import {setHeaderId} from '../redux/reducers/HeaderId';
import {useDispatch, useSelector} from 'react-redux';
import moment from 'moment';

const Message = ({time, isLeft, message, onSwipe, id, key, type, senderData}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const login_data = useSelector(state => state.loginToken?.data);

  const startingPosition = 0;
  const x = useSharedValue(startingPosition);

  const dispatch = useDispatch();

  const isOnLeft = type => {
    if (isLeft && type === 'messageContainer') {
      return {
        alignSelf: 'flex-start',
        backgroundColor: colors.danger,
        borderTopLeftRadius: 0,
      };
    } else if (isLeft && type === 'message') {
      return {
        color: colors.dark,
      };
    } else if (isLeft && type === 'time') {
      return {
        color: colors.dark,
      };
    } else {
      return {
        borderTopRightRadius: 0,
      };
    }
  };

  const eventHandler = useAnimatedGestureHandler({
    onStart: (event, ctx) => {},
    onActive: (event, ctx) => {
      x.value = isLeft ? 50 : -50;
    },
    onEnd: (event, ctx) => {
      x.value = withSpring(startingPosition);
    },
  });

  const uas = useAnimatedStyle(() => {
    return {
      transform: [{translateX: x.value}],
    };
  });

  const toggleModalVisibility = isModalVisible => {
    setIsModalVisible(!isModalVisible);
  };

  const selectedmsg_handle = id => {
    setSelectedId(id);
    dispatch(setHeaderId(id));
  };

  const msgTime = (timer) => {
    const date = new Date(timer)
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; 
    minutes = minutes < 10 ? '0' + minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;
    return strTime;
  }

  return (
    <View style={st.flex}>
      <FlingGestureHandler
        direction={isLeft ? Directions.RIGHT : Directions.LEFT}
        onGestureEvent={eventHandler}
        onHandlerStateChange={({nativeEvent}) => {
          if (nativeEvent.state === State.ACTIVE) {
            // onSwipe(message, isLeft);
          }
        }}>
        <Animated.View
          style={[
            styles.container,
            uas,
            {
              backgroundColor:
                selectedId != null
                  ? selectedId != key
                    ? '#BFFFF8'
                    : 'transparent'
                  : null,
            },
          ]}>
          <TouchableOpacity
            onLongPress={() => {
              toggleModalVisibility();
              selectedmsg_handle(id);
            }}>
            <View
              style={[styles.messageContainer, isOnLeft('messageContainer')]}>
              <View style={styles.messageView}>
                {type=='group' && senderData._id!=login_data?.data?.id&& <Text style={[st.tx12, st.color_L]}>{senderData.name}</Text>}
                <Text
                  style={[
                    styles.message,
                    st.tx14,
                    st.color_L,
                    isOnLeft('message'),
                  ]}>
                  {message}
                </Text>
              </View>
              <View style={styles.timeView}>
                <Text
                  style={[styles.time, st.tx10, st.color_L, isOnLeft('time')]}>
                  {msgTime(time)}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        </Animated.View>
      </FlingGestureHandler>

      <Modal
        animationType="slide"
        transparent
        visible={isModalVisible}
        presentationStyle="overFullScreen"
        onRequestClose={toggleModalVisibility}>
        <View style={st.center}>
          <View style={st.modalView}>
            <Text style={[st.tx16, st.color_S]}>Delete 1 message</Text>

            <View style={st.mt15}>
              <View style={[st.justify_S, st.row]}>
                <View style={[st.mr15, st.wdh48]}>
                  <OutlineButton
                    title={'Cancel'}
                    onPress={() => {
                      toggleModalVisibility(isModalVisible);
                      selectedmsg_handle(null);
                      setHeaderId(null);
                    }}
                  />
                </View>
                <View style={styles.wd48}>
                  <SimpleButton
                    title={'Yes, Delete'}
                    onPress={() => {
                      toggleModalVisibility(isModalVisible);
                      selectedmsg_handle(null);
                      setHeaderId(null);
                    }}
                  />
                </View>
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    marginVertical: 5,
  },
  messageContainer: {
    backgroundColor: colors.success,
    maxWidth: '80%',
    alignSelf: 'flex-end',
    flexDirection: 'row',
    borderRadius: 15,
    paddingHorizontal: 10,
    marginHorizontal: 10,
    paddingTop: 5,
    paddingBottom: 10,
  },
  messageView: {
    backgroundColor: 'transparent',
    maxWidth: '80%',
  },
  timeView: {
    backgroundColor: 'transparent',
    justifyContent: 'flex-end',
    paddingLeft: 10,
  },
  message: {
    alignSelf: 'flex-start',
  },
  time: {
    alignSelf: 'flex-end',
  },
});

export default Message;
