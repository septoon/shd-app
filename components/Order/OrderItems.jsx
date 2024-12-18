import React, { useCallback, useMemo } from 'react';
import { FlatList, Switch, Text, TextInput, View } from 'react-native';
import tw from 'twrnc';
import { useDispatch } from 'react-redux';
import MaskInput from 'react-native-mask-input';
import { RadioButton } from 'react-native-paper';
import FlatListItems from './FlatListItems';
import DatePickerComponent from './DatePicker';
import { useColors } from '../../common/Colors';
import { setAddress, setPhoneNumber, setComment } from '../../redux/Features/cart/orderSlice';

const OrderItems = ({
  items = [],
  address = '',
  phoneNumber = '',
  comment = '',
  totalPrice = 0,
  totalWithDeliveryPrice = 0,
  minDeliveryAmount = 0,
  deliveryCost = 0,
  orderType = 'Доставка',
  checkEmptyField = false,
  showDate = false,
  onToggleSwitch,
  pay = 'Наличные',
  setPay,
  paid = false,
  shortDate,
  shortTime
}) => {
  const dispatch = useDispatch();
  const Colors = useColors();

  const handleAddressChange = useCallback((text) => dispatch(setAddress(text)), [dispatch]);
  const handlePhoneChange = useCallback((masked) => dispatch(setPhoneNumber(masked)), [dispatch]);
  const handleCommentChange = useCallback((text) => dispatch(setComment(text)), [dispatch]);

  const inputStyle = tw`pl-2 py-3 w-1/2 border border-[${Colors.darkModeInput}] focus:outline-none text-[${Colors.darkModeText}] rounded`;

  const memoizedItems = useMemo(() => items, [items]);

  return (
    <View style={tw`flex-grow mx-3`}>
      {/* Список товаров */}
      <View style={tw`w-full min-h-24 rounded-2xl py-4 bg-[${Colors.darkModeElBg}] shadow-md`}>
        <FlatList
          data={memoizedItems}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => <FlatListItems item={item} />}
          ListEmptyComponent={
            <Text style={tw`p-4 text-[${Colors.darkModeText}]`}>Корзина пуста</Text>
          }
        />
      </View>

      {/* Время доставки */}
      <View style={tw`w-full h-auto bg-[${Colors.darkModeElBg}] mt-6 rounded-2xl shadow-md`}>
        <View style={tw`flex flex-row justify-between items-center py-4 px-4`}>
          <Text style={tw`text-[${Colors.darkModeText}] font-bold`}>
            Выбрать время {orderType === 'Доставка' ? 'доставки' : 'самовывоза'}:
          </Text>
          <Switch value={showDate} color={Colors.main} onValueChange={onToggleSwitch} />
        </View>
        {showDate && (
          <DatePickerComponent shortDate={shortDate} shortTime={shortTime} />
        )}
      </View>

      {/* Адрес, номер телефона */}
      {orderType === 'Доставка' && (
        <View style={tw`py-3 mt-6 px-4 bg-[${Colors.darkModeElBg}] rounded-2xl shadow-md`}>
          <TextInput
            placeholder="Адрес"
            value={address}
            onChangeText={handleAddressChange}
            style={inputStyle}
          />
          <MaskInput
            placeholder="+7 (978) 000-00-00"
            value={phoneNumber}
            onChangeText={handlePhoneChange}
            style={inputStyle}
            mask={['+', '7', ' ', '(', /\d/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/]}
          />
          <TextInput
            placeholder="Комментарий"
            value={comment}
            onChangeText={handleCommentChange}
            style={inputStyle}
          />
        </View>
      )}

      {/* Итоговая сумма */}
      <View style={tw`px-4 mt-6 mb-24`}>
        <Text style={tw`font-bold text-[${Colors.darkModeText}]`}>
          Итого с доставкой: {paid ? totalWithDeliveryPrice : totalPrice}₽
        </Text>
      </View>
    </View>
  );
};

export default React.memo(OrderItems);