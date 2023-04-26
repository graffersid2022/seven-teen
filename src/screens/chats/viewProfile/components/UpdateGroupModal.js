import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import st from '../../../../constant/styles';
import SimpleButton from '../../../../components/SimpleButton';
import InputBox from '../../../../components/InputBox';
import {API} from '../../../../utils/endpoints/EndPoints';
import {putApi} from '../../../../utils/apicalls/ApiCalls';
import {errorRes} from '../../../../utils/helper/helperFunctions';
import Loader from '../../../../components/Loader';
const ActionModal = ({onClose, title, btn_title, data}) => {
  const [name, setName] = useState('');
  const [vname, setvName] = useState(true);
  const [loading, setLoading] = useState(false);

  const onPress_validation = () => {
    if (name.trim() == '') {
      name.trim() == '' ? setvName(false) : null;
    } else {
      UpdateGroup_handle();
    }
  };

  const UpdateGroup_handle = async () => {
    const api = API.GROUP_INFO +  data?.data?._id;
    const params = {
      members: data?.data?.members,
      admins: data?.data?.admins,
      name: name,
    };
    try {
        setLoading(true)
      const result = await putApi(api, params);
      console.log({result:result.data})
      if (result.data.success) {
        setLoading(false)
        alert(result.data.message)
        onClose();
      } else {
        setLoading(false)
        alert(result.data.message)
        onClose();
      }
    } catch (e) {
      setLoading(false)
      errorRes(e);
    }
  };

  return (
    <View style={st.flex}>
      <View style={st.center}>
        <View style={st.modalView_center}>
          <Text style={[st.tx14]}>{title}</Text>
          <View style={st.mt15}>
            <InputBox
              validation={vname}
              placeholder="Enter here"
              value={name}
              onChangeText={text => [setName(text), setvName(true)]}
            />
          </View>
          <View style={[st.mt15, st.align_C]}>
            <SimpleButton
              title={btn_title}
              onPress={() => onPress_validation()}
            />
          </View>
        </View>
      </View>
      {loading&&<Loader/>}
    </View>
  );
};

export default ActionModal;

const styles = StyleSheet.create({});
