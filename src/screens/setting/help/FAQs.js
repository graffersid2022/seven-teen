import React, {Component} from 'react';
import {ScrollView, View} from 'react-native';
import Accordian from './components/Accordian';
import Header from '../../../components/Header';
import {colors, images} from '../../../constant/Theme';
import st from '../../../constant/styles';

export default class FAQs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menu: menu,
    };
  }

  render() {
    return (
      
        <View style={st.flex}>
          <Header
            title={'FAQs'}
            tintColor={colors.light}
            color={colors.light}
            backgroundColor={colors.success}
            onPress={() => this.props.navigation.goBack()}
          />
          <ScrollView>
          <View style={st.pd20}>{this.renderAccordians()}</View>
          </ScrollView>
        </View>
     
    );
  }

  renderAccordians = () => {
    const items = [];
    for (item of this.state.menu) {
      items.push(<Accordian title={item.title} data={item.data} />);
    }
    return items;
  };
}

const menu = [
  {
    title: 'What is 7Teen?',
    data: '7teen is greatest  chatting app platform in this century.',
  },
  {
    title: 'How to use 7Teen?',
    data: '7teen is greatest  chatting app platform in this century.',
  },
  {
    title: 'Is 7Teen safe for me?',
    data: '7teen is greatest  chatting app platform in this century.',
  },
  {
    title: 'How to send a message on 7Teen?',
    data: '7teen is greatest  chatting app platform in this century.',
  },
  {
    title: 'How to logout from 7Teen?',
    data: '7teen is greatest  chatting app platform in this century.',
  },
  {
    title: 'Is 7Teen free to use',
    data: '7teen is greatest  chatting app platform in this century.',
  },
];
