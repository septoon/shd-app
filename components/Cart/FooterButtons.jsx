import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { MaterialIcons } from '@expo/vector-icons'
import tw from 'twrnc'
import { useColors } from '../../common/Colors'

const FooterButtons = ({setModalVisible, navigation, totalCount, totalPrice }) => {
  const Colors = useColors()
  return (
    <View style={tw`absolute bottom-2 left-4 right-4 h-14 flex flex-row justify-between`}>
      <TouchableOpacity
        style={[styles.button, tw` w-14 h-14 rounded-full bg-[${Colors.darkModeInput}]`]}
        onPress={() => navigation.navigate('index')}>
        <MaterialIcons name="arrow-back-ios" style={tw`w-4`} size={24} color="white" />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => setModalVisible(true)}
        style={tw`flex flex-row justify-around items-center rounded-xl py-4 w-70 bg-[${Colors.main}]`}>
        <Text style={styles.buttonText}>Оформить:</Text>
        <Text style={styles.buttonText}>{totalCount} шт.,</Text>
        <Text style={styles.buttonText}>{totalPrice} ₽</Text>
      </TouchableOpacity>
    </View>
  )
}

export default FooterButtons

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
    elevation: 3,
  },
  buttonText: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  },
})