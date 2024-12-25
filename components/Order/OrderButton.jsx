import React, { useMemo } from 'react';
import { Text, TouchableOpacity } from 'react-native';
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

  // Мемоизация числовых значений
  const {
    safeDeliveryStart,
    safeDeliveryEnd,
    safeScheduleStart,
    safeScheduleEnd,
    safeTotalPrice,
    safeTotalWithDeliveryPrice,
    safeMinDeliveryAmount,
  } = useMemo(() => {
    return {
      safeDeliveryStart: Number.isFinite(Number(deliveryStart)) ? Number(deliveryStart) : 0,
      safeDeliveryEnd: Number.isFinite(Number(deliveryEnd)) ? Number(deliveryEnd) : 24,
      safeScheduleStart: Number.isFinite(Number(scheduleStart)) ? Number(scheduleStart) : 0,
      safeScheduleEnd: Number.isFinite(Number(scheduleEnd)) ? Number(scheduleEnd) : 24,
      safeTotalPrice: Number.isFinite(Number(totalPrice)) ? Number(totalPrice) : 0,
      safeTotalWithDeliveryPrice: Number.isFinite(Number(totalWithDeliveryPrice))
        ? Number(totalWithDeliveryPrice)
        : Number(totalPrice),
      safeMinDeliveryAmount: Number.isFinite(Number(minDeliveryAmount)) ? Number(minDeliveryAmount) : 0,
    };
  }, [deliveryStart, deliveryEnd, scheduleStart, scheduleEnd, totalPrice, totalWithDeliveryPrice, minDeliveryAmount]);

  // Логика доступности доставки/самовывоза
  const { canDeliver, canPickup } = useMemo(() => {
    return {
      canDeliver:
        orderType === 'Доставка'
          ? isDeliveryTimeValid(timeToValidate, safeDeliveryStart, safeDeliveryEnd)
          : true,
      canPickup:
        orderType === 'Самовывоз'
          ? isOrderTimeValid(timeToValidate, safeScheduleStart, safeScheduleEnd)
          : true,
    };
  }, [orderType, timeToValidate, isDeliveryTimeValid, isOrderTimeValid, safeDeliveryStart, safeDeliveryEnd, safeScheduleStart, safeScheduleEnd]);

  // Вычисление текста кнопки
  const buttonTextElement = useMemo(() => {
    if (orderType === 'Доставка' && !canDeliver) {
      return (
        <Text style={tw`text-sm font-bold text-white`}>
          Доставка работает с {safeDeliveryStart}:00 до {safeDeliveryEnd}:00
        </Text>
      );
    }
    if (orderType === 'Самовывоз' && !canPickup) {
      return (
        <Text style={tw`text-sm font-bold text-white`}>
          Кафе работает с {safeScheduleStart}:00 до {safeScheduleEnd}:00
        </Text>
      );
    }
    if (isDisabledMessage) {
      if (!paid && safeTotalPrice < safeMinDeliveryAmount && orderType === 'Доставка') {
        return (
          <Text style={tw`text-sm font-bold text-white`}>
            Минимальная сумма заказа {safeMinDeliveryAmount}₽
          </Text>
        );
      }
      return (
        <Text style={tw`text-sm font-bold text-white`}>
          Есть незаполненные поля
        </Text>
      );
    }
    return (
      <>
        <Text style={tw`text-sm font-bold text-white`}>Заказать:</Text>
        <Text style={tw`text-sm font-bold text-white`}>
          {paid ? safeTotalWithDeliveryPrice : safeTotalPrice} ₽
        </Text>
      </>
    );
  }, [
    orderType,
    canDeliver,
    canPickup,
    isDisabledMessage,
    paid,
    safeDeliveryStart,
    safeDeliveryEnd,
    safeScheduleStart,
    safeScheduleEnd,
    safeTotalPrice,
    safeTotalWithDeliveryPrice,
    safeMinDeliveryAmount,
  ]);

  // Цвет кнопки
  const buttonBgColor = useMemo(() => {
    return isButtonDisabled
      ? isDisabledMessage
        ? Colors.red
        : Colors.lightSlateGray
      : Colors.main;
  }, [isButtonDisabled, isDisabledMessage, Colors]);

  return (
    <TouchableOpacity
      onPress={handleOrder}
      style={tw`rounded-lg py-4 w-[90%] shadow-xl absolute bottom-[4%] left-[5%] ml-auto mr-auto text-center flex justify-around flex-row items-center bg-[${buttonBgColor}]`}
    >
      {buttonTextElement}
    </TouchableOpacity>
  );
};

export default React.memo(OrderButton);