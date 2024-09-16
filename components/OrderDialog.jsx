import { Modal, Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { AntDesign } from '@expo/vector-icons'
import tw from 'twrnc'
import SlideButton from './SlideButton'

const OrderDialog = ({modalVisible, setModalVisible}) => {

  return (
    <Modal
      style={tw`w-full h-full`}
      animationType="slide"
      presentationStyle="pageSheet"
      visible={modalVisible}
      onBackdropPress={() => setModalVisible(false)}
      onRequestClose={() => setModalVisible(false)}
    >
      <View style={tw`flex flex-row items-center justify-between h-16 px-2`}>
        <View style={tw`w-8 h-8`}></View>
        <Text style={tw`text-lg font-bold`}>Оформление заказа</Text>
      <Pressable style={tw`w-8 h-8 mt-2`} onPress={() => setModalVisible(!modalVisible)} >
        <AntDesign name="closecircle" size={26} color="#20B2AA" style={tw`shadow-black`} />
      </Pressable>
      </View>
      <View style={tw``}>
        <SlideButton /> 
      </View>
      
    </Modal>
  )
}

export default OrderDialog

const styles = StyleSheet.create({})