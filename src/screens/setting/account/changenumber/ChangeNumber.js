import {StyleSheet, Image, View, ScrollView} from 'react-native';
import React from 'react';
import InputBox from '../../../../components/InputBox';
import st from '../../../../constant/styles';
import Label from '../../../../components/Label';
import Header from '../../../../components/Header';
import {colors, images} from '../../../../constant/Theme';
import SimpleButton from '../../../../components/SimpleButton';

const ChangeNumber = ({navigation}) => {
  return (
    <View style={st.flex}>
      <Header
        title={'Change Number'}
        tintColor={colors.light}
        color={colors.light}
        backgroundColor={colors.success}
        onPress={() => navigation.goBack()}
      />
      <ScrollView style={st.flex}>
        <View style={st.pd20}>
          <View>
            <Label title={'Old Number *'} />
            <View>
            <Image
              source={images.call}
              style={styles.inputIcon}
            />
            <InputBox placeholder={'Old number'} />
            </View>
          </View>

          <View style={st.mt15}>
            <Label title={'New Number *'} />
            <View>
            <Image
              source={images.call}
              style={styles.inputIcon}
            />
            <InputBox placeholder={'Enter new number'} />
            </View>
          </View>
        </View>
      </ScrollView>
      <View style={st.pd20}>
        <SimpleButton title={'Done'} />
      </View>
    </View>
  );
};

export default ChangeNumber;

const styles = StyleSheet.create({
  inputIcon: {
    width: 20,
    height: 20,
    position: 'absolute',
    left: 25,
    top: 24,
  },
});
