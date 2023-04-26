import {
  Animated,
  View,
  TouchableOpacity,
  StyleSheet,
  Text,
  BackHandler,
  Alert,
} from 'react-native';
import React, {useEffect} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import st from '../constant/styles';
import {colors} from '../constant/Theme';

export function MyTabBar({state, descriptors, navigation, position}) {
  
  return (
    <View style={styles.tabsty}>
      {state.routes.map((route, index) => {
        const {options} = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          console.log('tabprees====>', route.name);
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            // The `merge: true` option makes sure that the params inside the tab screen are preserved
            navigation.navigate({name: route.name, merge: true});
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        const inputRange = state.routes.map((_, i) => i);
        const opacity = position.interpolate({
          inputRange,
          outputRange: inputRange.map(i => (i === index ? 1 : 0.5)),
        });

        return !isFocused ? (
          <TouchableOpacity
            accessibilityRole="button"
            accessibilityState={isFocused ? {selected: true} : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={{
              flex: 1,
            }}>
            <Animated.Text
              style={[
                st.tx16,
                st.txAlignC,
                {
                  color: isFocused ? '#fff' : '#000',
                },
              ]}>
              {label}
            </Animated.Text>
          </TouchableOpacity>
        ) : (
          <LinearGradient
            colors={['#0078FF', '#00FFE5']}
            start={{x: 0, y: 1}}
            end={{x: 1, y: 0}}
            style={[st.flex, {borderRadius: 50}]}>
            <TouchableOpacity
              accessibilityRole="button"
              accessibilityState={isFocused ? {selected: true} : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarTestID}
              onPress={onPress}
              onLongPress={onLongPress}
              style={{
                flex: 1,
                justifyContent: 'center',
              }}>
              {label == 'Chats' ? (
                <View style={[st.row, st.justify_C]}>
                  <Animated.Text
                    style={[
                      st.tx16,
                      st.txAlignC,
                      {
                        color: isFocused ? '#fff' : '#000',
                      },
                    ]}>
                    {label}
                    {'  '}
                  </Animated.Text>
                  {/* <View style={styles.number}>
                    <Text style={[st.tx14, st.color_L]} adjustsFontSizeToFit>
                      {'3'}
                    </Text>
                  </View> */}
                </View>
              ) : (
                <Animated.Text
                  style={[
                    st.tx16,
                    st.txAlignC,
                    {
                      color: isFocused ? '#fff' : '#000',
                    },
                  ]}>
                  {label}
                </Animated.Text>
              )}
            </TouchableOpacity>
          </LinearGradient>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  tabsty: {
    flexDirection: 'row',
    marginHorizontal: 20,
    backgroundColor: '#fff',
    borderRadius: 50,
    height: 40,
    elevation: 1,
    borderColor: '#ccc',
    borderWidth: 0.5,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.8,
    shadowRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  number: {
    padding: 2,
    backgroundColor: colors.success,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
    width: 25,
    height: 25,
  },
});
