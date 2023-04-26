import React from 'react';
import {
  Animated,
  ImageBackground,
  View,
  StatusBar,
  Image,
  StyleSheet,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import effects from '../../../constant/Animation';
import {images} from '../../../constant/Theme';
import styles from '../../../constant/styles';
import {connect} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';

class Splash extends React.Component {
  constructor(props) {
    super(props);
    this.springValue = new Animated.Value(0.4);
    this.state = {
      loggedIn: null,
    };
  }

  spring() {
    Animated.spring(this.springValue, {
      toValue: 1,
      friction: 1,
    }).start();
  }

  performTimeConsumingTask = async () => {
    return new Promise((resolve) =>
      setTimeout(() => {
        resolve('result');
      }, 500),
    );
  };

  async componentDidMount() {
    const data = await this.performTimeConsumingTask();
    if (data !== null) {
      this.getToken();
    }
  }

  getToken = async () => {
    const data = this.props.token;
    const profile = this.props.profileComplete 
    console.log({data})
    
        console.log({profileCompleted: data?.data?.profileComplete, profile});
        if (data) {
          if (data?.data?.profileComplete || profile) {
            this.props.navigation.navigate('Home');
          } else {
            this.props.navigation.navigate('Profile');
          }
        } else {
          this.props.navigation.navigate('Intro');
        }
     
  };

  render() {
    return (
      <View style={styles.flex}>
        <StatusBar
          translucent
          backgroundColor="transparent"
          barStyle={'dark-content'}
        />
        <ImageBackground source={images.Splash} style={styles.flex}>
          <Animatable.View animation={effects.zoomIn} style={styles.center}>
            <Image
              source={images.logo}
              resizeMode="contain"
              style={mystyle.imgsty}
            />
          </Animatable.View>
        </ImageBackground>
      </View>
    );
  }
}

const mapStateToProps = (state) => ({
  token: state.loginToken?.data,
  profileComplete : state.profileComplete?.data
});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Splash);

const mystyle = StyleSheet.create({
  imgsty: {
    width: 250,
    height: 250,
  },
});
