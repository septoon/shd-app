import { Modal, StyleSheet, Text, View, Pressable, TouchableOpacity } from 'react-native';
import React from 'react';
import { AntDesign } from '@expo/vector-icons';
import tw from 'twrnc';
import { useColors } from '../../common/Colors';
import { useDispatch } from 'react-redux';
import { addOrderToHistory } from '../../redux/Features/cart/orderHistorySlice';

const OrderFinish = ({
  orderValues,
  shortDate,
  shortTime,
  finishVisible,
  setFinishVisible,
  setModalVisible,
}) => {
  const Colors = useColors();
  const dispatch = useDispatch()
  const {
    orderType,
    address,
    phoneNumber,
    comment,
    items = [],
    paid,
    totalPrice,
    totalWithDeliveryPrice,
    pay,
    checked,
  } = orderValues;
  
    const completedOrder = {
      ...orderValues,
      date: new Date().toISOString(),
    };

  const closeModals = () => {
    dispatch(addOrderToHistory(completedOrder))
    setFinishVisible(false);
    setModalVisible(false);
  };

  const textClassName = tw`mb-2 text-lg text-[${Colors.darkModeText}]`;

  return (
    <Modal
      animationType="slide"
      presentationStyle="pageSheet"
      visible={finishVisible}
      onRequestClose={closeModals}>
      <View style={tw`w-full h-full bg-[${Colors.darkModeBg}]`}>
        <View style={tw`flex flex-row items-center justify-between h-16 px-2`}>
          <View style={tw`w-8 h-8`} />
          <Text style={tw`text-lg font-bold text-[${Colors.darkModeText}]`}>Спасибо за заказ</Text>
          <Pressable style={tw`w-8 h-8 mt-2`} onPress={closeModals}>
            <AntDesign name="closecircle" size={26} color="#20B2AA" style={tw`shadow-black`} />
          </Pressable>
        </View>
        <View style={tw`w-full flex flex-col px-4 mt-5`}>
          <Text style={textClassName}>Тип заказа: {orderType}</Text>
          {orderType === 'Доставка' && (
            <>
              <Text style={textClassName}>Адрес: {address}</Text>
              <Text style={textClassName}>Способ оплаты: {pay ? pay : 'Не выбран'}</Text>
            </>
          )}
          <Text style={textClassName}>Номер телефона: {phoneNumber}</Text>
          <Text style={textClassName}>Комментарий: {comment ? comment : 'Не указан'}</Text>
          <Text style={textClassName}>Заказ:</Text>
          <View style={tw`my-5`}>
            {items.map((i) => (
              <Text key={i.id} style={tw`w-full text-sm text-[${Colors.darkModeText}]`}>
                {`${i.name} | ${i.price} ₽. | x ${i.quantity}${
                  typeof i.serving === 'number' ? '00г.' : 'шт.'
                }`}
              </Text>
            ))}
          </View>
          {paid ? (
            <Text style={tw`my-2 text-[${Colors.darkModeText}] underline`}>
              Сумма с учетом доставки: {totalWithDeliveryPrice} ₽
            </Text>
          ) : (
            <Text style={tw`my-2 text-[${Colors.darkModeText}] underline`}>
              Сумма: {totalPrice} ₽
            </Text>
          )}
          <Text style={textClassName}>Дата: {checked ? shortDate : 'Сегодня'}</Text>
          <Text style={textClassName}>Время: {checked ? shortTime : 'Ближайшее'}</Text>
        </View>
        <View style={tw`flex flex-row justify-between items-center mt-5 px-4 py-2`}>
          <Text style={tw`text-sm text-left w-full text-[${Colors.darkModeText}]`}>
            В течение 10-ти минут с вами свяжется оператор для подтверждения заказа.
          </Text>
        </View>
      </View>
    </Modal>
  );
};

export default OrderFinish;

const styles = StyleSheet.create({});
