import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import st from '../constant/styles';
import CardImg from './CardImg';
import {colors, images} from '../constant/Theme';
import {useSelector, useDispatch} from 'react-redux';
import moment from 'moment';

const Card = ({item, mode, type}) => {
  const login_data = useSelector(state => state.loginToken?.data);
  if(login_data?.data?.id== item?.senderMongoId)
  return (
    <View style={styles.container}>
      <View style={[st.row, st.align_C]}>
        <View style={styles.wdh20}>
          {!mode ? (
            <View style={item?.isOnline ? styles.imgBorder : null}>
              <CardImg src={item?.user_image_path} type={type} />
            </View>
          ) : (
            <CardImg src={item?.receiverImagePath} type="personal"  />
          )}
        </View>

        <View style={[styles.wdh60,st.justify_C]}>
          <Text style={[st.tx14, st.color_B, st.tx_m, st.txCap]}>{item?.data?.entities?.receiver?.entity.name}</Text>
          {!mode ? (
            item?.title&&<Text style={[st.tx10]} numberOfLines={1}>
              {item?.title}
            </Text>
          ) : (
            <View style={[st.row, st.align_C]}>
              {item.status == 'ended' ? (
                <Image source={images.received} />
              ) : (
                <Image source={images.missed} />
              )}
              <Text style={[st.tx12]} numberOfLines={1}>
                {'  '} {moment.unix(item.initiatedAt).format('DD:MM:YYYY HH:MM')}
              </Text>
            </View>
          )}
        </View>

        <View style={[styles.wdh20]}>
          {!mode ? (
            <View style={st.align_E}>
              <Text style={[st.tx10, st.txAlignR]}>{item?.lastSeen}</Text>
              {item?.unseenMsg != 0 && (
                <View style={styles.msgSeen}>
                  <Text style={[st.tx10, st.color_W]}>{item?.unseenMsg}</Text>
                </View>
              )}
              {item?.mute && (
                <Image
                  source={images.mute}
                  style={styles.mutesty}
                  tintColor={colors.warning}
                />
              )}
            </View>
          ) : (
            <View style={st.align_E}>
              {item?.type == 'audio' ? (
                // <TouchableOpacity onPress={() => alert('for audio call')}>
                  <Image source={images.call} />
                // </TouchableOpacity>
              ) : (
                // <TouchableOpacity onPress={() => alert('for video call')}>
                  <Image source={images.video} />
                // </TouchableOpacity>
              )}
            </View>
          )}
        </View>
      </View>
    </View>
  );

  if(login_data?.data?.id== item?.receiverrMongoId)
  return (
    <View style={styles.container}>
      <View style={[st.row, st.align_C]}>
        <View style={styles.wdh20}>
          {!mode ? (
            <View style={item?.isOnline ? styles.imgBorder : null}>
              <CardImg src={item?.user_image_path} type={type} />
            </View>
          ) : (
            <CardImg src={item?.senderImagePath} type="personal" />
          )}
        </View>

        <View style={[styles.wdh60,st.justify_C]}>
          <Text style={[st.tx14, st.color_B, st.tx_m, st.txCap]}>{item?.data?.entities?.sender?.entity.name}</Text>
          {!mode ? (
            item?.title&&<Text style={[st.tx10]} numberOfLines={1}>
              {item?.title}
            </Text>
          ) : (
            <View style={[st.row, st.align_C]}>
              {item.status == 'ended' ? (
                <Image source={images.received} />
              ) : (
                <Image source={images.missed} />
              )}
              <Text style={[st.tx12]} numberOfLines={1}>
                {'  '} {moment.unix(item.initiatedAt).format('DD:MM:YYYY HH:MM')}
              </Text>
            </View>
          )}
        </View>

        <View style={[styles.wdh20]}>
          {!mode ? (
            <View style={st.align_E}>
              <Text style={[st.tx10, st.txAlignR]}>{item?.lastSeen}</Text>
              {item?.unseenMsg != 0 && (
                <View style={styles.msgSeen}>
                  <Text style={[st.tx10, st.color_W]}>{item?.unseenMsg}</Text>
                </View>
              )}
              {item?.mute && (
                <Image
                  source={images.mute}
                  style={styles.mutesty}
                  tintColor={colors.warning}
                />
              )}
            </View>
          ) : (
            <View style={st.align_E}>
             {item?.type == 'audio' ? (
                // <TouchableOpacity onPress={() => alert('for audio call')}>
                  <Image source={images.call} />
                // </TouchableOpacity>
              ) : (
                // <TouchableOpacity onPress={() => alert('for video call')}>
                  <Image source={images.video} />
                // </TouchableOpacity>
              )}
            </View>
          )}
        </View>
      </View>
    </View>
  );
};

export default Card;

const styles = StyleSheet.create({
  container: {
    padding: 5,
  },
  wdh20: {
    width: '20%',
  },
  profilesty: {
    width: 30,
    height: 30,
  },
  profileContainer: {
    width: 50,
    height: 50,
    backgroundColor: '#ccc',
    justifyContent: 'center',
    borderRadius: 50 / 2,
  },
  wdh60: {
    width: '60%',
  },
  imgBorder: {
    borderWidth: 2,
    borderColor: '#00950F',
    width: 55,
    height: 55,
    backgroundColor: '#ccc',
    justifyContent: 'center',
    borderRadius: 55 / 2,
  },
  msgSeen: {
    borderRadius: 20 / 2,
    width: 20,
    height: 20,
    backgroundColor: colors.success,
    justifyContent: 'center',
    alignItems: 'center',
    // flex:1
  },
  mutesty: {
    width: 15,
    height: 15,
  },
});
