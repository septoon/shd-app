import { Modal, StyleSheet, Text, View, Pressable, TouchableOpacity } from 'react-native';
import React from 'react';
import { AntDesign } from '@expo/vector-icons';
import tw from 'twrnc';
import { useColors } from '../../common/Colors';

const OrderFinish = ({
  orderValues,
  shortDate,
  shortTime,
  finishVisible,
  setFinishVisible,
  setModalVisible,
}) => {
  const Colors = useColors();
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

  const closeModals = () => {
    setFinishVisible(false);
    setModalVisible(false);
  };

  return (
    <Modal
      animationType="slide"
      presentationStyle="pageSheet"
      visible={finishVisible}
      onRequestClose={closeModals}
    >
      <View style={tw`flex flex-row items-center justify-between h-16 px-2`}>
        <View style={tw`w-8 h-8`} />
        <Text style={tw`text-lg font-bold text-[${Colors.darkModeText}]`}>Заказ оформлен</Text>
        <Pressable style={tw`w-8 h-8 mt-2`} onPress={closeModals}>
          <AntDesign name="closecircle" size={26} color="#20B2AA" style={tw`shadow-black`} />
        </Pressable>
      </View>
      <View style={tw`w-full flex flex-col px-4`}>
        <Text style={tw`mb-2`}>Тип заказа: {orderType}</Text>
        {orderType === 'Доставка' && (
          <>
            <Text style={tw`mb-2`}>Адрес: {address}</Text>
            <Text style={tw`mb-2`}>Способ оплаты: {pay ? pay : 'Не выбран'}</Text>
          </>
        )}
        <Text style={tw`mb-2`}>Номер телефона: {phoneNumber}</Text>
        <Text style={tw`mb-2`}>Комментарий: {comment ? comment : 'Не указан'}</Text>
        <Text style={tw`mb-2`}>Заказ:</Text>
        <View>
          {items.map((i) => (
            <Text key={i.id} style={tw`w-full text-sm`}>
              {`${i.name} | ${i.price} ₽. | x ${i.quantity}${
                typeof i.serving === 'number' ? '00г.' : 'шт.'
              }`}
            </Text>
          ))}
        </View>
        {paid ? (
          <Text style={tw`my-2`}>Сумма с учетом доставки: {totalWithDeliveryPrice} ₽</Text>
        ) : (
          <Text style={tw`my-2`}>Сумма: {totalPrice} ₽</Text>
        )}
        <Text style={tw`mb-2`}>Дата: {checked ? shortDate : 'Сегодня'}</Text>
        <Text style={tw`mb-2`}>Время: {checked ? shortTime : 'Ближайшее'}</Text>
      </View>
      <View style={tw`flex flex-row justify-between items-center px-4 py-2`}>
        <Text style={tw`text-sm text-left w-1/2`}>
          В течение 10-ти минут с вами свяжется оператор для подтверждения заказа.
        </Text>
        <TouchableOpacity style={tw`py-2 px-4 h-10`} onPress={closeModals}>
          <Text>Ok</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

export default OrderFinish;

const styles = StyleSheet.create({});