import {View, Image, StyleSheet, Text, FlatList, Modal} from 'react-native';
import React, {useState} from 'react';
import Header from '../../../components/Header';
import {colors, images} from '../../../constant/Theme';
import st from '../../../constant/styles';
import Accordian from '../../../components/Accordian';

const Help = ({navigation}) => {
  const [data, setData] = useState(array_data);

  renderItem = ({item, index}) => {
    return (
      <View>
        <Accordian item={item} navigation={navigation} index={index} />
      </View>
    );
  };

  ItemSeparatorComponent = ({}) => {
    return <View style={st.ItemSeparatorView} />;
  };

  return (
    <View style={st.flex}>
      <Header
        title={'Help'}
        tintColor={colors.light}
        color={colors.light}
        backgroundColor={colors.success}
        onPress={() => navigation.goBack()}
      />
      <View style={[st.pd20, st.flex]}>
        <FlatList
          data={data}
          renderItem={renderItem}
          ItemSeparatorComponent={ItemSeparatorComponent}
        />
      </View>
    </View>
  );
};

export default Help;

const array_data = [
  {id: 1, name: 'FAQs', screenName:'FAQs'},
  {id: 2, name: 'Terms & conditions', screenName:'Terms'},
  {id: 3, name: 'Privacy Policy', screenName:'Policy'},
  {id: 4, name: 'App Info', screenName:'Info'},
];
