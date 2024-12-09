import { Text, TouchableOpacity } from 'react-native';
import React from 'react';
import tw from 'twrnc';
import { useColors } from '../../common/Colors';

const OrderButton = ({
  handleOrder,
  isButtonDisabled,
  totalPrice
}) => {
  const Colors = useColors();
  
  return (
<TouchableOpacity
  onPress={handleOrder}
  style={tw`rounded-lg py-4 w-[90%] shadow-xl absolute bottom-[4%] left-[5%] right-0 ml-auto mr-auto flex justify-around flex-row items-center ${isButtonDisabled ? `bg-[${Colors.lightSlateGray}]` : `bg-[${Colors.main}]`}`}
>
  <Text style={tw`text-sm font-bold text-white`}>Заказать:</Text>
  <Text style={tw`text-sm font-bold text-white`}>{totalPrice}</Text>
</TouchableOpacity>
  );
};

export default OrderButton;
