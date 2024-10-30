import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import tw from 'twrnc';
import { useColors } from '../../common/Colors';

const OrderButton = ({
  handleOrder,
  orderType,
  isDeliveryTimeValid,
  deliveryStart,
  deliveryEnd,
  scheduleStart,
  scheduleEnd,
  isButtonDisabled,
  isDisabledMessage,
  totalPrice,
  phoneNumber,
  address
}) => {
  const Colors = useColors();
  const isEmptyField = orderType === 'Доставка' && 
  return (
    <TouchableOpacity
      onPress={handleOrder}
      style={tw`rounded-lg p-3 w-[70%] shadow-xl absolute bottom-6 left-[15%] right-0 ml-auto mr-auto text-center flex justify-around flex-row items-center ${
        isButtonDisabled
          ? isDisabledMessage
            ? `bg-[${Colors.red}]`
            : `bg-[${Colors.lightSlateGray}]`
          : `bg-[${Colors.main}]`
      } `}>
      {orderType === 'Доставка' && !isDeliveryTimeValid(new Date(), deliveryStart, deliveryEnd) ? (
        <Text style={tw`text-xs font-bold text-white`}>
          Доставка работает с {deliveryStart}:00 до {deliveryEnd}:00
        </Text>
      ) : orderType === 'Самовывоз' && !isOrderTimeValid(new Date(), scheduleStart, scheduleEnd) ? (
        <Text style={tw`text-sm font-bold text-white`}>
          Кафе работает с {scheduleStart}:00 до {scheduleEnd}:00
        </Text>
      ) : isDisabledMessage ? (
        <>
          <Text style={tw`text-sm font-bold text-white`}>Есть незаполненные поля</Text>
        </>
      ) : (
        <>
          <Text style={tw`text-sm font-bold text-white`}>Заказать:</Text>
          <Text style={tw`text-sm font-bold text-white`}>{totalPrice} ₽</Text>
        </>
      )}
    </TouchableOpacity>
  );
};

export default OrderButton;

const styles = StyleSheet.create({});
