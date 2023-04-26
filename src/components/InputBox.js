// import React from 'react';
// import {View, TextInput} from 'react-native';
// import {colors} from '../constant/Theme';

// const InputBox = (props,{validation=true}) => {
//   return (
//     <View
//       style={[{
//         marginTop: 10,
//         borderColor: validation?'red':colors.danger,
//         borderWidth: 0.7,
//         borderRadius: 50,
//         paddingRight: 15,
//         paddingLeft: 50,
//       }]}>
//       <TextInput
//         underlineColorAndroid="transparent"
//         placeholder={props.placeholder}
//         placeholderTextColor={colors.warning}
//         keyboardType={props.keyboardType}
//         onChangeText={props.onChangeText}
//         returnKeyType={props.returnKeyType}
//         numberOfLines={props.numberOfLines}
//         defaultValue={props.defaultValue}
//         multiline={props.multiline}
//         onSubmitEditing={props.onSubmitEditing}
//         style={props.style}
//         blurOnSubmit={false}
//         value={props.value}
//       />
//     </View>
//   );
// };

// export default InputBox;

import React, {useState} from 'react';
import {StyleSheet, View, Text, TextInput} from 'react-native';
import st from '../constant/styles';
import {colors} from '../constant/Theme';

function InputBox({
  placeholder = 'placeholder',
  validation = true,
  onChangeText,
  value,
  disabled = false,
  language = false,
  ShowPassIcon = false,
  onSubmitEditing,
  defaultValue = '',
}) {
  const [focused, setFocus] = useState(false);
  const [showPass, setshowPass] = useState(ShowPassIcon);

  const row = language ? st.row_R : st.row;
  const RTL = language ? 'right' : 'left';

  return (
    <View>
      <View
        style={[
          {
            marginTop: 10,
            borderColor: colors.danger,
            borderWidth: 0.7,
            borderRadius: 50,
            paddingRight: 15,
            paddingLeft: 50,
            justifyContent:'center'
          },
          validation === true
            ? st.inputRoundgrey(focused)
            : st.inputRoundred(focused),
        ]}>
        <TextInput
          onSubmitEditing={onSubmitEditing}
          editable={!disabled}
          // returnKeyType="next"
          autoCapitalize="none"
          onChangeText={val => onChangeText(val)}
          onFocus={() => {
            setFocus(true);
          }}
          onBlur={() => {
            setFocus(false);
          }}
          secureTextEntry={showPass}
          value={value}
          defaultValue={defaultValue}
          placeholder={placeholder}
          placeholderTextColor="#999999"
          style={{
            fontSize: 12,
            // fontFamily: 'Lato-Regular',
            color: '#4F4F4F',
            textAlign: RTL,
            width: '90%',
          }}
        />
      </View>
    </View>
  );
}

export default InputBox;
