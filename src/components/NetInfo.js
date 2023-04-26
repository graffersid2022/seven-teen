import {View, Text} from 'react-native';
import React, {useEffect} from 'react';
import {useNetInfo} from '@react-native-community/netinfo';
import st from '../constant/styles';

const NetInfo = () => {
  const netInfo = useNetInfo();

  useEffect(() => {
    console.log(
      '------------------------------netconnection',
      netInfo.isConnected,
    );
  }, []);

  return (
    <View>
      {!netInfo.isConnected && (
        <View style={[{backgroundColor: 'red'}, st.pd_V10]}>
          <Text style={[st.tx14, st.txAlignC, st.color_W]}>
            {"Connect to the internet, You're offline"}
          </Text>
        </View>
      )}
    </View>
  );
};

export default NetInfo;
