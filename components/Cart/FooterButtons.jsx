import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import tw from 'twrnc'
import { useColors } from '../../common/Colors'

const FooterButtons = ({setModalVisible, totalCount, totalPrice }) => {
  const Colors = useColors()
  return (
    <TouchableOpacity
      onPress={() => setModalVisible(true)}
      style={tw`flex flex-row justify-self-end justify-around items-center rounded-xl py-4 w-80 bg-[${Colors.main}]`}>
      <Text style={styles.buttonText}>Оформить:</Text>
      <Text style={styles.buttonText}>{totalCount} шт.,</Text>
      <Text style={styles.buttonText}>{totalPrice} ₽</Text>
    </TouchableOpacity>
  )
}

export default FooterButtons

const styles = StyleSheet.create({
  buttonText: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  },
})