import { FlatList, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import tw from 'twrnc'

const DeliveryOrder = () => {
  return (
    <View style={tw`w-full border pt-4 px-2 pb-18 relative`}>
      <View style={tw`w-full h-60 border rounded-lg`}>
        <FlatList />
      </View>
      <View style={tw`w-full h-auto py-3 border rounded-lg`}>
        <Text style={tw`text-lg font-bold`}>Total Count</Text>
        <Text style={tw`text-lg font-bold`}>Total Count</Text>
      </View>
      <View style={tw`w-full h-auto py-3 border rounded-lg`}>
        <Text style={tw`text-lg`}>Address</Text>
        <View style={tw`border w-1/2 rounded-lg h-8`}></View>
        <Text style={tw`text-lg`}>Phone</Text>
        <View style={tw`border w-1/2 rounded-lg h-8`}></View>
        <Text style={tw`text-lg`}>Comment</Text>
        <View style={tw`border w-1/2 rounded-lg h-8`}></View>
      </View>
      <View style={tw`border w-1/2 rounded-lg h-auto py-2`}>
        <Text style={tw`text-lg font-bold`}>Cart</Text>
        <Text style={tw`text-lg font-bold`}>Cash</Text>
      </View>
      <View style={tw`absolute bottom-6 border left-0 right-0 m-0 flex justify-center items-center`}>
      <View style={tw`border rounded-lg py-4 w-2/3 flex justify-center items-center`}>
        <Text style={tw`text-lg font-bold`}>Order</Text>
      </View>
      </View>
    </View>
  )
}

export default DeliveryOrder

const styles = StyleSheet.create({})