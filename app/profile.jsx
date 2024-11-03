import { useDispatch, useSelector } from 'react-redux';
import MaskInput from 'react-native-mask-input';
import { Alert, Button, ScrollView, Text, TextInput, View } from 'react-native';
import React, { useLayoutEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import tw from 'twrnc';
import { useColors } from '../common/Colors';
import { setAddress, setPhoneNumber } from '../redux/Features/cart/orderSlice';
import { formatDate, formatDateHistory, formatTime } from '../common/formatDate';
import { clearOrderHistory } from '../redux/Features/cart/orderHistorySlice';


const Profile = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const Colors = useColors();
  const { address, phoneNumber } = useSelector((state) => state.order)
  const { orders } = useSelector((state) => state.orderHistory)

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: 'Профиль', // Устанавливаем заголовок для профиля
      headerBackTitle: 'Назад',
      headerStyle: {
        backgroundColor: Colors.darkModeBg,
      },
      headerShadowVisible: false,
      headerTintColor: Colors.darkModeText,
    });
  }, [navigation]);

  const clearHistory = () => {
    return Alert.alert('Очистить историю', 'Вы уверены, что хотите очистить историю заказов?', [
      {
        text: 'Отмена',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {text: 'Да', onPress: () => dispatch(clearOrderHistory())},
    ])
  }

  const inputClassName = tw`pl-2 py-3 w-1/2 border border-[${Colors.darkModeInput}] focus:outline-none  text-[${Colors.darkModeText}] rounded`
  const textClassName = tw`mb-2 text-sm text-[${Colors.darkModeText}]`

  return (
    <ScrollView style={tw`w-full h-full bg-[${Colors.darkModeBg}]`}>
      <Text style={tw`text-lg font-bold text-[${Colors.darkModeText}] m-4`}>Контактная информация:</Text>
      <View style={tw`h-auto bg-[${Colors.darkModeElBg}] mx-4 p-4 rounded-2xl shadow-lg`}>
        <Text style={tw`text-[${Colors.darkModeText}] my-1 opacity-80`}>Адрес:</Text>
        <View style={tw`flex flex-row items-center`}>
          <TextInput
            placeholder="Адрес"
            value={address}
            onChangeText={(text) => dispatch(setAddress(text))}
            style={inputClassName}
          />
        </View>
        <Text style={tw`text-[${Colors.darkModeText}] my-1 opacity-80`}>Номер телефона:</Text>
        <View style={tw`flex flex-row items-center`}>
          <MaskInput
            keyboardType="numeric"
            placeholder="+7 (978) 697-84-75"
            value={phoneNumber}
            onChangeText={(masked, unmasked) => dispatch(setPhoneNumber(masked))}
            style={inputClassName}
            mask={['+', '7', ' ', '(', /\d/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/]}
          />
        </View>
      </View>
      <View style={tw`flex-row justify-between items-center m-4`}>
      <Text style={tw`text-lg font-bold text-[${Colors.darkModeText}]`}>История заказов:</Text>
        <Button title='Очистить историю' style={tw`text-sm`} onPress={clearHistory} />
      </View>
      {
        orders.map((order, index) => (
          <View key={index} style={tw`h-auto bg-[${Colors.darkModeElBg}] mx-4 p-4 rounded-2xl shadow-lg mb-4`}>
            <Text style={textClassName}>Тип заказа: {order.orderType}</Text>
            {order.orderType === 'Доставка' && (
              <>
                <Text style={textClassName}>Адрес: {order.address}</Text>
                <Text style={textClassName}>Способ оплаты: {order.pay ? order.pay : 'Не выбран'}</Text>
              </>
            )}
            <Text style={textClassName}>Номер телефона: {order.phoneNumber}</Text>
            <Text style={textClassName}>Комментарий: {order.comment ? order.comment : 'Не указан'}</Text>
            <Text style={textClassName}>Заказ:</Text>
            <View style={tw`my-3`}>
              {order.items.map((i) => (
                <Text key={i.id} style={tw`w-full text-sm text-[${Colors.darkModeText}]`}>
                  {`${i.name} | ${i.price} ₽. | x ${i.quantity}${
                    typeof i.serving === 'number' ? '00г.' : 'шт.'
                  }`}
                </Text>
              ))}
            </View>
            {order.paid ? (
              <Text style={tw`my-2 text-[${Colors.darkModeText}] underline`}>
                Сумма с учетом доставки: {order.totalWithDeliveryPrice} ₽
              </Text>
            ) : (
              <Text style={tw`my-2 text-[${Colors.darkModeText}] underline`}>
                Сумма: {order.totalPrice} ₽
              </Text>
            )}
            <Text style={textClassName}>Дата: {order.checked ? order.shortDate : 'Сегодня'}</Text>
            <Text style={textClassName}>Время: {order.checked ? order.shortTime : 'Ближайшее'}</Text>
            <View style={tw`flex-row w-full border-t border-[${Colors.darkModeInput}] justify-between pt-2 mt-2 opacity-40`}>
              <Text style={textClassName}>{formatDateHistory(order.date)}</Text>
              <Text style={textClassName}>{formatTime(order.date)}</Text>
            </View>
          </View>
        ))
      }
    </ScrollView>
  );
};

export default Profile;