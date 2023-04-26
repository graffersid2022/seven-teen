import React, {useState, useRef, useEffect} from 'react';
import {ScrollView, View} from 'react-native';
import {useSelector} from 'react-redux';
import Message from './Message';
import {getMessage} from '../utils/helper/creatChats';
import Loader from '../components/Loader';
import st from '../constant/styles';


const MessagesList = ({onSwipeToReply, socket, type, id, isExistData}) => {
  const [messages, setMessages] = useState([]);
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [loading, setLoading] = useState(true);

  const login_data = useSelector(state => state.loginToken?.data);
  const converExist = useSelector(state => state.conversationExist?.data)
  const user = useRef(login_data?.data.id);
  const scrollView = useRef();

  useEffect(() => {
    if (socket?.current) {
      if (type == 'group') {
        socket.current.on('GROUP_NEW_MESSAGE', msg => {
          setArrivalMessage({messages: msg});
        });
      } else {
        socket.current.on('NEW_MESSAGE', msg => {
          setArrivalMessage({messages: msg});
        });
      }
      // console.log({messages})
    }
  }, [socket?.current, messages]);

  useEffect(() => {
    // console.log({isExistData, converExist})
    if(converExist?.status)
    getMsgs();
    else
    setLoading(false)
  });

  useEffect(() => {
    arrivalMessage && setMessages(prev => [...prev, arrivalMessage]);
  }, [arrivalMessage]);

  const getMsgs = async () => {
    try {
      // console.log('call get message')
      const chats = await getMessage(converExist?.id);
      // console.log({chats})
      setMessages(chats);
      setLoading(false);
    } catch (e) {
      setLoading(false);
    }
  };

  return (
    <View style={st.flex}>
      <ScrollView
        style={st.flex}
        ref={scrollView}
        onContentSizeChange={() =>
          scrollView.current.scrollToEnd({animated: true})
        }>
        {messages?.map((i, index) => (
          <Message
            key={index}
            time={i.createdAt}
            isLeft={i.senderId !== user.current}
            message={i.Message}
            onSwipe={onSwipeToReply}
            id={i._id}
            type={type}
            senderData = {i.sendersData}
          />
        ))}
      </ScrollView>
      {loading && <Loader />}
    </View>
  );
};

export default MessagesList;
