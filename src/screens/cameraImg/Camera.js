import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ImageBackground,
  TouchableOpacity,
  Image,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import st from '../../constant/styles';
import {colors, images} from '../../constant/Theme';
import {sendMessage} from '../../utils/helper/creatChats';
import {useSelector} from 'react-redux';

const Camera = ({route, navigation}) => {
  const [attachment, setAttachment] = useState(route.params.imgData);
  const [caption, setCaption] = useState('');
  const [reciverId, setreciverId] = useState(route.params.reciverId);
  const [socket, setSocket] = useState(route.params.socket);
  const login_data = useSelector(state => state.loginToken?.data);

  useEffect(() => {
  }, []);

  const sendMessageToCov = async () => {
    const params = {
      senderId: login_data?.data?.id,
      reciverId: reciverId,
      message: '',
    };
    const params1 = {
      senderId: login_data?.data?.id,
      recieverId: reciverId,
      file: attachment,
      fileType: attachment.type,
      status: 'read',
      type : 'file',
      Message : caption
    };

    socket.current.emit('NEW_MESSAGE', params);
    const msg = await sendMessage(params1);
    if (msg) navigation.goBack();
    console.log('imagemsg', msg);
  };

  return (
    <View style={st.flex}>
      <ImageBackground source={{uri: attachment?.uri}} style={st.flex}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            source={images.close}
            tintColor={colors.light}
            style={styles.cross}
          />
        </TouchableOpacity>
        <View
          style={[
            st.row,
            st.pd20,
            st.align_C,
            {position: 'absolute', bottom: 10},
          ]}>
          <TextInput
            style={[st.inputs, st.inputRoundgrey(false), {width: '87%'}]}
            placeholder="Add a caption"
            placeholderTextColor={colors.light}
            value={caption}
            onChangeText={text => setCaption(text)}
          />
          <TouchableOpacity
            style={styles.sendButton}
            onPress={() => sendMessageToCov()}>
            <Image source={attachment ? images.send : images.mic} />
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
};

export default Camera;

const styles = StyleSheet.create({
  sendButton: {
    backgroundColor: colors.success,
    borderRadius: 5,
    height: 35,
    width: 35,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 10,
  },
  cross: {
    width: 20,
    height: 20,
    margin: 30,
  },
});

const data = {
  file: 'rn_image_picker_lib_temp_3a41a2d2-64ee-4f28-8516-a5b6a6217e6e.jpg',
  type: 'image/jpeg',
  uri: 'file:///data/user/0/com.seventeen/cache/rn_image_picker_lib_temp_3a41a2d2-64ee-4f28-8516-a5b6a6217e6e.jpg',
};
