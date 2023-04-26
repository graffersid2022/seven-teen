import React from 'react';
import {View, StyleSheet, StatusBar} from 'react-native';

export default class Bar extends React.Component {
  render() {
    return (
      <StatusBar
        barStyle="light-content"
        translucent={true}
        backgroundColor="transparent"
      />
    );
  }
}

