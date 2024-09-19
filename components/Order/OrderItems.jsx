import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import tw from 'twrnc';
import { Colors } from '../../common/Colors';

const DeliveryOrder = ({ items, totalCount, totalPrice, orderType }) => {
  const FlatListItems = ({ item }) => {
    return (
      <View style={tw`flex flex-row justify-between items-center px-4 mt-1`}>
        <View style={tw`flex flex-row justify-between w-[85%]`}>
          <Text style={tw`text-sm`}>{item.name}</Text>
          {item.options ? (
            <Text>{item.serving * item.quantity}</Text>
          ) : (
            <Text>x{item.quantity}</Text>
          )}
        </View>
        <Text style={tw`text-sm font-bold`}>{item.price}₽</Text>
      </View>
    );
  };
  return (
    <View style={tw`absolute left-0 right-0 top-28 bottom-0 flex justify-between`}>
      <View>
        <View style={tw`w-full h-40 rounded-2xl py-4 bg-white`}>
          <FlatList data={items} renderItem={({ item }) => <FlatListItems item={item} />} />
        </View>
        {orderType === 'Доставка' ? (
          <>
            <View style={tw`w-full h-auto py-3 mt-6 px-4 bg-white rounded-2xl`}>
              <Text style={tw`text-lg`}>Адрес</Text>
              <View style={tw`bg-[${Colors.bgOrder}] w-1/2 rounded-lg h-8`}></View>
              <Text style={tw`text-lg`}>Номер телефона</Text>
              <View style={tw`bg-[${Colors.bgOrder}] w-1/2 rounded-lg h-8`}></View>
              <Text style={tw`text-lg`}>Комментарий</Text>
              <View style={tw`bg-[${Colors.bgOrder}] w-1/2 rounded-lg h-8`}></View>
            </View>
            <View style={tw`px-4 bg-white mt-6 rounded-2xl h-auto py-2`}>
              <Text style={tw`text-lg`}>Карта</Text>
              <Text style={tw`text-lg`}>Наличные</Text>
            </View>
          </>
        ) : (
          <View style={tw`w-full h-auto py-3 mt-6 px-4 bg-white rounded-2xl`}>
            <Text style={tw`text-lg`}>Номер телефона</Text>
            <View style={tw`bg-[${Colors.bgOrder}] w-1/2 rounded-lg h-8`}></View>
            <Text style={tw`text-lg`}>Комментарий</Text>
            <View style={tw`bg-[${Colors.bgOrder}] w-1/2 rounded-lg h-8`}></View>
          </View>
        )}
      </View>
      <View style={tw`flex px-4`}>
        <View style={tw`flex flex-row justify-between`}>
          <Text style={tw`font-bold`}>Итого:</Text>
          <Text style={tw`font-bold`}>{totalPrice}</Text>
        </View>
        <View style={tw`flex flex-row justify-between opacity-60 mt-1`}>
          <Text style={tw``}>Всего блюд:</Text>
          <Text style={tw``}>{totalCount}</Text>
        </View>
      </View>
      <View style={tw`bg-white py-6 rounded-2xl flex justify-center items-center`}>
        <Pressable
          style={tw` rounded-lg py-3 w-2/3 flex justify-around flex-row items-center bg-[${Colors.main}]`}>
          <Text style={tw`text-lg font-bold text-white`}>Заказать:</Text>
          <Text style={tw`text-lg font-bold text-white`}>{totalPrice} ₽</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default DeliveryOrder;

const styles = StyleSheet.create({});
