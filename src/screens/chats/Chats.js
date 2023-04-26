import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  BackHandler,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import st from '../../constant/styles';
import LinearGradient from 'react-native-linear-gradient';
import {colors, images} from '../../constant/Theme';
import SimpleButton from '../../components/SimpleButton';
import Card from '../../components/Card';
import {getApi, postApi} from '../../utils/apicalls/ApiCalls';
import {useFocusEffect} from '@react-navigation/native';
import {API} from '../../utils/endpoints/EndPoints';
import {errorRes} from '../../utils/helper/helperFunctions';
import FloatingButton from '../../components/FloatingButton';
import {useSelector, useDispatch} from 'react-redux';
import { getUser } from '../../redux/reducers/GetUser';

const Chats = ({navigation}) => {
  const [listItems, setListItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isListEnd, setIsListEnd] = useState(false);
  const [page, setPage] = useState(1);
  const [refreshing, setRefreshing] = useState(false);

  const login_data = useSelector(state => state.loginToken?.data);
  const {userdata} = useSelector(state => state.getUser);
  const dispatch = useDispatch();

  function useExitOnBack() {
    useFocusEffect(
      React.useCallback(() => {
        const handleBackPress = () => {
          BackHandler.exitApp();
          return true;
        };
        BackHandler.addEventListener('hardwareBackPress', handleBackPress);
        return () =>
          BackHandler.removeEventListener('hardwareBackPress', handleBackPress);
      }, []),
    );
  }

  const getUsersList = async () => {
    if (!loading && !isListEnd) {
      const api = API.GET_CONVERSATIONLIST + '/?limit=10&page=' + page;
      console.log({api});
      setLoading(true);
      try {
        const result = await getApi(api);
        console.log({result: result.data.data});
        if (result.data.success) {
          const dataSource = result.data.data;
          if (dataSource.length > 0) {
            setListItems([...listItems, ...dataSource]);
            setPage(page + 1);
            setLoading(false);
            setRefreshing(false);
          } else {
            setIsListEnd(true);
            setRefreshing(false);
            setLoading(false);
          }
        } else {
          alert(result.data.message);
          setLoading(false);
          setRefreshing(false);
        }
      } catch (e) {
        setLoading(false);
        setRefreshing(false);
        errorRes(e);
      }
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      // getUsersList();
    }, []),
  );

  useEffect(() => {
    // getUsersList();
    dispatch(getUser(login_data?.data.id));
    // console.log({userdata})
  }, []);

  const onBlock = blockList => {
    const data = ['63049d603768f985882d1da0'];
    if (data.length > 0) {
      for (let i = 0; data.length > 0; i++) {
        const id = data[i] == login_data?.data?.id;
        console.log('login and block user same');
      }
    } else {
      console.log('block user list not exists');
    }
  };

  const ItemView = ({item, index}) => {
    if (item.type == 'personal') {
      return (
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('Messages', {
              username: item.membersData?.name,
              picture: item.membersData?.user_image_path,
              isMuted: item.membersData?.mute,
              id: item.membersData?._id,
              type: item.type,
              conversation_id: item._id,
              isOnline: item.membersData?.isOnline,
              groupDisable: false,
              blockedByUsers : item.membersData?.blockedByUsers
            })
          }>
          <Card item={item?.membersData} type={item.type} />
        </TouchableOpacity>
      );
    } else {
      return (
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('Messages', {
              username: item.groupData?.name,
              picture: item.groupData?.user_image_path,
              isMuted: item.groupData?.mute,
              id: item.groupData?._id,
              type: item.type,
              conversation_id: item._id,
              groupDisable: item.groupDisable,
            })
          }>
          <Card item={item?.groupData} />
        </TouchableOpacity>
      );
    }
  };

  const ItemSeparatorView = () => {
    return <View style={st.ItemSeparatorView} />;
  };

  const EmptyListMessage = ({item}) => {
    return (
      <View style={[st.center, st.mt50]}>
        {/* <LinearGradient
          colors={['#00FFE5', '#0078FF']}
          start={{x: 1, y: 0}}
          end={{x: 0, y: 0.5}}
          style={styles.listemptysty}>
          <Image source={images.check} />
        </LinearGradient>
        <Text style={[st.tx20, st.color_S, st.mt15]}>You haven't Chat yet</Text>
        <SimpleButton
          title={'Start Chatting'}
          onPress={() => navigation.navigate('Contacts')}
        /> */}
        
        <Text style={[st.tx12,st.txAlignC]}>Your account has not been approved yet, please get your account approved by your parents then you can chat with any other person</Text>
      
        </View>
    );
  };

  const renderFooter = () => {
    return (
      <View style={[st.justify_C, st.align_C]}>
        {loading ? <ActivityIndicator color="black" style={st.mt15} /> : null}
      </View>
    );
  };

  const onRefresh = () => {
    // setListItems([]);
    // getUsersList();
    console.log('refresh')
    dispatch(getUser(login_data?.data.id));
  };

  useExitOnBack();

  return (
    <View style={st.flex}>
      <ScrollView style={st.flex}>

        {!login_data?.data?.isParentVerified&&
        <View style={[st.bgS,st.mr_H20,st.mt15]}>
        <View style={[st.row,st.flex,st.justify_S,{padding:5}]}>
         <View>
           <Text style={st.tx12}>Your parents</Text>
           <Text style={st.tx12}>Verfication is pending<Text style={{color:'red'}}>*</Text></Text>
         </View>
         <View>
         <Text style={[st.tx12,st.color_S]}>username</Text>
           <Text style={[st.tx12,st.color_S]}>mobile</Text>
         </View>
         <View>
         <Text style={[st.tx12,st.color_S]}>{userdata.parent_username}</Text>
          <Text style={[st.tx12,st.color_S]}>{userdata.phoneCountryCode} {userdata.parent_number}</Text>
         </View>
        </View>
        </View>
        }

        <FlatList
          contentContainerStyle={[st.pd20, st.flex]}
          data={listItems}
          ItemSeparatorComponent={ItemSeparatorView}
          renderItem={ItemView}
          keyExtractor={(item, index) => index.toString()}
          ListEmptyComponent={EmptyListMessage}
          ListFooterComponent={renderFooter}
          onEndReached={getUsersList}
          onEndReachedThreshold={0.5}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        />
      </ScrollView>
      {/* <FloatingButton
        onPress={() => navigation.navigate('Contacts')}
        floatImage={images.message}
      /> */}
    </View>
  );
};

export default Chats;

const styles = StyleSheet.create({
  listemptysty: {
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 2,
  },
});
