import { Modal, Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { AntDesign } from '@expo/vector-icons'
import tw from 'twrnc'

const OrderDialog = ({modalVisible, setModalVisible}) => {

  return (
    <Modal
        animationType="slide"
        presentationStyle="pageSheet"
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}>
      <Pressable style={tw`absolute top-2 right-2 w-10 h-10`} onPress={() => setModalVisible(!modalVisible)} >
        <AntDesign name="closecircle" size={26} color="#20B2AA" style={tw`absolute top-2 right-2 shadow-black`} />
      </Pressable>
    </Modal>
  )
}

export default OrderDialog

const styles = StyleSheet.create({})