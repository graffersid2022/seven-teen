/* eslint-disable react/jsx-fragments */
/* eslint-disable react/no-did-update-set-state */
import React from 'react';
import {
  View,
  Text,
  TouchableWithoutFeedback,
  TextInput,
  FlatList,
  Platform,
  KeyboardAvoidingView,
  Keyboard,
} from 'react-native';
import {
  CometChatContextProvider,
  CometChatContext,
} from '../../cometchat-pro-react-native-ui-kit/CometChatWorkspace/src/utils/CometChatContext';
import Icon from 'react-native-vector-icons/Ionicons';

import { CometChatManager } from '../../cometchat-pro-react-native-ui-kit/CometChatWorkspace/src/utils/controller';

// import { UserListManager } from './controller';
import CometChatUserListItem from './CometChatUserListItem';
import style from '../../cometchat-pro-react-native-ui-kit/CometChatWorkspace/src/components/Users/CometChatUserList/styles';
import theme from '../../cometchat-pro-react-native-ui-kit/CometChatWorkspace/src/resources/theme';
import { logger } from '../../cometchat-pro-react-native-ui-kit/CometChatWorkspace/src/utils/common';
import * as enums from '../../cometchat-pro-react-native-ui-kit/CometChatWorkspace/src/utils/enums';
import { CometChat } from '@cometchat-pro/react-native-chat';
import DropDownAlert from '../../cometchat-pro-react-native-ui-kit/CometChatWorkspace/src/components/Shared/DropDownAlert';
import st from '../../constant/styles';
import {images, colors} from '../../constant/Theme';
import CardImg from '../../components/CardImg';
import {API} from '../../utils/endpoints/EndPoints';
import {getApi} from '../../utils/apicalls/ApiCalls';
import {errorRes} from '../../utils/helper/helperFunctions'
import Header from '../../components/Header';
import { environment } from '../../utils/Constant';
import {
  CometChatUserPresence,
  CometChatAvatar,
} from '../../cometchat-pro-react-native-ui-kit/CometChatWorkspace/src/components/Shared';
class CometChatUserList extends React.PureComponent {
  static contextType = CometChatContext;

  timeout;

  friendsOnly = false;

  decoratorMessage = 'Loading...';

  constructor(props) {
    super(props);

    this.state = {
      userList: [],
      selectedUser: null,
      textInputValue: '',
      textInputFocused: false,
      showSmallHeader: false,
      restrictions: null,
    };
    this.userListRef = React.createRef();
    this.textInputRef = React.createRef(null);
    this.theme = { ...theme, ...this.props.theme };
    this.currentLetter = '';
  }

  componentDidMount() {
    this.checkRestrictions();
    this.getParentList()
 
  }

  checkRestrictions = async () => {
    let context = this.contextProviderRef.state;
    let isUserSearchEnabled = await context.FeatureRestriction.isUserSearchEnabled();
    this.setState({ restrictions: { isUserSearchEnabled } });
  };

//   componentDidUpdate(prevProps) {
//     try {
//       if (this.state.textInputFocused) {
//         this.textInputRef.current.focus();
//       }
//       const previousItem = JSON.stringify(prevProps.item);
//       const currentItem = JSON.stringify(this.props.item);

//       if (previousItem !== currentItem) {
//         if (Object.keys(this.props.item).length === 0) {
//           this.userListRef.scrollTop = 0;
//           this.setState({ selectedUser: {} });
//         } else {
//           const userList = [...this.state.userList];

//           // search for user
//           const userKey = userList.findIndex(
//             (u) => u.uid === this.props.item.uid,
//           );
//           if (userKey > -1) {
//             const userObj = { ...userList[userKey] };
//             this.setState({ selectedUser: userObj });
//           }
//         }
//       }

//       // if user is blocked/unblocked, update userList in state
//       if (
//         prevProps.item &&
//         Object.keys(prevProps.item).length &&
//         prevProps.item.uid === this.props.item.uid &&
//         prevProps.item.blockedByMe !== this.props.item.blockedByMe
//       ) {
//         const userList = [...this.state.userList];

//         // search for user
//         const userKey = userList.findIndex(
//           (u) => u.uid === this.props.item.uid,
//         );
//         if (userKey > -1) {
//           const userObj = { ...userList[userKey] };
//           const newUserObj = {
//             ...userObj,
//             blockedByMe: this.props.item.blockedByMe,
//           };
//           userList.splice(userKey, 1, newUserObj);

//           this.setState({ userList });
//         }
//       }
//     } catch (error) {
//       logger(error);
//     }
//   }

//   componentWillUnmount() {
//     try {
//       this.UserListManager.removeListeners();
//       this.UserListManager = null;
//     } catch (error) {
//       logger(error);
//     }
//   }

  /**
   * Handle user updated from listener
   * @param user: user object
   */
  userUpdated = (user) => {
    try {
      const userList = [...this.state.userList];

      // search for user
      const userKey = userList.findIndex((u) => u.uid === user.uid);

      // if found in the list, update user object
      if (userKey > -1) {
        const userObj = { ...userList[userKey] };
        const newUserObj = { ...userObj, ...user };
        userList.splice(userKey, 1, newUserObj);

        this.setState({ userList });
      }
    } catch (error) {
      logger(error);
    }
  };

  /**
   * Handle on end reached of the list
   * @param
   */
  endReached = () => {
    this.getUsers();
  };

  /**
   * Handle click on the list item
   * @param
   */
  handleClick = (user) => {
    console.log({user})
    if (!this.props.onItemClick) return;
    this.props.onItemClick(user, CometChat.RECEIVER_TYPE.USER);
  };

  /**
   * Retrieve user from user list while searching
   * @param
   */
//   searchUsers = (val) => {
//     this.setState(
//       { textInputValue: val },

//       () => {
//         if (this.timeout) {
//           clearTimeout(this.timeout);
//         }

//         this.timeout = setTimeout(() => {
//           this.UserListManager = new UserListManager(val);
//           this.setState({ userList: [] }, () => this.getUsers());
//         }, 500);
//       },
//     );
//   };

  /**
   * Retrieve user list from sdk acc to logged in user
   * @param
   */
//   getUsers = () => {
//     new CometChatManager()
//       .getLoggedInUser()
//       .then(() => {
//         this.UserListManager.fetchNextUsers()
//           .then((userList) => {
//             if (userList.length === 0) {
//               this.decoratorMessage = 'No users found';
//             }
//             // console.log({userList})
//             this.setState({ userList: [...this.state.userList, ...userList] });
//           })
//           .catch((error) => {
//             const errorCode = error?.message || 'ERROR';
//             this.dropDownAlertRef?.showMessage('error', errorCode);
//             this.decoratorMessage = 'Error';
//             logger('[CometChatUserList] getUsers fetchNext error', error);
//           });
//       })
//       .catch((error) => {
//         const errorCode = error?.message || 'ERROR';
//         this.dropDownAlertRef?.showMessage('error', errorCode);
//         this.decoratorMessage = 'Error';
//         logger('[CometChatUserList] getUsers getLoggedInUser error', error);
//       });
//   };

  getParentList = async () => {
    const api = API.PARENT_OF_CHILD + this.props?.parentId;
    try {
      const result = await getApi(api);
      console.log({result: result.data.data});
      if (result.data.success) {
        this.setState({parentList: result?.data?.data});
      } else {
      }
    } catch (e) {
      console.log(e);
      errorRes(e);
    }
  };


  /**
   * Component for flatList item
   * @param
   * if item - sticky header
   * @returns Component with ContactAlphabet
   * if item - user
   * @returns UserListComponent
   */
  renderUserView = ({ item, index }) => {
    // if (item.header) {
    //   const headerLetter = item.value;
    //   return (
    //     <View style={style.contactAlphabetStyle} key={index}>
    //       <Text style={style.contactAlphabetTextStyle}>{headerLetter}</Text>
    //     </View>
    //   );
    // }

    const user = item.value;
    return (    
      <CometChatUserListItem
        theme={this.theme}
        user={item}
        selectedUser={this.state.selectedUser}
        clickHandler={this.handleClick}
      />
    );
  };

  /**
   * Return component for empty user list
   * @param
   */
  listEmptyContainer = () => {
    return (
      <View style={style.contactMsgStyle}>
        <Text
          style={[
            style.contactMsgTxtStyle,
            {
              color: `${this.theme.color.secondary}`,
            },
          ]}>
          {this.decoratorMessage}
        </Text>
      </View>
    );
  };

  /**
   * Return separator component
   * @param
   */
  itemSeparatorComponent = ({ leadingItem }) => {
    if (leadingItem.header) {
      return null;
    }
    return (
      <View
        style={[
          style.itemSeparatorStyle,
          {
            borderBottomColor: this.theme.borderColor.primary,
          },
        ]}
      />
    );
  };

  /**
   * Return header component with text input for search
   * @param
   */
  listHeaderComponent = () => {
    return (
      <View style={[style.contactHeaderStyle]}>
        {/* <Text style={style.contactHeaderTitleStyle}>Users</Text> */}
        {/* {this.state.restrictions?.isUserSearchEnabled ? (
          <TouchableWithoutFeedback
            onPress={() => this.textInputRef.current.focus()}>
            <View
              style={[
                style.contactSearchStyle,
                {
                  backgroundColor: `${this.theme.backgroundColor.grey}`,
                },
              ]}>
              <Icon name="search" size={18} color={this.theme.color.helpText} />
              <TextInput
                ref={this.textInputRef}
                autoCompleteType="off"
                value={this.state.textInputValue}
                placeholder="Search"
                placeholderTextColor={this.theme.color.textInputPlaceholder}
                onChangeText={this.searchUsers}
                onFocus={() => {
                  this.setState({ textInputFocused: true });
                }}
                onBlur={() => {
                  this.setState({ textInputFocused: false });
                }}
                clearButtonMode="always"
                numberOfLines={1}
                style={[
                  style.contactSearchInputStyle,
                  {
                    color: `${this.theme.color.primary}`,
                  },
                ]}
              />
            </View>
          </TouchableWithoutFeedback>
        ) : null} */}
        <View>
          <View style={[st.row, st.mt15]}>
            <View style={st.wdh20}>
              {/* <CardImg
                src={this.props.user_image_path}
                type={'personal'}
              /> */}
               <View style={st.avatarsty}>
            <CometChatAvatar
              image={{uri: this.props.user_image_path&&environment.IMG_URL+this.props.user_image_path}}
              cornerRadius={22}
              borderColor={'#fff'}
              borderWidth={0}
              name={this.props.name}
            />
            <CometChatUserPresence
              status={''}
              cornerRadius={18}
              style={{top: 30}}
              borderColor={'#fff'}
              borderWidth={2}
            />
          </View>
            </View>
            <View style={[st.wdh80, st.justify_C]}>
              <Text style={[st.tx16, st.color_S, st.txCap]}>
                {this.props.name}
              </Text>
            </View>
          </View>

          <View style={[st.ItemSeparatorView, st.mrV15]} />
          <Text style={st.tx12}>
            {this.props.name + ' parent contact'}
          </Text>
        </View>
      
      </View>
    );
  };

  /**
   * Check scroll value to enable small headers
   * @param
   */
  handleScroll = ({ nativeEvent }) => {
    if (nativeEvent.contentOffset.y > 35 && !this.state.showSmallHeader) {
      this.setState({
        showSmallHeader: true,
      });
    }
    if (nativeEvent.contentOffset.y <= 35 && this.state.showSmallHeader) {
      this.setState({
        showSmallHeader: false,
      });
    }
  };

  render() {
    const userList = [...this.state.userList];
    const userListWithHeaders = [];
    let headerIndices = [0];
    if (userList.length) {
      headerIndices = [];
      userList.forEach((user) => {
        const chr = user.name[0].toUpperCase();
        if (chr !== this.currentLetter) {
          this.currentLetter = chr;
          if (!this.state.textInputValue) {
            headerIndices.push(userListWithHeaders.length);
            userListWithHeaders.push({
              value: this.currentLetter,
              header: true,
            });
          }
          userListWithHeaders.push({ value: user, header: false });
        } else {
          userListWithHeaders.push({ value: user, header: false });
        }
      });
    }

    return (
      <CometChatContextProvider ref={(el) => (this.contextProviderRef = el)}>
        <TouchableWithoutFeedback
          onPress={() => {
            Keyboard.dismiss();
          }}>
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={style.contactWrapperStyle}>
            <View style={style.headerContainer}></View>
            <Header
              title={''}
              tintColor={colors.light}
              color={colors.light}
              backgroundColor={colors.success}
              onPress={() => this.props.navigation.goBack()}
            />
            {this.listHeaderComponent()}
            <FlatList
              data={this.state.parentList}
              renderItem={this.renderUserView}
            //   contentContainerStyle={{ flexGrow: 1 }}
              ListEmptyComponent={this.listEmptyContainer}
              ItemSeparatorComponent={this.itemSeparatorComponent}
            //   keyExtractor={(item, index) => item.uid + '_' + index}
            //   stickyHeaderIndices={
            //     Platform.OS === 'android' ? null : headerIndices
            //   }
            //   onScroll={this.handleScroll}
            //   onEndReached={this.endReached}
            //   onEndReachedThreshold={0.3}
            //   showsVerticalScrollIndicator={false}
            />
            <DropDownAlert ref={(ref) => (this.dropDownAlertRef = ref)} />
          </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
      </CometChatContextProvider>
    );
  }
}

export default CometChatUserList;
