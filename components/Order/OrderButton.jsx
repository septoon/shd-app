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
  
  return (
    <TouchableOpacity
      onPress={handleOrder}
      style={tw`rounded-lg py-4 w-[90%] shadow-xl absolute bottom-[4%] left-[5%] right-0 ml-auto mr-auto text-center flex justify-around flex-row items-center ${isButtonDisabled ? isDisabledMessage ? `bg-[${Colors.red}]` : `bg-[${Colors.lightSlateGray}]` : `bg-[${Colors.main}]`} `}>
        {
          orderType === 'Доставка' && !isDeliveryTimeValid(timeToValidate, deliveryStart, deliveryEnd)
            ? <Text style={tw`text-sm font-bold text-white`}>Доставка работает с {deliveryStart}:00 до {deliveryEnd}:00</Text>
            : orderType === 'Самовывоз' && !isOrderTimeValid(timeToValidate, scheduleStart, scheduleEnd) ? (
              <Text style={tw`text-sm font-bold text-white`}>Кафе работает с {scheduleStart}:00 до {scheduleEnd}:00</Text>
            ) : isDisabledMessage ? (
              <>
                <Text style={tw`text-sm font-bold text-white`}>{!paid  ? `Минимальная сумма заказа ${minDeliveryAmount}₽` : 'Есть незаполненные поля'}</Text>
              </>
            ) : (
              <>
                <Text style={tw`text-sm font-bold text-white`}>Заказать:</Text>
                <Text style={tw`text-sm font-bold text-white`}>{paid ? totalWithDeliveryPrice :totalPrice} ₽</Text>
              </>
            )
        }
    </TouchableOpacity>
  );
};

export default OrderButton;
