import {
  View,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  FlatList,
  Modal,
} from 'react-native';
import React, {useState} from 'react';
import Header from '../../../components/Header';
import {colors, images} from '../../../constant/Theme';
import st from '../../../constant/styles';
import Accordian from '../../../components/Accordian';
import Lable from '../../../components/Label';
import SimpleButton from '../../../components/SimpleButton';
import OutlineButton from '../../../components/OutlineButton';

const Account = ({navigation}) => {
  const [data, setData] = useState(array_data);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const toggleModalVisibility = isModalVisible => {
    setIsModalVisible(!isModalVisible);
  };

  renderItem = ({item, index}) => {
    return (
      <View>
        {item.id != 3 ? (
          <Accordian item={item} navigation={navigation} />
        ) : (
          <TouchableOpacity
            onPress={() => toggleModalVisibility(isModalVisible)}>
            <Accordian item={item} />
          </TouchableOpacity>
        )}
      </View>
    );
  };

  ItemSeparatorComponent = ({}) => {
    return <View style={st.ItemSeparatorView} />;
  };

  return (
    <View style={st.flex}>
      <Header
        title={'Account'}
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
      <Modal
        animationType="slide"
        transparent
        visible={isModalVisible}
        presentationStyle="overFullScreen"
        onRequestClose={toggleModalVisibility}>
        <View style={st.center}>
          <View style={st.modalView}>
            <Text style={[st.tx16, st.color_S, st.txAlignC]}>
              Are you sure you want to delete the account
            </Text>
            <Lable title={'We will verify first'} />
            <View style={[st.row, st.mt15]}>
              <View style={[styles.wdh50,st.mr15]}>
                <OutlineButton
                  title={'Cancel'}
                  onPress={() => toggleModalVisibility(isModalVisible)}
                />
              </View>
              <View style={[styles.wdh50]}>
                <SimpleButton
                  title={'Yes, Delete'}
                  onPress={() => toggleModalVisibility(isModalVisible)}
                />
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default Account;

const styles = StyleSheet.create({
  wdh50: {
    width: '48%',
  },
});

const array_data = [
  {id: 1, name: 'Privacy'},
  {id: 2, name: 'Change Number', screenName: 'ChangeNumber'},
  {
    id: 3,
    name: 'Delete My Account',
  },
];
