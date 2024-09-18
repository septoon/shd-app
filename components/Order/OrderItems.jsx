import { FlatList, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import tw from 'twrnc';
import { Colors } from '../../common/Colors';

const DeliveryOrder = ({ items, totalCount, totalPrice, orderType }) => {

  const FlatListItems = ({ item }) => {
    return (
      <View style={tw`flex flex-row justify-between items-center px-4 mt-1`}>
        <View style={tw`flex flex-row justify-between w-[85%]`}>
          <Text style={tw`text-sm`}>{item.name}</Text>
          {item.options ? <Text>{item.serving * item.quantity}</Text> : <Text>x{item.quantity}</Text>}
        </View>
        <Text style={tw`text-sm font-bold`}>{item.price}₽</Text>
      </View>
    )
  };
  return (
    <View style={tw`w-full pt-4 px-2 pb-18 relative`}>
      <View style={tw`w-full h-50 rounded-lg py-4 bg-[${Colors.secondary}]`}>
        <FlatList data={items} renderItem={({item}) => <FlatListItems item={item}/>} />
      </View>
      {orderType === 'Доставка' ? (
        <>
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
        </>
      ) : (
        <View style={tw`w-full h-auto py-3 border rounded-lg`}>
          <Text style={tw`text-lg`}>Phone</Text>
          <View style={tw`border w-1/2 rounded-lg h-8`}></View>
          <Text style={tw`text-lg`}>Comment</Text>
          <View style={tw`border w-1/2 rounded-lg h-8`}></View>
        </View>
      )}

      <View
        style={tw`absolute bottom-0 left-0 right-0 m-0 flex justify-center items-center`}>
        <View style={tw` rounded-lg py-4 w-2/3 flex justify-around flex-row items-center bg-[${Colors.main}]`}>
          <Text style={tw`text-lg font-bold text-white`}>Заказать:</Text>
          <Text style={tw`text-lg font-bold text-white`}>{totalPrice} ₽</Text>
        </View>
      </View>
    </View>
  );
};

export default DeliveryOrder;

const styles = StyleSheet.create({});
