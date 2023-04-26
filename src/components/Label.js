import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import styles from '../constant/styles'

const Label = ({title}) => {
  return (
    <View>
      <Text style={styles.tx14}>{title}<Text style={{color:'red'}}>{" *"}</Text></Text>
    </View>
  )
}

export default Label

