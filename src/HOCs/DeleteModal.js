import {StyleSheet, Text, View, Modal} from 'react-native';
import React, {useState, useEffect} from 'react';
import {colors} from '../constant/Theme';
import st from '../constant/styles';
import SimpleButton from '../components/SimpleButton';
import OutlineButton from '../components/OutlineButton';
import {API} from '../utils/endpoints/EndPoints';
import {getApi} from '../utils/apicalls/ApiCalls';
import {errorRes} from '../utils/helper/helperFunctions';
import {useSelector, useDispatch} from 'react-redux';
import Loader from '../components/Loader';
import Toast from 'react-native-simple-toast';
import {CometChat} from '@cometchat-pro/react-native-chat';

const DeleteModal = (WrappedComponent, propsitem) => {
  return (props) => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [loading, setLoading] = useState(false);
    const login_data = useSelector((state) => state.loginToken?.data);

    const deleteHistroy_handle = async () => {
      console.log('-----------call detele fun----------');
      const param = `userUid=${login_data?.data?.id}&messageid=${props?.item?.messageid}`;
      const api = API.CALL_HISTORY_DELETE + param;
      console.log({api});
      try {
        setLoading(true);
        const result = await getApi(api);
        console.log({result: result.data});
        if (result.data.success) {
          Toast.show(result.data.message);
          setLoading(false);
          props.callHistroy_handle()
          toggleModalVisibility();
        } else {
          setLoading(false);
          toggleModalVisibility();
        }
      } catch (e) {
        console.log('-------------44444444--------------------', e.data);
        setLoading(false);
        toggleModalVisibility();
        errorRes(e);
      }
    };

    const toggleModalVisibility = () => {
      setIsModalVisible(false);
    };

    return (
      <View>
        <WrappedComponent
          {...props}
          handleDelete={() => setIsModalVisible(!isModalVisible)}
        />

        <Modal
          animationType="slide"
          transparent
          visible={isModalVisible}
          presentationStyle="overFullScreen"
          onRequestClose={toggleModalVisibility}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              {login_data?.data?.id == props?.item?.senderMongoId && (
                <Text style={[st.tx18, st.txAlignC]}>
                  Delete, {props?.item?.data?.entities?.receiver?.entity.name}{' '}
                  call log history
                </Text>
              )}

              {login_data?.data?.id == props?.item?.receiverrMongoId && (
                <Text style={[st.tx18, st.txAlignC]}>
                  Delete, {props?.item?.data?.entities?.sender?.entity.name}{' '}
                  call log history
                </Text>
              )}

              <View style={styles.border} />
              <View style={st.mt15}>
                <View style={[st.justify_S, st.row]}>
                  <View style={[st.mr15, styles.wd48]}>
                    <OutlineButton
                      title={'Cancel'}
                      onPress={() => {
                        toggleModalVisibility();
                        console.log({props: props});
                      }}
                    />
                  </View>
                  <View style={styles.wd48}>
                    <SimpleButton
                      title={'Yes, Delete'}
                      onPress={() => {
                        console.log('deleteItem', props.item.messageid);
                        deleteHistroy_handle();
                      }}
                    />
                  </View>
                </View>
              </View>
            </View>
          </View>
        </Modal>

        {loading && <Loader />}
      </View>
    );
  };
};

export default DeleteModal;

const styles = StyleSheet.create({
  centeredView: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    width: '100%',
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 25,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  border: {
    height: 1,
    backgroundColor: colors.danger,
  },
  wd48: {
    width: '48%',
  },
});
