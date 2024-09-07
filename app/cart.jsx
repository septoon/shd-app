import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Link } from 'expo-router'
import tw from 'twrnc';

const Cart = () => {
  return (
    <View style={tw`pt-10`}>
      <Text>Cart</Text>
      <Link href="/menu" >Go to the Menu</Link>
    </View>
  )
}

export default Cart

const styles = StyleSheet.create({})