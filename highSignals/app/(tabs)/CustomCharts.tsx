import React from 'react'
import { Text, View } from 'react-native'

export default function CustomCharts() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#0a192f',
      }}
    >
      <Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold' }}>
        Custom Charts Screen
      </Text>
    </View>
  )
}
