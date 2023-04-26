// import React from 'react';
// import {Dimensions, StyleSheet, View, Image, Text} from 'react-native';
// import SimpleButton from '../components/SimpleButton';

// class ErrorBoundary extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {hasError: false};
//   }

//   static getDerivedStateFromError(error) {
//     return {hasError: true};
//   }

//   componentDidCatch(error, errorInfo) {

//   }

//   renderFallbackUI = () => {
//     return (
//       <>
//         <View style={styles.cont}>
//           <Image
//             source={require('../images/general_error.png')}
//             style={styles.img}
//           />
//           <Text>Some Error Occured! Please try again</Text>
//           <View style={styles.btnCont}>
//             <SimpleButton
//               titleStyle={styles.btn}
//               onPress={() =>
//                 this.setState({
//                   hasError: false,
//                 })
//               }
//               title={'Retry'}
//             />
//           </View>
//         </View>
//       </>
//     );
//   };

//   render() {
//     const RenderFallbackUI = this.renderFallbackUI;

//     console.log({hasError: this.state.hasError});

//     if (this.state.hasError) {
//       // You can render any custom fallback UI
//       return <RenderFallbackUI />;
//       // return <Text>Something is wrong</Text>;
//     }

//     return this.props.children;
//   }
// }

// export default ErrorBoundary;

const styles = StyleSheet.create({
  cont: {
    flex: 1,
    alignItems: 'center',
  },
  img: {
    width: '100%',
    height: Dimensions.get('window').height * 0.6,
    // alignSelf: 'center',
    resizeMode: 'contain',
  },
  btnCont: {
    width: '30%',
    alignSelf: 'center',
    marginTop: 10,
  },
  btn: {
    marginTop: 5,
    // fontSize: fonts.fontSize.semiLarge,
    // fontFamily: fonts.family.fontRegular,
  },
});

import React, {Component} from 'react';
import {View, Text, Image, StyleSheet, Dimensions} from 'react-native';

export default class ErrorBoundries extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hasError: false,

      error: '',

      errorInfo: '',
    };
  }

  static getDerivedStateFromError(error) {
    return {hasError: true};
  }

  componentDidCatch(error, errorInfo) {
    //   console.log('Error: ' + error);

    //   console.log('Error Info: ' + JSON.stringify(errorInfo));

    this.setState({
      error: error,

      errorInfo: errorInfo,
    });
  }

  render() {
    if (this.state.hasError) {
      return (
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Image
            source={require('../images/general_error.png')}
            style={styles.img}
          />
          <Text>Oops!!! Something went wrong..</Text>
        </View>
      );
    }

    return this.props.children;
  }
}
