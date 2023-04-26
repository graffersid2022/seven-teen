import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import Header from '../../components/Header';
import st from '../../constant/styles';
import {images, colors} from '../../constant/Theme';
import CardImg from '../../components/CardImg';
import {API} from '../../utils/endpoints/EndPoints';
import {getApi, postApi} from '../../utils/apicalls/ApiCalls';
import {useSelector, useDispatch} from 'react-redux';
import {errorRes} from '../../utils/helper/helperFunctions';
import Loader from '../../components/Loader';
import {connect} from 'react-redux';
import {
  CometChatUserPresence,
  CometChatAvatar,
} from '../../cometchat-pro-react-native-ui-kit/CometChatWorkspace/src/components/Shared';
import { environment } from '../../utils/Constant';
class Child extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      loading: false,
    };
  }

  componentDidMount() {
    this.childList_handle();
  }

  childList_handle = async () => {
    const api = API.GET_CHILD + this.props.login_data?.data.id;
    try {
      this.setState({loading: true});
      const result = await getApi(api);
      console.log({resultchild: result.data.data});
      if (result.status == 200) {
        const data = result.data;
        this.setState({loading: false, data: data.data});
      } else {
        this.setState({loading: false});
      }
    } catch (e) {
      console.log(e);
      this.setState({loading: false});
      errorRes(e);
    }
  };

  approved_Child = async childId => {
    const api = API.APPROVED_CHILD;
    const params = {
      userId: this.props?.login_data?.data?.id,
      childId: childId,
    };
    try {
      this.setState({loading: true});
      const result = await postApi(api, params);
      // console.log({result: result.data});
      if (result.status == 200) {
        Alert.alert(
          'Congrats',
          result.data.message,
          [
            {
              text: 'Ok',
              onPress: () => console.log('Yes Pressed'),
            },
          ],
          {cancelable: false},
        );
        this.childList_handle();
      }
    } catch (e) {
      this.setState({loading: false});
      errorRes(e);
    }
  };

  renderItem = ({item, index}) => {
    return (
      <View style={[st.row, st.mt15]}>
        <View style={st.wdh20}>
          {/* <CardImg src={item.user_image_path} type={'personal'} /> */}
          <View style={st.avatarsty}>
            <CometChatAvatar
              image={{uri: item.user_image_path&&environment.IMG_URL+item.user_image_path}}
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
        <View style={st.wdh50}>
          <Text style={[st.tx16, st.color_S, st.txCap]} numberOfLines={1}>
            {item.name}
          </Text>
          <Text style={[st.tx14]}>
            {item.phoneCountryCode} {item.phone}
          </Text>
        </View>
        <View style={[st.wdh30, st.align_E, st.justify_C]}>
          {item.isParentVerified ? (
            <TouchableOpacity
              onPress={() =>
                this.props.navigation.navigate('ChildContacts', {
                  name: item.name,
                  id: item._id,
                  parentId : item.parentId
                })
              }>
              <Image source={images.arrow_right} />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={styles.cnfmbtn}
              onPress={() => this.approved_Child(item._id)}>
              <Text style={[st.tx14, st.color_L]}>Confirm</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    );
  };

  ItemSeparatorComponent = ({}) => {
    return <View style={st.ItemSeparatorView} />;
  };

  EmptyListMessage = ({item}) => {
    return ( 
      <View style={[st.center,{marginTop:"50%"}]}>
      <Text style={st.tx14}>Not found</Text>
    </View>
    )
  }

  render() {
    return (
      <View style={st.flex}>
        <Header
          title={'My Childs'}
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

const mapStateToProps = state => ({
  login_data: state.loginToken?.data,
});

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Child);

const styles = StyleSheet.create({
  cnfmbtn: {
    justifyContent: 'center',
    backgroundColor: colors.success,
    paddingHorizontal: 10,
    borderRadius: 50,
    alignItems: 'center',
    paddingVertical: 5,
  },
});
