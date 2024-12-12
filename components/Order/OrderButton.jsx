import { Text, TouchableOpacity } from 'react-native';
import React from 'react';
import tw from 'twrnc';
import { useColors } from '../../common/Colors';

const OrderButton = ({
  minDeliveryAmount,
  timeToValidate,
  isOrderTimeValid,
  handleOrder,
  orderType,
  isDeliveryTimeValid,
  deliveryStart,
  deliveryEnd,
  scheduleStart,
  scheduleEnd,
  totalWithDeliveryPrice,
  paid,
  isButtonDisabled,
  isDisabledMessage,
  totalPrice,
}) => {
  const Colors = useColors();

  // Безопасные проверки численных значений
  const safeDeliveryStart = Number.isFinite(Number(deliveryStart)) ? Number(deliveryStart) : 0;
  const safeDeliveryEnd = Number.isFinite(Number(deliveryEnd)) ? Number(deliveryEnd) : 24;
  const safeScheduleStart = Number.isFinite(Number(scheduleStart)) ? Number(scheduleStart) : 0;
  const safeScheduleEnd = Number.isFinite(Number(scheduleEnd)) ? Number(scheduleEnd) : 24;
  
  const safeTotalPrice = Number.isFinite(Number(totalPrice)) ? Number(totalPrice) : 0;
  const safeTotalWithDeliveryPrice = Number.isFinite(Number(totalWithDeliveryPrice))
    ? Number(totalWithDeliveryPrice)
    : safeTotalPrice;
  const safeMinDeliveryAmount = Number.isFinite(Number(minDeliveryAmount)) ? Number(minDeliveryAmount) : 0;

  const canDeliver = orderType === 'Доставка'
    ? isDeliveryTimeValid(timeToValidate, safeDeliveryStart, safeDeliveryEnd)
    : true;
    
  const canPickup = orderType === 'Самовывоз'
    ? isOrderTimeValid(timeToValidate, safeScheduleStart, safeScheduleEnd)
    : true;

  let buttonTextElement = null;

  if (orderType === 'Доставка' && !canDeliver) {
    buttonTextElement = (
      <Text style={tw`text-sm font-bold text-white`}>
        Доставка работает с {safeDeliveryStart}:00 до {safeDeliveryEnd}:00
      </Text>
    );
  } else if (orderType === 'Самовывоз' && !canPickup) {
    buttonTextElement = (
      <Text style={tw`text-sm font-bold text-white`}>
        Кафе работает с {safeScheduleStart}:00 до {safeScheduleEnd}:00
      </Text>
    );
  } else if (isDisabledMessage) {
    if (!paid && safeTotalPrice < safeMinDeliveryAmount) {
      buttonTextElement = (
        <Text style={tw`text-sm font-bold text-white`}>
          Минимальная сумма заказа {safeMinDeliveryAmount}₽
        </Text>
      );
    } else {
      buttonTextElement = (
        <Text style={tw`text-sm font-bold text-white`}>
          Есть незаполненные поля
        </Text>
      );
    }
  } else {
    // Нормальный сценарий
    buttonTextElement = (
      <>
        <Text style={tw`text-sm font-bold text-white`}>Заказать:</Text>
        <Text style={tw`text-sm font-bold text-white`}>
          {paid ? safeTotalWithDeliveryPrice : safeTotalPrice} ₽
        </Text>
      </>
    );
  }

  const buttonBgColor = isButtonDisabled
    ? isDisabledMessage
      ? Colors.red
      : Colors.lightSlateGray
    : Colors.main;

  return (
    <TouchableOpacity
      onPress={handleOrder}
      style={tw`rounded-lg py-4 w-[90%] shadow-xl absolute bottom-[4%] left-[5%] ml-auto mr-auto text-center flex justify-around flex-row items-center bg-[${buttonBgColor}]`}
    >
      {buttonTextElement}
    </TouchableOpacity>
  );
};

export default OrderButton;