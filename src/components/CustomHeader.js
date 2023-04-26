import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import {colors, images} from '../constant/Theme';
import Bar from './StatusBar';
import st from '../constant/styles';
import {Menu, MenuItem, MenuDivider} from 'react-native-material-menu';
// import  Icon  from 'react-native-vector-icons/Fontisto';
import Toast from 'react-native-simple-toast';

const CustomHeader = ({gotoSetting, gotoGroup, gotoSearch, contactRefresh}) => {
  const [visible, setVisible] = useState(false);

  const hideMenu = () => {
    setVisible(false);
  };

  const showMenu = () => setVisible(true);

  return (
    <View>
      <Bar />
      <View style={styles.headersty}>
        <View style={styles.wdh50}>
          <Image source={images.home_logo} style={styles.imgsty} />
        </View>
        <View style={[styles.wdh50, st.justify_C]}>
          <View style={[st.row, st.justify]}>
            {/* <TouchableOpacity style={st.mr15} onPress={() =>contactRefresh()}>
              <Text style={st.tx14}>{"sync contacts"}</Text>
            </TouchableOpacity> */}

            <Menu
              style={{borderRadius: 20, padding: 5}}
              visible={visible}
              anchor={
                <TouchableOpacity onPress={showMenu}>
                  <Image source={images.menu} />
                </TouchableOpacity>
              }
              onRequestClose={hideMenu}>
              <MenuItem
                onPress={() => {
                  hideMenu();
                  gotoSetting();
                }}
                textStyle={[st.tx16, st.color_S]}>
                Settings
              </MenuItem>
              <MenuItem
                onPress={() => {
                  hideMenu();
                  contactRefresh();
                  Toast.show('The contact has been updated');
                }}
                textStyle={[st.tx16, st.color_S]}>
                Refresh Contact
              </MenuItem>
            </Menu>
          </View>
        </View>
      </View>
    </View>
  );
};

export default CustomHeader;

const styles = StyleSheet.create({
  headersty: {
    paddingHorizontal: 15,
    flexDirection: 'row',
    backgroundColor: colors.success,
    paddingVertical: 30,
  },
  wdh50: {
    width: '50%',
  },
  imgsty: {
    width: 50,
    height: 50,
  },
});
