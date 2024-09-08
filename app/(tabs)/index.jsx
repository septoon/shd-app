import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import tw from 'twrnc';

const Home = () => {
  return (
    <ScrollView style={styles.container} contentInsetAdjustmentBehavior="automatic">
    </ScrollView>
  )
}

export default Home

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',  // Цвет фона всего приложения
  },
});
