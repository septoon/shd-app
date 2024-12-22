import React from 'react';
import { View, Text } from 'react-native';
import tw from 'twrnc';

const FlatListItems = React.memo(({ item, Colors }) => (
  <View style={tw`flex-row w-[90%] justify-between items-center`}>
    <Text style={tw`text-base font-bold text-[${Colors.darkModeText}]`}>{item.name}</Text>
    <Text style={tw`text-sm text-gray-500  text-[${Colors.darkModeText}]`}>
      {item.options ? `${item.serving} г.` : `${item.quantity} шт.`}
    </Text>
  </View>
));

export default FlatListItems;