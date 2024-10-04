import { View, Text } from 'react-native'
import React from 'react'
import * as Device from 'expo-device';

export default function location() {
  return (
    <View>
      <Text> {Device.manufacturer}: {Device.modelName}</Text> 
        </View>
  )
}