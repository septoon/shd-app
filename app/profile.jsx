import { useDispatch, useSelector } from 'react-redux';
import MaskInput from 'react-native-mask-input';
import { Alert, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import React, { useLayoutEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import tw from 'twrnc';
import { useColors } from '../common/Colors';
import { setAddress, setPhoneNumber } from '../redux/Features/cart/orderSlice';
import { formatDateHistory, formatTime } from '../common/formatDate';
import { clearOrderHistory } from '../redux/Features/cart/orderHistorySlice';

const Profile = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const Colors = useColors();
  const { address, phoneNumber } = useSelector((state) => state.order);
  const { orders } = useSelector((state) => state.orderHistory);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: 'Профиль',
      headerBackTitle: 'Назад',
      headerStyle: {
        backgroundColor: Colors.darkModeBg,
      },
      headerShadowVisible: false,
      headerTintColor: Colors.darkModeText,
    });
  }, [navigation, Colors]);

  const clearHistory = () => {
    return Alert.alert('Очистить историю', 'Вы уверены, что хотите очистить историю заказов?', [
      {
        text: 'Отмена',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      { text: 'Да', onPress: () => dispatch(clearOrderHistory()) },
    ]);
  };

  const revOrders = [...orders].reverse();

  const inputClassName = tw`pl-2 py-3 w-1/2 border border-[${Colors.darkModeInput}] focus:outline-none  text-[${Colors.darkModeText}] rounded`;
  const textClassName = tw`mb-2 text-sm text-[${Colors.darkModeText}]`;

  return (
    <ScrollView style={tw`w-full h-full bg-[${Colors.darkModeBg}]`}>
      <Text style={tw`text-lg font-bold text-[${Colors.darkModeText}] m-4`}>
        Контактная информация:
      </Text>
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
            mask={['+','7',' ','(',/\d/,/\d/,/\d/,')',' ',/\d/,/\d/,/\d/,'-',/\d/,/\d/,'-',/\d/,/\d/,]}
          />
        </View>
      </View>
      {orders.length > 0 && (
        <View style={tw`flex-row justify-between items-center m-4`}>
          <Text style={tw`text-lg font-bold text-[${Colors.darkModeText}]`}>История заказов:</Text>
          <TouchableOpacity
            onPress={clearHistory}
            style={tw`flex-row items-center p-2 rounded-md bg-[${Colors.red}] opacity-80`}
          >
            <MaterialCommunityIcons name="delete-forever" size={16} color="white" />
            <Text style={tw`text-xs text-white ml-1`}>Очистить историю</Text>
          </TouchableOpacity>
        </View>
      )}
      {revOrders.map((order, index) => (
        <View
          key={index}
          style={tw`bg-[${Colors.darkModeElBg}] mx-4 p-4 rounded-2xl shadow-md mb-6`}>
          <View style={tw`flex-row justify-between items-center mb-4`}>
            <Text style={tw`text-lg font-semibold text-[${Colors.primary}]`}>
              Заказ #{order.ordersCount}
            </Text>
          </View>
          <View style={tw`mb-3`}>
            <Text style={tw`text-sm text-[${Colors.darkModeText}] opacity-90`}>Тип заказа:</Text>
            <Text style={tw`text-base text-[${Colors.darkModeText}] font-medium`}>
              {order.orderType}
            </Text>
          </View>
          {order.orderType === 'Доставка' && (
            <>
              <View style={tw`mb-3`}>
                <Text style={tw`text-sm text-[${Colors.darkModeText}] opacity-90`}>Адрес:</Text>
                <Text style={tw`text-base text-[${Colors.darkModeText}] font-medium`}>
                  {order.address}
                </Text>
              </View>
              <View style={tw`mb-3`}>
                <Text style={tw`text-sm text-[${Colors.darkModeText}] opacity-90`}>
                  Способ оплаты:
                </Text>
                <Text style={tw`text-base text-[${Colors.darkModeText}] font-medium`}>
                  {order.pay ? order.pay : 'Не выбран'}
                </Text>
              </View>
            </>
          )}

          <View style={tw`mb-3`}>
            <Text style={tw`text-sm text-[${Colors.darkModeText}] opacity-90`}>
              Номер телефона:
            </Text>
            <Text style={tw`text-base text-[${Colors.darkModeText}] font-medium`}>
              {order.phoneNumber}
            </Text>
          </View>

          <View style={tw`mb-3`}>
            <Text style={tw`text-sm text-[${Colors.darkModeText}] opacity-90`}>
              Дата и время {order.orderType === 'Доставка' ? 'доставки' : 'самовывоза'}:
            </Text>
            <Text style={tw`text-base text-[${Colors.darkModeText}] font-medium`}>
              {order.checked ? order.shortDate + ' ' + order.shortTime : 'Ближайшее'}
            </Text>
          </View>

          {order.comment && (
            <View style={tw`mb-3`}>
              <Text style={tw`text-sm text-[${Colors.darkModeText}] opacity-90`}>Комментарий:</Text>
              <Text style={tw`text-base text-[${Colors.darkModeText}] font-medium`}>
                {order.comment}
              </Text>
            </View>
          )}

          <View style={tw`mb-4`}>
            <Text style={tw`text-sm text-[${Colors.darkModeText}] opacity-90 mb-2`}>Заказ:</Text>
            <View style={tw`bg-[${Colors.darkModeOrdersList}] p-3 rounded-lg`}>
              {order.items.map((item) => (
                <View key={item.id} style={[tw`flex-row justify-between items-center mb-2`, item.id === order.items.length - 1 || order.items.length === 1 ? { marginBottom: 0 } : null]}>
                  <Text style={tw`text-sm max-w-[60%] text-[${Colors.primary}]`}>{item.name}</Text>
                  <Text style={tw`text-sm text-[${Colors.primary}]`}>
                    {item.quantity} {typeof item.serving === 'number' ? '00г.' : 'шт.'} x{' '}
                    {item.price} ₽
                  </Text>
                </View>
              ))}
            </View>
          </View>

          <View style={tw`mb-4`}>
            {order.paid ? (
              <Text style={tw`text-base text-[${Colors.primary}] font-semibold`}>
                Сумма с учетом доставки: {order.totalWithDeliveryPrice} ₽
              </Text>
            ) : (
              <Text style={tw`text-base text-[${Colors.main}] font-bold`}>
                Сумма: {order.totalPrice} ₽
              </Text>
            )}
          </View>
          <View style={tw`w-full h-[0.5px] bg-[${Colors.darkModeText}] opacity-20`}></View>
          <View style={tw`flex-row justify-between items-center pt-3`}>
            <Text style={tw`text-sm text-[${Colors.gray500}]`}>{formatDateHistory(order.date)}</Text>
            <Text style={tw`text-sm text-[${Colors.gray500}]`}>{formatTime(order.date)}</Text>
          </View>
        </View>
      ))}
    </ScrollView>
  );
};

export default Profile;
