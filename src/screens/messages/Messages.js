import {
  StyleSheet,
  ImageBackground,
  View,
  BackHandler,
  Text,
} from 'react-native';
import React, {useState, useRef, useEffect} from 'react';
import ChatHeader from '../../components/ChatHeader';
import st from '../../constant/styles';
import ChatInput from '../../components/ChatInput';
import MessagesList from '../../components/MessagesList';
import {images} from '../../constant/Theme';
import {io} from 'socket.io-client';
import {environment} from '../../utils/Constant';
import {useSelector, useDispatch} from 'react-redux';
import {API} from '../../utils/endpoints/EndPoints';
import {errorRes} from '../../utils/helper/helperFunctions';
import {postApi} from '../../utils/apicalls/ApiCalls';
import Loader from '../../components/Loader';
import {setConversationExist} from '../../redux/reducers/ConversationExists';
import {useFocusEffect} from '@react-navigation/native';

if (!window.location) {
  window.navigator.userAgent = 'ReactNative';
}

const connectionConfig = {
  transports: ['websocket', 'polling'],
};

const Messages = ({navigation, route}) => {
  const {
    username,
    picture,
    isMuted,
    id,
    type,
    conversation_id,
    isOnline,
    groupDisable,
    blockedByUsers,
  } = route.params;
  const [reply, setReply] = useState('');
  const [isLeft, setIsLeft] = useState();
  const [isExist, setIsExist] = useState();
  const [loading, setLoading] = useState(false);
  const login_data = useSelector(state => state.loginToken?.data);
  const dispatch = useDispatch();
  const socket = useRef();

  function useExitOnBack() {
    useFocusEffect(
      React.useCallback(() => {
        const handleBackPress = () => {
          dispatch(setConversationExist(null));
          console.log(
            '*****************existsconversationvaluenull*************************',
          );
          navigation.navigate('Chats');
          return true;
        };
        BackHandler.addEventListener('hardwareBackPress', handleBackPress);
        return () =>
          BackHandler.removeEventListener('hardwareBackPress', handleBackPress);
      }, []),
    );
  }

  useExitOnBack();

  useEffect(() => {
    console.log({groupDisable, type, blockedByUsers});
    conversationExsits();
    if (login_data) {
      socket.current = io(environment.SOCKET, connectionConfig);
      socket.current.on('connect', () => {
        console.log('socket connected==>', socket.current.connect);
        socket.current.emit('USER_ADDED', {userId: login_data?.data?.id});
      });
    }
    return () => {
      console.log('Disconnected********', login_data?.data?.id);
      socket.current.emit('DISCONNECTED', login_data?.data?.id);
    };
  }, [login_data]);

  const swipeToReply = (message, isLeft) => {
    console.log({message, isLeft});
    setReply(message.length > 50 ? message.slice(0, 50) + '...' : message);
    setIsLeft(isLeft);
  };

  const closeReply = () => {
    setReply('');
  };

  const conversationExsits = async () => {
    const api = API.CONVERSATION_EXSTIS;
    const params = {
      members: [id, login_data?.data?.id],
      type: 'personal',
    };
    try {
      setLoading(true);
      const result = await postApi(api, params);
      // console.log({result: result.data});
      const data = result?.data;
      if (data) {
        setIsExist(data);
        setLoading(false);
        if (data.isExist) {
          const dS = {status: true, id: data?.data._id};
          dispatch(setConversationExist(dS));
        } else {
          const dS = {status: false, id: id};
          dispatch(setConversationExist(dS));
        }
      }
    } catch (e) {
      setLoading(false);
      errorRes(e);
    }
  };

  return (
    <View style={st.flex}>
      <ChatHeader
        onPress={() => {
          navigation.goBack();
          dispatch(setConversationExist(null));
        }}
        username={username}
        picture={picture}
        onlineStatus={isOnline ? 'Online' : 'Offline'}
        type={type}
        id={id}
      />

      <ImageBackground source={images.Splash} style={[st.flex]}>
        <MessagesList
          onSwipeToReply={swipeToReply}
          socket={socket}
          type={type}
          id={isExist?.isExist ? isExist?.data._id : id}
          isExistData={isExist}
        />
      </ImageBackground>

      {type == 'group' ? (
        !groupDisable ? (
          <ChatInput
            reply={reply}
            isLeft={isLeft}
            closeReply={closeReply}
            username={username}
            id={id}
            socket={socket}
            setImage={image => {
              console.log({image});
              // setImage()
            }}
            navigation={navigation}
            isExistData={isExist}
          />
        ) : (
          <View style={[st.color_S, st.align_C]}>
            <View style={st.pd20}>
              <Text style={[st.tx14, st.color_B, st.txAlignC]}>
                Now, you can't send the message in this group because you have
                left this group
              </Text>
            </View>
          </View>
        )
      ) : null}

      {type == 'personal' && (
        <ChatInput
          reply={reply}
          isLeft={isLeft}
          closeReply={closeReply}
          username={username}
          id={id}
          socket={socket}
          setImage={image => {
            console.log({image});
            // setImage()
          }}
          navigation={navigation}
          isExistData={isExist}
        />
      )}

     

      {loading && <Loader />}
    </View>
  );
};

export default Messages;

const styles = StyleSheet.create({});
