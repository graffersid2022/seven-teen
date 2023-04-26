import React, {Component} from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  LayoutAnimation,
  Platform,
  UIManager,
  Image,
} from 'react-native';
// import Icon from "react-native-vector-icons/MaterialIcons";
import {colors, images} from '../../../../constant/Theme';
import st from '../../../../constant/styles';

export default class Accordian extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: props.data,
      expanded: false,
    };

    if (Platform.OS === 'android') {
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }
  }

  render() {
    const {expanded} = this.state
    return (
      <View>
        <TouchableOpacity
          ref={this.accordian}
          style={expanded?styles.row1:styles.row}
          onPress={() => this.toggleExpand(expanded)}>
          <Text style={[st.tx16, expanded?st.color_L:st.color_S]}>{this.props.title}</Text>
          <Image
            source={expanded ? images.arrow_up : images.arrow_down}
          />
       
        </TouchableOpacity>
        
        <View style={styles.parentHr} />
       

        {expanded && (
          <View style={styles.child}>
            <Text style={[st.tx12]}>{this.props.data}</Text>
          </View>
        )}
      </View>
    );
  }

  toggleExpand = (expanded) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    this.setState({expanded: !expanded});
  };
}

const styles = StyleSheet.create({
  title: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#fff',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    // height: 56,
    paddingVertical:8,
    paddingLeft: 25,
    paddingRight: 18,
    alignItems: 'center',
    borderWidth:0.8,
    borderColor: colors.warning,
    borderRadius:15,
    marginTop:15
  },
  row1:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical:8,
    // height: 56,
    paddingLeft: 25,
    paddingRight: 18,
    alignItems: 'center',
    borderWidth:0.8,
    borderColor: colors.warning,
    borderTopLeftRadius:15,
    borderTopRightRadius:15,
    marginTop:15,
    backgroundColor:colors.success
  },
  parentHr: {
    height: 0.5,
    color: '#fff',
    width: '100%',
  },
  child: {
    backgroundColor: colors.success,
    borderBottomLeftRadius:15,
    borderBottomRightRadius:15,
    paddingHorizontal: 25,
    paddingVertical:15,
    marginTop:-1
  },
});
