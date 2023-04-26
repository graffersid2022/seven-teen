import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import Header from '../../components/Header';
import st from '../../constant/styles';
import {images, colors} from '../../constant/Theme';
import CardImg from '../../components/CardImg';
import {API} from '../../utils/endpoints/EndPoints';
import {getApi, postApi} from '../../utils/apicalls/ApiCalls';
import {useSelector, useDispatch} from 'react-redux';
import {errorRes} from '../../utils/helper/helperFunctions';
import Loader from '../../components/Loader';
import moment from 'moment';

const CallDetails = ({navigation, route}) => {
  const [data, setData] = useState(route.params.item);

  const login_data = useSelector((state) => state.loginToken?.data);

  useEffect(() => {
    console.log({data:data?.data?.entities?.receiver?.entity})
  }, []);

 const durationFormet = () => {
    const date = new Date(0);
    date.setSeconds(24);
    const timeString = date.toISOString().substr(11, 8);
    console.log({timeString})
    return timeString;
  }

  const renderItem = ({item, index}) => {
    return (
      <View style={st.row}>
        <View style={[st.wdh10,st.justify_C]}>
          {item.status == 'ended' ? (
            <Image source={images.received} style={st.iconSty} />
          ) : (
            <Image source={images.missed} style={st.iconSty} />
          )}
        </View>
        <View style={st.wdh60}>
          {item?.data?.entities?.sender?.entity.uid == login_data?.data?.id && (
            <View>
              <Text style={[st.tx16, st.color_S]}>{'Outgoing Call'}</Text>
              <Text style={[st.tx12]} numberOfLines={1}>
                {moment.unix(data.initiatedAt).format('DD:MM:YYYY HH:MM')}
              </Text>
            </View>
          )}
          {item?.data?.entities?.receiver?.entity.uid == login_data?.data?.id && (
            <View>
            <Text style={[st.tx16, st.color_S]}>{'Incoming Call'}</Text>
            <Text style={[st.tx12]} numberOfLines={1}>
                {moment.unix(data.initiatedAt).format('DD:MM:YYYY HH:MM')}
              </Text>
            </View>
          )}
        </View>
        <View style={[st.wdh30,st.align_E]}>
          {item.status == 'ended' ? (
            <Text style={[st.tx16, st.color_S]} numberOfLines={1} >
              {durationFormet(data.duration)}
            </Text>
          ) : (
            <Text style={[st.tx14, st.color_S]}numberOfLines={1}>{'Not Answered'}</Text>
          )}
        </View>
      </View>
    );
  };

  const EmptyListMessage = ({}) => {
    return <View></View>;
  };

  const ListHeaderComponent = () => {
    if (login_data?.data?.id == data.senderMongoId) {
      return (
        <View>
          <View style={st.row}>
            <View style={st.wdh20}>
              <CardImg src={data?.senderImagePath} type="personal" />
            </View>
            <View style={[st.wdh60, st.justify_C]}>
              <Text style={[st.tx14, st.color_B, st.tx_m, st.txCap]}>
                {data?.data?.entities?.receiver?.entity.name}
              </Text>
              <View style={[st.row, st.align_C]}>
                {data.status == 'ended' ? (
                  <Image source={images.received} />
                ) : (
                  <Image source={images.missed} />
                )}
                <Text style={[st.tx12]} numberOfLines={1}>
                  {'  '}{' '}
                  {moment.unix(data.initiatedAt).format('DD:MM:YYYY HH:MM')}
                </Text>
              </View>
            </View>
            <View style={[st.wdh20, st.align_E, st.justify_C]}>
              {data?.type == 'audio' ? (
                <Image source={images.call} />
              ) : (
                <Image source={images.video} />
              )}
            </View>
          </View>
          <View style={[st.ItemSeparatorView, st.mrV15]} />
        </View>
      );
    }
    if (login_data?.data?.id == data.receiverrMongoId) {
      return (
        <View>
          <View style={st.row}>
            <View style={st.wdh20}>
              <CardImg src={data?.senderImagePath} type="personal" />
            </View>
            <View style={[st.wdh60, st.justify_C]}>
              <Text style={[st.tx14, st.color_B, st.tx_m, st.txCap]}>
                {data?.data?.entities?.sender?.entity.name}
              </Text>
              <View style={[st.row, st.align_C]}>
                {data.status == 'ended' ? (
                  <Image source={images.received} />
                ) : (
                  <Image source={images.missed} />
                )}
                <Text style={[st.tx12]} numberOfLines={1}>
                  {'  '}{' '}
                  {moment.unix(data.initiatedAt).format('DD:MM:YYYY HH:MM')}
                </Text>
              </View>
            </View>
            <View style={[st.wdh20, st.align_E, st.justify_C]}>
              {data?.type == 'audio' ? (
                <Image source={images.call} />
              ) : (
                <Image source={images.video} />
              )}
            </View>
          </View>
          <View style={[st.ItemSeparatorView, st.mrV15]} />
        </View>
      );
    }
  };

 const ItemSeparatorComponent = ({}) => {
    return <View style={st.ItemSeparatorView} />;
  };

  return (
    <View style={st.flex}>
      <Header
        title={''}
        tintColor={colors.light}
        color={colors.light}
        backgroundColor={colors.success}
        onPress={() => navigation.goBack()}
      />

      <View style={[st.pd20, st.flex]}>
        <FlatList
          data={[data]}
          renderItem={renderItem}
          ItemSeparatorComponent={ItemSeparatorComponent}
          ListEmptyComponent={EmptyListMessage}
          ListHeaderComponent={ListHeaderComponent}
          keyExtractor={(item) => item.conversationId}
        />
      </View>
      {/* {loading && <Loader />} */}
    </View>
  );
};

export default CallDetails;

