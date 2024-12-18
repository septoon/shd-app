import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import tw from 'twrnc';

const FooterButtons = React.memo(({ setModalVisible, totalCount, totalPrice, items }) => {
  if (items.length === 0) return <></>
  return (
    <TouchableOpacity
      onPress={() => setModalVisible(true)}
      style={tw`flex-row justify-between items-center bg-blue-500 p-4 rounded-lg m-4`}
    >
      <Text style={tw`text-white font-bold`}>Оформить</Text>
      <Text style={tw`text-white font-bold`}>{totalCount} шт.</Text>
      <Text style={tw`text-white font-bold`}>{totalPrice} ₽</Text>
    </TouchableOpacity>
  )
});

export default FooterButtons;