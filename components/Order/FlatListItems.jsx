import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import tw from 'twrnc'

const FlatListItems = ({ item }) => {
  return (
    <View style={tw`flex flex-row justify-between items-center  mb-2 px-4 mt-1`}>
      <View style={tw`flex flex-row justify-between items-center w-[80%]`}>
        <Text style={tw`text-sm w-[74%]`} numberOfLines={1} ellipsizeMode='tail'>{item.name}</Text>
        {item.options ? (
          <Text style={tw`opacity-60 text-xs`}>{item.serving * item.quantity} г.</Text>
        ) : (
          <Text style={tw`opacity-60 text-xs`}>{item.price} x {item.quantity} шт.</Text>
        )}
      </View>
      <Text style={tw`text-sm font-semibold`}>{item.price * item.quantity}₽</Text>
    </View>
  );
};

export default FlatListItems

const styles = StyleSheet.create({})