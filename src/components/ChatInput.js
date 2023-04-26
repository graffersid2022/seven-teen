import React, {useState, useEffect, useRef, memo} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Platform,
  Image,
  TouchableOpacity,
  PermissionsAndroid,
  Modal,
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
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {request, PERMISSIONS} from 'react-native-permissions';
import {sendMessage} from '../utils/helper/creatChats';
import {useSelector, useDispatch} from 'react-redux';
import shortnameToUnicode from '../utils/helper/shortnameToUnicode';
import {API} from '../utils/endpoints/EndPoints';
import {postApi} from '../utils/apicalls/ApiCalls';
import { setConversationExist } from '../redux/reducers/ConversationExists';

const ChatInput = ({
  reply,
  closeReply,
  isLeft,
  username,
  id,
  socket,
  setImage,
  navigation,
  isExistData
}) => {
  const [message, setMessage] = useState('');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const height = useSharedValue(70);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [file, setFile] = useState('');

  const login_data = useSelector(state => state.loginToken?.data);
  const dispatch = useDispatch()

  const checkCameraPermission = async () => {
    try {
      if (Platform.OS === 'ios') {
        const result = await request(PERMISSIONS.IOS.CAMERA);

        if (result === 'granted') {
          handleTakePhoto();
        }
      } else {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
          {
            title: '7Teen Camera Permission',
            message:
              '7Teen needs access to your camera ' +
              'so you can change your profile picture.',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log('You can use the camera');
          await checkWriteToExternalPermission();
        } else {
          console.log('Camera permission denied');
        }
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const checkWriteToExternalPermission = async (key = 'camera') => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          title: '7Teen Storage Permission',
          message:
            '7Teen needs to write to your storage ' +
            'to save your picture in Gallery',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        return true;
      } else {
        console.log('Storage permission denied');
        return false;
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const handleTakePhoto = async () => {
    const permissionsGranted = await checkCameraPermission();
    console.log({permissionsGranted});
    let options = {
      title: 'Select Image',
      customButtons: [
        {
          name: 'customOptionKey',
          title: 'Choose Photo from Custom Option',
        },
      ],
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    launchCamera(options, response => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
        alert(response.customButton);
      } else {
        let source = response;
        let imgData = {
          uri: source.assets[0]?.uri,
          file: source.assets[0]?.fileName,
          type: source.assets[0]?.type,
        };
        console.log({imgData});
        setFile(imgData);
        setImage(imgData);
        navigation.navigate('Camera', {
          imgData: imgData,
          socket: socket,
          reciverId: id,
        });
      }
    });
  };

  const toggleModalVisibility = isModalVisible => {
    setIsModalVisible(!isModalVisible);
  };

  useEffect(() => {
    if (showEmojiPicker) {
      height.value = withTiming(400);
    } else {
      height.value = reply ? withSpring(130) : withSpring(70);
    }
  }, [showEmojiPicker]);

  useEffect(() => {
    if (reply) {
      height.value = showEmojiPicker ? withTiming(450) : withTiming(130);
    } else {
      height.value = showEmojiPicker ? withSpring(400) : withSpring(70);
    }
  }, [reply]);

  const heightAnimatedStyle = useAnimatedStyle(() => {
    return {
      height: height.value && height.value,
    };
  });

  const sendMessageToCov = async conversationId => {
    if (message) {
      const params = {
        senderId: login_data?.data?.id,
        reciverId: id,
        message: message,
      };

      const params1 = {
        senderId: login_data?.data?.id,
        recieverId: id,
        conversationId: conversationId,
        Message: message,
        status: 'read',
      };

      socket.current.emit('NEW_MESSAGE', params);
      const msg = await sendMessage(params1);
      console.log('msg', msg);
      setMessage('');
      closeReply();
    } 
  };

  const createConversation = async () => {
    const api = API.GET_CONVERSATIONLIST;
    const params = {
      members: [id, login_data?.data?.id],
      type: 'personal',
    };
    try {
      const result = await postApi(api, params);
      console.log({result: result.data});
      if (result.data.success) {
        const data = result?.data?.data;
        sendMessageToCov(data._id);
        const dS = {status:true, id :data._id}
        dispatch(setConversationExist(dS))
      } else {
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <View>
      <Animated.View style={[styles.container, heightAnimatedStyle]}>
        {/* {reply ? (
          <View style={styles.replyContainer}>
            <TouchableOpacity onPress={closeReply} style={styles.closeReply}>
              <Image source={images.close} style={styles.close} />
            </TouchableOpacity>
            <Text style={styles.title}>
              Response to {isLeft ? username : 'Me'}
            </Text>
            <Text style={[styles.reply, st.tx14]}>{reply}</Text>
          </View>
        ) : null} */}
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
              onChangeText={text => setMessage(text)}
            />
            <TouchableOpacity
              style={styles.rightIconButtonStyle}
              onPress={() => toggleModalVisibility(isModalVisible)}>
              <Image source={images.attachment} />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.rightIconButtonStyle}
              onPress={handleTakePhoto}>
              <Image source={images.outlinecamera} />
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={styles.sendButton}
            onPress={() => {
              if(isExistData?.isExist){
              console.log('if')
              sendMessageToCov(isExistData?.data?._id)
              }
              else{
              createConversation()
              console.log('else')
            }
              }}>
            <Image source={message ? images.send : images.mic} />
          </TouchableOpacity>
        </View>
        <EmojiPicker
          onMsg={msg => {
            console.log({msg: msg});
            setMessage(msg);
          }}
        />
      </Animated.View>

      <Modal
        animationType="slide"
        transparent
        visible={isModalVisible}
        presentationStyle="overFullScreen"
        onRequestClose={() => toggleModalVisibility(isModalVisible)}>
        <View style={st.center}>
          <View style={st.modalView_attachment}>
            <View style={[st.row, st.justify_S]}>
              <TouchableOpacity
                style={st.align_C}
                onPress={() => toggleModalVisibility(isModalVisible)}>
                <Image source={images.document} />
                <Text style={[st.tx12, st.color_S]}>Document</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={st.align_C}
                onPress={() => toggleModalVisibility(isModalVisible)}>
                <Image source={images.camera_outline} />
                <Text style={[st.tx12, st.color_S]}>Camera</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={st.align_C}
                onPress={() => toggleModalVisibility(isModalVisible)}>
                <Image source={images.contact} />
                <Text style={[st.tx12, st.color_S]}>Contact</Text>
              </TouchableOpacity>
            </View>

            <View style={[st.row, st.justify_S, st.mt15]}>
              <TouchableOpacity
                style={[st.align_C, st.mr_H20]}
                onPress={() => toggleModalVisibility(isModalVisible)}>
                <Image source={images.audio} />
                <Text style={[st.tx12, st.color_S]}>Audio</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[st.align_C]}
                onPress={() => toggleModalVisibility(isModalVisible)}>
                <Image source={images.location} />
                <Text style={[st.tx12, st.color_S]}>Location</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={st.align_C}
                onPress={() => toggleModalVisibility(isModalVisible)}>
                <Image source={images.contact} />
                <Text style={[st.tx12, st.color_S]}>Contact</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  emoji: {
    width: 20,
    height: 20,
  },
  replyContainer: {
    paddingHorizontal: 10,
    marginHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  title: {
    marginTop: 5,
    fontWeight: 'bold',
  },
  closeReply: {
    position: 'absolute',
    right: 10,
    top: 5,
  },
  close: {
    width: 10,
    height: 10,
  },
  reply: {
    marginTop: 5,
  },
  innerContainer: {
    paddingHorizontal: 10,
    marginHorizontal: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    paddingVertical: 10,
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
  rightIconButtonStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingRight: 15,
    paddingLeft: 10,
    borderLeftWidth: 1,
    borderLeftColor: '#fff',
  },
  swipeToCancelView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 30,
  },
  swipeText: {
    fontSize: 15,
  },
  emoticonButton: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 10,
  },
  recordingActive: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: 10,
  },
  recordingTime: {
    fontSize: 20,
    marginLeft: 5,
  },
  microphoneAndLock: {
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  lockView: {
    backgroundColor: '#eee',
    width: 60,
    alignItems: 'center',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    height: 130,
    paddingTop: 20,
  },
  sendButton: {
    backgroundColor: colors.success,
    borderRadius: 5,
    height: 35,
    width: 35,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default ChatInput;
