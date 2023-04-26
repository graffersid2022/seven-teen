import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  Switch,
  ScrollView,
  Modal,
  Touchable,
  TouchableOpacity,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import ProfileHeader from '../../../components/ProfileHeader';
import st from '../../../constant/styles';
import {images, colors} from '../../../constant/Theme';
import {data} from '../../../constant/data';
import CardImg from '../../../components/CardImg';
import ActionModal from './components/ActionModal';
import {API} from '../../../utils/endpoints/EndPoints';
import {errorRes} from '../../../utils/helper/helperFunctions';
import {getApi, patchApi} from '../../../utils/apicalls/ApiCalls';
import Loader from '../../../components/Loader';

const ViewProfile = ({navigation, route}) => {
  const [arrdata, setarrData] = useState();
  const [listdata, setlistdata] = useState(list);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [loading, setLoading] = useState(false);

  const userInfo_handle = async () => {
    const api = API.GET_USER + route?.params?.id;
    console.log({api});
    try {
      setLoading(true);
      const result = await getApi(api);
      console.log({result: result.data.user});
      if (result.data.success) {
        const data = result.data.user;
        setarrData(data);
        setLoading(false);
      } else {
        setLoading(false);
      }
    } catch (e) {
      setLoading(false);
      errorRes(e);
    }
  };

  useEffect(() => {
    userInfo_handle();
  }, []);

  toggleModalVisibility = isModalVisible => {
    setIsModalVisible(!isModalVisible);
  };

  handle_select = id => {
    setSelectedId(id);
  };

  const ItemView = ({item, index}) => {
    return (
      <View style={[st.row, st.mt15]}>
        <View style={st.wdh20}>
          <CardImg src={item?.user_image_path} />
        </View>
        <View style={st.wdh80}>
          <Text style={[st.tx16, st.color_S]}>{item.name}</Text>
          {item.members?.length - 1 > 0 ? (
            <Text style={st.tx12}>
              You, and {item.members?.length - 1} other
            </Text>
          ) : (
            <Text style={st.tx12}>You</Text>
          )}
        </View>
      </View>
    );
  };

  const toggleSwitch = (val, ind) => {
    const arr = [...listdata];
    arr[ind].status = val;
    setlistdata(arr);
  };

  const list_renderItem = ({item, index}) => {
    return (
      <View style={[st.row, st.mt15]}>
        <View style={st.wdh10}>
          <Image source={item.icon} />
        </View>
        <TouchableOpacity
          style={st.wdh80}
          onPress={() => {
            toggleModalVisibility(isModalVisible);
            handle_select(item.id);
          }}>
          <Text style={[st.tx16, st.color_S]}>{item.name}</Text>
        </TouchableOpacity>
        <View style={st.wdh10}>
          {item.status == true && (
            <Switch
              trackColor={{false: '#A6A6A6', true: colors.green}}
              thumbColor={colors.light}
              ios_backgroundColor="#3e3e3e"
              onValueChange={val => toggleSwitch(val, index)}
              value={item.status}
            />
          )}
        </View>
      </View>
    );
  };

  const onDate = date => {
    const d = new Date(date);
    return d.toDateString();
  };

  const renderItem_Image = ({item, index}) => {
    return <Image source={{uri: item.media}} style={styles.media_Sty} />;
  };

  return (
    <View style={st.flex}>
      <ProfileHeader onPress={() => navigation.goBack()} />
      <ScrollView style={st.flex}>
        <View style={[st.pd20, st.flex]}>
          <View style={[st.align_C, st.justify_C]}>
            <View style={styles.imgcontainer}>
              <Image
                source={images.avtar}
                style={styles.imgsty}
                tintColor={colors.light}
              />
            </View>
            <View style={[st.mt15, st.align_C]}>
              <Text style={[st.tx18, st.color_S]}>{arrdata?.name}</Text>
              <Text style={[st.tx16, st.color_B]}>{arrdata?.phone}</Text>
            </View>
          </View>

          <View>
            <Text style={st.tx14}>Media, links and docs</Text>
            <FlatList
              data={list}
              renderItem={renderItem_Image}
              horizontal
              contentContainerStyle={[st.pd_T10]}
            />
          </View>

          <View style={st.mt15}>
            <Text style={[st.tx16, st.color_S]}>Can’t talk, Text only.</Text>
            {arrdata?.dob&&<Text style={[st.tx14]}>{onDate(arrdata?.dob)}</Text>}
          </View>

          <View style={[st.ItemSeparatorView, st.mt15]} />

          <View>
            <Text style={[st.tx14, st.mt15]}>1 groups in common </Text>
            <FlatList
              data={arrdata?.commonGroups}
              renderItem={ItemView}
              keyExtractor={(item, index) => index.toString()}
            />
          </View>

          <View style={[st.ItemSeparatorView, st.mt15]} />

          <FlatList data={listdata} renderItem={list_renderItem} />
        </View>
      </ScrollView>

      <Modal
        animationType="slide"
        transparent
        visible={isModalVisible}
        presentationStyle="overFullScreen"
        onRequestClose={() => toggleModalVisibility(isModalVisible)}>
        <ActionModal
          onClose={() => toggleModalVisibility(isModalVisible)}
          Id={selectedId}
          userId = {route?.params?.id}
          title={
            selectedId == '2'
              ? 'Block Kristin Wastan?'
              : 'Block Kristin Wastan & Report?'
          }
          btn_title={selectedId == '2' ? 'Yes, Block' : 'Yes, Report'}
        />
      </Modal>
      {loading && <Loader />}
    </View>
  );
};

export default ViewProfile;

const styles = StyleSheet.create({
  imgcontainer: {
    backgroundColor: '#ccc',
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    width: 150,
    height: 150,
    borderRadius: 150 / 2,
  },
  imgsty: {
    width: 120,
    height: 120,
  },
  media_Sty: {
    height: 80,
    width: 80,
    borderRadius: 8,
    marginRight: 10,
  },
});

const list = [
  {
    id: 1,
    name: 'Mute notifications',
    status: true,
    icon: images.bell,
    media: 'https://www.w3schools.com/howto/img_avatar2.png',
  },
  {
    id: 2,
    name: 'Block Kristin Watson',
    status: false,
    icon: images.block,
    media: 'https://www.w3schools.com/howto/img_avatar2.png',
  },
  {
    id: 3,
    name: 'Report Kristin Watson',
    status: false,
    icon: images.report,
    media: 'https://www.w3schools.com/howto/img_avatar2.png',
  },
];
