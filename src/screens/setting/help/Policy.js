import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import Header from '../../../components/Header';
import {colors, images} from '../../../constant/Theme';
import st from '../../../constant/styles';

const Policy = ({navigation}) => {
  const [data, setData] = useState(text);
  return (
    <View style={st.flex}>
      <Header
        title={'Privacy Policy'}
        tintColor={colors.light}
        color={colors.light}
        backgroundColor={colors.success}
        onPress={() => navigation.goBack()}
      />
      <View style={st.pd20}>
        <Text style={[st.tx16, {color:'#3A3A3A', lineHeight:30}]}>{data}</Text>
      </View>
    </View>
  );
};

export default Policy;

const styles = StyleSheet.create({});

const text =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mattis diam velit nunc, arcu urna, bibendum dignissim augue pulvinar. In rutrum metus, quis cras bibendum. Justo, gravida sollicitudin mauris fermentum, lacus orci. Molestie auctor pharetra morbi gravida phasellus dictum. Volutpat blandit dictum est id netus pulvinar etiam scelerisque non.Platea nibh pellentesque nunc egestas at in tortor blandit. Consectetur purus eget faucibus ac purus hendrerit curabitur augue facilisis. Tortor commodo eget elementum ipsum porta cursus. Mauris ullamcorper ullamcorper in sed lorem. Integer nisi, auctor feugiat eget sed. Eu vestibulum diam mauris tempor purus eu convallis ullamcorper in sed lorem. Integer nisi, auctor feugiat eget sed. Eu vestibulum diam mauris tempor purus eu convalli.';
