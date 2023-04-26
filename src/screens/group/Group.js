import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import Header from '../../components/Header';
import st from '../../constant/styles';
import {colors, images} from '../../constant/Theme';
import {data} from '../../constant/data';
import CardImg from '../../components/CardImg';
import Label from '../../components/Label';
import FloatingButton from '../../components/FloatingButton';
import LinearGradient from 'react-native-linear-gradient';
import {getApi} from '../../utils/apicalls/ApiCalls';
import {API} from '../../utils/endpoints/EndPoints';
import {errorRes} from '../../utils/helper/helperFunctions';
import {useSelector} from 'react-redux';

const Group = ({navigation}) => {
  const [listItems, setListItems] = useState([]);
  const [selectList, setselectList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isListEnd, setIsListEnd] = useState(false);
  const [page, setPage] = useState(1);

  const login_data = useSelector(state => state.loginToken?.data);

  const getUsersList = async () => {
    if (!loading && !isListEnd) {
      const api = API.GET_USERSLIST + '/?limit=10&page=' + page;
      console.log({api});
      setLoading(true);
      try {
        const result = await getApi(api);
        if (result.data.success) {
          const dataSource = result.data.data;
          if (dataSource.length > 0) {
            setListItems([...listItems, ...dataSource]);
            setPage(page + 1);
            setLoading(false);
          } else {
            setIsListEnd(true);
            setLoading(false);
          }
        } else {
          alert(result.data.message);
          setLoading(false);
        }
      } catch (e) {
        setLoading(false);
        errorRes(e);
      }
    }
  };

  useEffect(() => {
    getUsersList();
  }, []);

  const onPress = item => {
    const arr = [];
    arr.push(...selectList, item);
    const data = arr.filter(
      (a, i) => arr.findIndex(s => a._id === s._id) === i,
    );
    setselectList(data);
  };

  const popItem = ind => {
    const data = selectList;
    const arr = data.filter(item => item._id !== ind);
    setselectList(arr);
  };

  const selectListItemView = ({item}) => {
    return (
      <View style={[st.mr15]}>
        <CardImg src={item.user_image_path} type={'personal'} />
        <TouchableOpacity onPress={() => popItem(item._id)}>
          <LinearGradient
            colors={['#00FFE5', '#0078FF']}
            start={{x: 1, y: 0}}
            end={{x: 0, y: 0.5}}
            style={styles.cross_sty}>
            <Text style={[st.tx12, st.color_L]}>x</Text>
          </LinearGradient>
        </TouchableOpacity>
        <Text style={[st.tx12, {width: 50}]} numberOfLines={1}>
          {item.name}
        </Text>
      </View>
    );
  };

  const ItemView = ({item}) => {
    if(login_data?.data?.id != item._id)
    return (
      <TouchableOpacity style={[st.row, st.mt15]} onPress={() => onPress(item)}>
        <View style={styles.wdh20}>
          <CardImg src={item.user_image_path} type={'personal'} />
        </View>
        <View style={styles.wdh80}>
          <Text style={[st.tx16, st.color_S, st.txCap]}>{item.name}</Text>
          <Text style={[st.tx14]}>{item.phone}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  const renderFooter = () => {
    return (
      <View style={[st.justify_C, st.align_C]}>
        {loading ? <ActivityIndicator color="black" style={st.mt15} /> : null}
      </View>
    );
  };

  return (
    <View style={st.flex}>
      <Header
        title={'New Group'}
        tintColor={colors.light}
        color={colors.light}
        backgroundColor={colors.success}
        onPress={() => navigation.goBack()}
      />
      {selectList.length > 0 && (
        <View>
          <View style={[st.pd_T10, st.pd_H20]}>
            <Text style={st.tx14}>
              {selectList.length + ' of ' + listItems.length + ' selected'}
            </Text>
          </View>
          <FlatList
            contentContainerStyle={[st.pd20]}
            data={selectList}
            horizontal={true}
            renderItem={selectListItemView}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
      )}
      {selectList.length > 0 && <View style={st.ItemSeparatorView} />}

      <FlatList
        contentContainerStyle={[st.pd20]}
        data={listItems}
        renderItem={ItemView}
        keyExtractor={(item, index) => index.toString()}
        ListFooterComponent={renderFooter}
        onEndReached={getUsersList}
        onEndReachedThreshold={0.5}
      />

      <FloatingButton floatImage={images.right} tintColor={'#fff'}
        onPress={() => {
          if (selectList.length > 0) {
            navigation.navigate('GroupName',{list:selectList});
          } else {
            alert('Atleast 1 contact must be selected');
          }
        }}
      />
    </View>
  );
};

export default Group;

const styles = StyleSheet.create({
  wdh20: {
    width: '20%',
  },
  wdh80: {
    width: '80%',
  },
  cross_sty: {
    backgroundColor: colors.success,
    width: 20,
    height: 20,
    borderRadius: 20 / 2,
    position: 'absolute',
    top: -15,
    left: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
