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
import {getApi, patchApi, putApi} from '../../../utils/apicalls/ApiCalls';
import Loader from '../../../components/Loader';
import {useSelector, useDispatch} from 'react-redux';
import GroupModal from './components/UpdateGroupModal';
import Toast from 'react-native-simple-toast';

const ViewProfile = ({navigation, route}) => {
  const [arrdata, setarrData] = useState();
  const [listdata, setlistdata] = useState(list);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [updateModalVisible, setUpdateModalVisible] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState('');
  const [admin, setAdmin] = useState(false);

  const login_data = useSelector(state => state.loginToken?.data);

  const groupInfo_handle = async () => {
    const api = API.GROUP_INFO + '/' + route?.params?.id;
    try {
      const result = await getApi(api);
      if (result.data.success) {
        const data = result.data;
        // console.log({data: data.name});
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
    setLoading(true);
    groupInfo_handle();
  }, []);

  useEffect(() => {
    groupInfo_handle();
  }, [groupInfo_handle]);

  const UpdateGroup_handle = async id => {
    const api = API.GROUP_INFO + arrdata?.data?._id;
    let params;
    if (id == '3') {
      params = {
        members: arrdata?.data?.members,
        admins: [...arrdata?.data?.admins, name._id],
        name: arrdata?.data?.name,
      };
    }
    console.log({params});
    try {
      setLoading(true);
      const result = await putApi(api, params);
      console.log({result: result.data.data});
      if (result.data.success) {
        setLoading(false);
        toggleModalVisibility(isModalVisible);
        Toast.show(result.data.message);
      } else {
        setLoading(false);
        toggleModalVisibility(isModalVisible);
        alert(result.data.message);
      }
    } catch (e) {
      setLoading(false);
      toggleModalVisibility(isModalVisible);
      errorRes(e);
    }
  };

  const toggleModalVisibility = isModalVisible => {
    setIsModalVisible(!isModalVisible);
  };

  const updateModalVisibility = updateModalVisible => {
    setUpdateModalVisible(!updateModalVisible);
  };

  const handle_select = async id => {
    // setSelectedId(id);
    const api = API.LEAVE_GROUP;
    const params = {
      memberId: id,
      groupId: arrdata?.data?._id,
    };
    console.log({api, params});
    try {
      setLoading(true);
      const result = await patchApi(api, params);
      console.log({result: result});
      if (result.data.success) {
        toggleModalVisibility(false);
        Toast.show(result.data.message);
        navigation.navigate('Home');
        setLoading(false);
      } else {
        setLoading(false);
        toggleModalVisibility(false);
        alert(result.data.message);
      }
    } catch (e) {
      setLoading(false);
      errorRes(e);
    }
  };

  const ItemView = ({item, index}) => {
    return (
      <TouchableOpacity
        activeOpacity={0.7}
        onLongPress={() => {
          toggleModalVisibility(isModalVisible);
          setName(item);
          const admin = arrdata?.data?.admins?.map((i, n) =>i == item._id)
          if(admin){
            setAdmin(admin)
          }
        }}
        style={[st.row, st.mt15]}>
        <View style={st.wdh20}>
          <CardImg src={item.user_image_path} />
        </View>
        <View style={st.wdh60}>
          <Text style={[st.tx16, st.color_S, st.txCap]}>{item.name}</Text>
          {login_data?.data?.id == item._id ? (
            <Text style={st.tx12}>{item.phone + ' (You)'}</Text>
          ) : (
            <Text style={st.tx12}>{item.phone}</Text>
          )}
        </View>
        <View style={[st.wdh20, st.align_E]}>
          {arrdata?.data?.admins?.map((i, n) => {
            return (
              i == item._id && (
                <View style={st.adminCon}>
                  <Text
                    style={[st.tx14, st.color_L]}
                    numberOfLines={1}
                    adjustsFontSizeToFit>
                    {i == item._id ? 'Admin' : null}
                    {setAdmin(true)}
                  </Text>
                </View>
              )
            );
          })}
        </View>
      </TouchableOpacity>
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
            // toggleModalVisibility(isModalVisible);
            handle_select(login_data?.data?.id);
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
              <View style={st.row}>
                <Text
                  style={[
                    st.tx18,
                    st.color_S,
                  ]}>{`${arrdata?.data?.name} `}</Text>
                <TouchableOpacity
                  onPress={() => updateModalVisibility(updateModalVisible)}>
                  <Image source={images.edit_alt} />
                </TouchableOpacity>
              </View>
              <Text style={[st.tx14]}>
                {onDate(arrdata?.data?.createdAt)}
                {` | created by ${arrdata?.data?.createrData?.name}`}
              </Text>
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

          <View style={[st.ItemSeparatorView, st.mt15]} />

          <View>
            <Text style={[st.tx14, st.mt15]}>
              {arrdata?.data?.userData?.length} participants{' '}
            </Text>
            <FlatList
              data={arrdata?.data?.userData}
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
        <View style={st.center}>
          <View style={st.modalView_center}>
            {groupConditions.map(i => {
              if(admin){
                return (
                  <Text
                    style={[st.tx16, st.color_S, st.mt15]}
                    onPress={() => {
                      if (i.id == '3') {
                        UpdateGroup_handle(i.id);
                      }
                      if (i.id == '4') {
                        handle_select(name._id);
                      }
                    }}>
                    {i.name} {name.name}
                  </Text>
                );
               }else{
                if(i.id != 3)
                return (
                  <Text
                    style={[st.tx16, st.color_S, st.mt15]}
                    onPress={() => {
                      if (i.id == '3') {
                        UpdateGroup_handle(i.id);
                      }
                      if (i.id == '4') {
                        handle_select(name._id);
                      }
                    }}>
                    {i.name} {name.name}
                  </Text>
                );
               }
            })}
          </View>
        </View>
      </Modal>

      <Modal
        animationType="slide"
        transparent
        visible={updateModalVisible}
        presentationStyle="overFullScreen"
        onRequestClose={() => updateModalVisibility(updateModalVisible)}>
        <GroupModal
          onClose={() => updateModalVisibility(updateModalVisible)}
          title={'Enter Group Name'}
          btn_title={'Save'}
          data={arrdata}
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
    name: 'Leave Group',
    status: false,
    icon: images.block,
    media: 'https://www.w3schools.com/howto/img_avatar2.png',
  },
  {
    id: 3,
    name: 'Report Group',
    status: false,
    icon: images.report,
    media: 'https://www.w3schools.com/howto/img_avatar2.png',
  },
];

const groupConditions = [
  {
    id: 1,
    name: 'Message',
  },
  {
    id: 2,
    name: 'View',
  },
  {
    id: 3,
    name: 'Make Group Admin',
  },
  {
    id: 4,
    name: 'Remove',
  },
];
