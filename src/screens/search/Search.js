import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  FlatList,
  ScrollView,
} from 'react-native';
import React, {useState} from 'react';
import st from '../../constant/styles';
import {colors, images} from '../../constant/Theme';
import Card from '../../components/Card';
import {data} from '../../constant/data';

const Search = ({navigation}) => {
  const [search, setSearch] = useState('');
  const [filteredDataSource, setFilteredDataSource] = useState(data);
  const [masterDataSource, setMasterDataSource] = useState(data);
  const [selectedId, setSelectedId] = useState(null);
  const [items, setItems] = useState(arr);

  const searchFilterFunction = text => {
    if (text) {
      const newData = masterDataSource.filter(function (item) {
        const itemData = item.name ? item.name.toUpperCase() : ''.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilteredDataSource(newData);
      setSearch(text);
    } else {
      setFilteredDataSource(masterDataSource);
      setSearch(text);
    }
  };

  const ItemView = ({item}) => {
    return (
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('Messages', {
            username: item.name,
            picture: item.profilePic,
            isMuted: item.mute,
          })
        }>
        <Card item={item} />
      </TouchableOpacity>
    );
  };

  const ItemSeparatorView = () => {
    return <View style={st.ItemSeparatorView} />;
  };

  const EmptyListMessage = ({item}) => {
    return (
      <View style={[st.center, st.mt50]}>
        <LinearGradient
          colors={['#00FFE5', '#0078FF']}
          start={{x: 1, y: 0}}
          end={{x: 0, y: 0.5}}
          style={styles.listemptysty}>
          <Image source={images.check} />
        </LinearGradient>
        <Text style={[st.tx20, st.color_S, st.mt15]}>You haven't Chat yet</Text>
        <SimpleButton title={'Start Chatting'} onPress={() => alert('hi')} />
      </View>
    );
  };

  const handle_selected = index => {
    setSelectedId(index);
  };

  ItemViewCMD = ({item, index}) => {
    return (
      <TouchableOpacity
        style={[
          styles.box,
          {
            backgroundColor:
              selectedId != null
                ? selectedId != index
                  ? '#fff'
                  : colors.success
                : null,
          },
        ]}
        onPress={() => handle_selected(index)}>
        <Image
          source={item.icon}
          tintColor={
            selectedId != null
              ? selectedId != index
                ? colors.success
                : colors.light
              : null
          }
        />
        <Text
          style={[
            st.tx14,
            selectedId != null
              ? selectedId != index
                ? st.color_S
                : st.color_L
              : null,
          ]}>
          {'  '}
          {item.name}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={st.flex}>
      <View style={st.headersty}>
        <View style={st.wdh10}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image
              source={images.left}
              style={st.iconSty}
              tintColor={colors.light}
            />
          </TouchableOpacity>
        </View>
        <View style={st.wdh90}>
          <View style={st.search_icon}>
            <Image source={images.search} tintColor={colors.dark} />
          </View>
          <TextInput
            placeholder=""
            onChangeText={text => searchFilterFunction(text)}
            value={search}
            style={[st.SearchInput, st.tx14, st.color_B]}
          />
        </View>
      </View>
      <ScrollView style={st.flex}>
        <FlatList
          showsHorizontalScrollIndicator={false}
          horizontal={true}
          contentContainerStyle={[st.pd_H20]}
          renderItem={ItemViewCMD}
          data={items}
        />

        <FlatList
          contentContainerStyle={[st.pd20, st.flex]}
          data={filteredDataSource}
          ItemSeparatorComponent={ItemSeparatorView}
          renderItem={ItemView}
          keyExtractor={(item, index) => index.toString()}
          ListEmptyComponent={EmptyListMessage}
        />
      </ScrollView>
    </View>
  );
};

export default Search;

const styles = StyleSheet.create({
  box: {
    backgroundColor: colors.light,
    borderColor: colors.success,
    borderWidth: 1,
    borderRadius: 50,
    paddingHorizontal: 10,
    paddingVertical: 4,
    marginTop: 10,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
    flexDirection: 'row',
  },
});

const arr = [
  {id: 1, name: 'All', icon: images.circle_check, status: false},
  {id: 2, name: 'Links', icon: images.links, status: false},
  {id: 3, name: 'Photos', icon: images.photos, status: false},
  {id: 4, name: 'Videos', icon: images.outlineVdo, status: false},
];
