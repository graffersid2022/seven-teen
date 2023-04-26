import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import Header from '../../components/Header';
import st from '../../constant/styles';
import CardImg from '../../components/CardImg';
import ImageUpload from '../../HOCs/ActionModal';
import {images, colors} from '../../constant/Theme';
import FloatingButton from '../../components/FloatingButton';
import LinearGradient from 'react-native-linear-gradient';
import {getPickerImageResp} from '../../utils/helper/helperFunctions';
import Animated, {
  useSharedValue,
  withSpring,
  withTiming,
  useAnimatedStyle,
} from 'react-native-reanimated';
import GroupNameInput from '../../components/GroupNameInput';
import {API} from '../../utils/endpoints/EndPoints';
import {getApi, postApi} from '../../utils/apicalls/ApiCalls';
import {useSelector} from 'react-redux';
import Loader from '../../components/Loader';
import Toast from 'react-native-simple-toast';
import {errorRes} from '../../utils/helper/helperFunctions';

const GroupName = ({navigation, route}) => {
  const [selectList, setselectList] = useState(route?.params?.list);
  const [attachments, setAttachments] = useState(null);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [groupName, setgroupName] = useState('');
  const height = useSharedValue(70);
  const [reply, setreply] = useState(false);
  const [loading, setLoading] = useState(false);

  const login_data = useSelector(state => state.loginToken?.data);

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

  const create_groupHandle = async () => {
    const data = selectList;
    const ids = [];
    for (let i = 0; data.length > i; i++) {
      let id = data[i]._id;
      ids.push(id);
    }
    const api = API.CREATE_GROUP;
    const params = {
      members: [...ids, login_data?.data?.id],
      admins: [login_data?.data?.id],
      creater: login_data?.data?.id,
      name: groupName.trim(),
    };
    if (groupName.trim()) {
      try {
        setLoading(true);
        const result = await postApi(api, params);
        if (result.data.success) {
          setLoading(false);
          console.log('group created success');
          navigation.navigate('Home');
          Toast.show(result.data.message);
        } else {
          Toast.show(result.data.message);
          setLoading(false);
        }
      } catch (e) {
        console.log(e);
        setLoading(false);
        errorRes(e);
      }
    } else {
      alert('Please enter the group name');
    }
  };

  const selectListItemView = ({item}) => {
    return (
      <View style={[st.mr15]}>
        <CardImg src={item.user_image_path} type={'personal'} />
        <LinearGradient
          colors={['#00FFE5', '#0078FF']}
          start={{x: 1, y: 0}}
          end={{x: 0, y: 0.5}}
          style={styles.cross_sty}>
          <Text style={[st.tx12, st.color_L]}>x</Text>
        </LinearGradient>
        <Text style={[st.tx12, {width: 50}]} numberOfLines={1}>
          {item.name}
        </Text>
      </View>
    );
  };

  const setAttachmentResp = res => {
    const imageResp = getPickerImageResp(res);
    setAttachments(imageResp);
  };

  const AttachmentWithImage = ImageUpload(
    ({handleImageUpload, ...props}) => (
      <View>
        <TouchableOpacity onPress={() => handleImageUpload()}>
          <Image
            source={!attachments ? images.users : {uri: attachments.uri}}
            style={styles.profile_img}
            tintColor={!attachments ? colors.light : null}
          />
        </TouchableOpacity>
      </View>
    ),
    setAttachmentResp,
    null,
  );

  return (
    <View style={[st.flex]}>
      <Header
        title={'New Group'}
        tintColor={colors.light}
        color={colors.light}
        backgroundColor={colors.success}
        onPress={() => navigation.goBack()}
      />
      <ScrollView contentContainerStyle={[st.flex, {flexDirection: 'column'}]}>
        <Text style={[st.tx14, st.pd_H20, st.pd_T10]}>Participents</Text>
        <FlatList
          contentContainerStyle={[st.pd20]}
          data={selectList}
          horizontal={true}
          renderItem={selectListItemView}
          keyExtractor={(item, index) => index.toString()}
        />
      </ScrollView>
      <View style={st.ItemSeparatorView} />

      <View style={[st.row, st.pd20]}>
        <View style={styles.wdh20}>
          <AttachmentWithImage />
        </View>
        <View style={styles.wdh80}>
          <GroupNameInput msg={text => setgroupName(text)} />
        </View>
      </View>
      <FloatingButton
        onPress={() => create_groupHandle()}
        floatImage={images.right}
        tintColor={'#fff'}
      />
      {loading && <Loader />}
    </View>
  );
};

export default GroupName;

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
    top: 35,
    left: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profile_img: {
    width: 60,
    height: 60,
    borderRadius: 60 / 2,
    justifyContent: 'center',
    backgroundColor: '#ccc',
  },
  emoji: {
    width: 20,
    height: 20,
    // position: 'absolute',
    // top: 25,
    // left: 20,
  },
  container: {
    justifyContent: 'center',
    backgroundColor: '#fff',
    flex: 1,
  },
});
