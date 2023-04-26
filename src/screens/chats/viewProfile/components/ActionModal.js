import {StyleSheet, Text, View} from 'react-native';
import React,{useEffect,useState} from 'react';
import st from '../../../../constant/styles';
import SimpleButton from '../../../../components/SimpleButton';
import OutlineButton from '../../../../components/OutlineButton';
import {API} from '../../../../utils/endpoints/EndPoints';
import {errorRes} from '../../../../utils/helper/helperFunctions';
import {patchApi} from '../../../../utils/apicalls/ApiCalls';
import Loader from '../../../../components/Loader';

const ActionModal = ({onClose, title, btn_title, Id, userId}) => {
  const [loading, setLoading] = useState(false)

  const block_user = async id => {
    const api = API.BLOCK_USER + id;
    try {
      setLoading(true)
      const result = await patchApi(api);
      console.log({result: result.data});
      if (result.data.success) {
        setLoading(false)
        alert(result.data.message);
        onClose();
      } else {
        setLoading(false)
        alert(result.data.message);
        onClose();
      }
    } catch (e) {
      setLoading(false)
      onClose();
      errorRes(e);
    }
  };

  return (
    <View style={st.flex}>
      <View style={st.center}>
        <View style={st.modalView}>
          <Text style={[st.tx18, st.color_S, st.txAlignC]}>{title}</Text>

          <View style={st.mt15}>
            <View style={[st.justify_S, st.row]}>
              <View style={[st.mr15, styles.wd48]}>
                <OutlineButton title={'Cancel'} onPress={() => onClose()} />
              </View>
              <View style={styles.wd48}>
                <SimpleButton
                  title={btn_title}
                  onPress={() => {
                    if (Id == 2) {
                      block_user(userId);
                    } else {
                      onClose();
                    }
                  }}
                />
              </View>
            </View>
          </View>
        </View>
      </View>
      {loading&&<Loader/>}
    </View>
  );
};

export default ActionModal;

const styles = StyleSheet.create({});
