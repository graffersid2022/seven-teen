import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  ScrollView,
  Pressable,
  RefreshControl,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import st from '../../constant/styles';
import {data} from '../../constant/data';
import LinearGradient from 'react-native-linear-gradient';
import {images} from '../../constant/Theme';
import SimpleButton from '../../components/SimpleButton';
import Card from '../../components/Card';
import DeleteModal from '../../HOCs/DeleteModal';
import {API} from '../../utils/endpoints/EndPoints';
import {getApi} from '../../utils/apicalls/ApiCalls';
import Loader from '../../components/Loader';
import {useSelector, useDispatch} from 'react-redux';
import {errorRes} from '../../utils/helper/helperFunctions';
import {useIsFocused} from '@react-navigation/native';

const Calls = ({navigation}) => {
  const [listItems, setListItems] = useState([]);
  const [mode, setMode] = useState('Calls');
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const isFocused = useIsFocused();

  const login_data = useSelector((state) => state.loginToken?.data);
  const ContactsList = useSelector((state) => state.ContactsList?.data);

  useEffect(() => {
    callHistroy_handle();
    // console.log({ContactsList});
  }, [isFocused]);

  const callHistroy_handle = async () => {
    const api = API.CALL_HISTORY + login_data?.data?.id;
    console.log({api});
    try {
      const result = await getApi(api);
      console.log({result: result?.data?.data?.length});
      if (result?.data?.success) {
        const data = result?.data?.data;

        const arr1 = data.filter((o1) =>
          ContactsList?.filter((o2) => {
            if (o1.receiver == o2.uid) {
              return (o1.data.entities.receiver.entity.name = o2.name);
            }
            if (o1.sender == o2.uid) {
              return (o1.data.entities.sender.entity.name = o2.name);
            }
          }),
        );

        setListItems(arr1 ? arr1?.reverse() : data);
        setLoading(false);
        setRefreshing(false);
      } else {
        setLoading(false);
        setRefreshing(false);
      }
    } catch (e) {
      console.log(e);
      setLoading(false);
      errorRes(e);
    }
  };

  const ItemView = ({item}) => {
    return (
      <AttachHandleDelete item={item} callHistroy_handle={callHistroy_handle} />
    );
  };

  const AttachHandleDelete = DeleteModal(
    ({handleDelete, item, callHistroy_handle}) => (
      <Pressable
        style={st.mb10}
        onLongPress={() => handleDelete()}
        onPress={() => {
          navigation.navigate('CallDetails', {item: item});
        }}>
        <Card item={item} mode={mode} />
      </Pressable>
    ),
  );

  const EmptyListMessage = ({item}) => {
    return (
      <View style={[st.center, st.mt50]}>
        <LinearGradient
          colors={['#00FFE5', '#0078FF']}
          start={{x: 1, y: 0}}
          end={{x: 0, y: 0.5}}
          style={styles.listemptysty}>
          <Image source={images.check} />
        </LinearGradient>
        <Text style={[st.tx20, st.color_S, st.mt15]}>You haven't Call yet</Text>
        <SimpleButton
          title={'Start Call'}
          onPress={() => navigation.navigate('Users')}
        />
      </View>
    );
  };

  const onRefresh = () => {
    setRefreshing(true);
    callHistroy_handle();
  };

  return (
    <View style={st.flex}>
      <ScrollView style={st.flex}>
        <FlatList
          contentContainerStyle={[st.pd20, st.flex]}
          data={listItems}
          renderItem={ItemView}
          keyExtractor={(item, index) => index.toString()}
          ListEmptyComponent={EmptyListMessage}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        />
      </ScrollView>
      {loading && <Loader />}
    </View>
  );
};

export default Calls;

const styles = StyleSheet.create({
  listemptysty: {
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 2,
  },
});
