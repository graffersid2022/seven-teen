import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import Header from '../../components/Header';
import st from '../../constant/styles';
import {images, colors} from '../../constant/Theme';
import CardImg from '../../components/CardImg';
import {API} from '../../utils/endpoints/EndPoints';
import {getApi} from '../../utils/apicalls/ApiCalls';
import {useSelector, useDispatch} from 'react-redux';
import {errorRes} from '../../utils/helper/helperFunctions';
import Loader from '../../components/Loader';
import {environment} from '../../utils/Constant';
import {
  CometChatUserPresence,
  CometChatAvatar,
} from '../../cometchat-pro-react-native-ui-kit/CometChatWorkspace/src/components/Shared';
// const ChildContacts = ({navigation, route}) => {
class ChildContacts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      loading: false,
    };
  }

  componentDidMount() {
    this.getFriendsList();
  }

  getFriendsList = async () => {
    const api = API.CHILD_FRIENDLIST + this.props.route?.params?.id;
    try {
      const result = await getApi(api);
      // console.log({result: result.data.data});
      if (result.data.success) {
        this.setState({loading: false, data: result?.data?.data});
      } else {
        this.setState({loading: false});
      }
    } catch (e) {
      console.log(e);
      errorRes(e);
    }
  };

  renderItem = ({item, index}) => {
    if (this.props.route?.params?.parentId != item._id)
      return (
        <View style={[st.row, st.mrV15]}>
          <View style={st.wdh20}>
            {/* <CardImg src={item.user_image_path} type={'personal'} /> */}
            <View style={st.avatarsty}>
              <CometChatAvatar
                image={{
                  uri:
                    item.user_image_path &&
                    environment.IMG_URL + item.user_image_path,
                }}
                cornerRadius={22}
                borderColor={'#fff'}
                borderWidth={0}
                name={item.name}
              />
              <CometChatUserPresence
                status={item.status}
                cornerRadius={18}
                style={{top: 30}}
                borderColor={'#fff'}
                borderWidth={2}
              />
            </View>
          </View>
          <View style={[st.wdh60, st.justify_C]}>
            <Text style={[st.tx16, st.color_S, st.txCap]}>{item.name}</Text>
          </View>
          <View style={[st.wdh20, st.align_E, st.justify_C]}>
            <TouchableOpacity
              onPress={() =>
                this.props.navigation.navigate('ParentOfChild', {
                  name: item.name,
                  user_image_path: item.user_image_path,
                  parentId: item.parentId,
                })
              }>
              <Image source={images.arrow_right} />
            </TouchableOpacity>
          </View>
        </View>
      );
  };

  ItemSeparatorComponent = ({}) => {
    return <View style={st.ItemSeparatorView} />;
  };

  EmptyListMessage = ({item}) => {
    return (
      <View style={[st.center, {marginTop: '50%'}]}>
        <Text style={st.tx14}>Not found</Text>
      </View>
    );
  };

  render() {
    return (
      <View style={st.flex}>
        <Header
          title={this.props.route?.params?.name + ' contacts'}
          tintColor={colors.light}
          color={colors.light}
          backgroundColor={colors.success}
          onPress={() => this.props.navigation.goBack()}
        />

        <View style={[st.pd20, st.flex]}>
          <FlatList
            data={this.state.data}
            renderItem={this.renderItem}
            ItemSeparatorComponent={this.ItemSeparatorComponent}
            ListEmptyComponent={this.EmptyListMessage}
          />
        </View>
        {this.state.loading && <Loader />}
      </View>
    );
  }
}

export default ChildContacts;

const styles = StyleSheet.create({});
