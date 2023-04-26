import {View, FlatList, StyleSheet, Text, Switch} from 'react-native';
import React, {useState, useEffect} from 'react';
import Header from '../../../components/Header';
import {colors, images} from '../../../constant/Theme';
import st from '../../../constant/styles';
import Accordian from '../../../components/Accordian';
import {setData, getData} from '../../../redux/reducers/Switch';
import {useSelector, useDispatch} from 'react-redux';

const Chat = ({navigation}) => {
  const [mode, setMode] = useState('Switch');

  useEffect(() => {
    dispatch(getData(array_data));
  }, []);

  const dispatch = useDispatch();
  const switch_data = useSelector(state => state.switch.data);

  const toggleSwitch_handle = (val, ind) => {
    const arr = [...switch_data];
    arr[ind].status = val;
    dispatch(setData(arr));
  };

  renderItem = ({item, index}) => {
    return (
      <Accordian
        toggleSwitch_handle={toggleSwitch_handle}
        item={item}
        navigation={navigation}
        mode={mode}
        index={index}
      />
    );
  };

  ItemSeparatorComponent = ({}) => {
    return <View style={st.ItemSeparatorView} />;
  };

  return (
    <View style={st.flex}>
      <Header
        title={'Chats'}
        tintColor={colors.light}
        color={colors.light}
        backgroundColor={colors.success}
        onPress={() => navigation.goBack()}
      />

      <View style={[st.pd20, st.flex]}>
        <FlatList
          data={switch_data}
          renderItem={renderItem}
          ItemSeparatorComponent={ItemSeparatorComponent}
        />
      </View>
    </View>
  );
};

export default Chat;

const array_data = [
  {id: 1, name: 'Enter is send', status: false},
  {id: 2, name: 'Media Visiblity', status: false},
  {
    id: 3,
    name: 'Keep chats Archived',
    status: true,
  },
  {id: 4, name: 'Backup chats regularly', status: true},
];
