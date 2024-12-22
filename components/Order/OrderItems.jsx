import React, { useMemo } from 'react';
import { ScrollView, Text, TextInput, View } from 'react-native';
import tw from 'twrnc';
import { RadioButton, Switch } from 'react-native-paper';
import MaskInput from 'react-native-mask-input';

import FlatListItems from './FlatListItems';
import DatePickerComponent from './DatePicker';
import { useColors } from '../../common/Colors';
import { useDispatch } from 'react-redux';
import { setAddress, setComment, setPhoneNumber } from '../../redux/Features/cart/orderSlice';

const OrderItems = ({
  items,
  totalCount,
  totalPrice,
  orderType,
  setPay,
  minDeliveryAmount,
  deliveryCost,
  shortDate,
  shortTime,
  showDate,
  onToggleSwitch,
  totalWithDeliveryPrice,
  address,
  phoneNumber,
  comment,
  checkEmptyField,
  pay,
  paid,
}) => {
  const Colors = useColors();
  const dispatch = useDispatch();

  // Мемоизация численных значений
  const safeMinDeliveryAmount = useMemo(
    () => Number.isFinite(Number(minDeliveryAmount)) ? Number(minDeliveryAmount) : 0,
    [minDeliveryAmount]
  );
  const safeDeliveryCost = useMemo(
    () => Number.isFinite(Number(deliveryCost)) ? Number(deliveryCost) : 0,
    [deliveryCost]
  );
  const safeTotalPrice = useMemo(
    () => Number.isFinite(Number(totalPrice)) ? Number(totalPrice) : 0,
    [totalPrice]
  );
  const safeTotalWithDeliveryPrice = useMemo(
    () => Number.isFinite(Number(totalWithDeliveryPrice)) ? Number(totalWithDeliveryPrice) : safeTotalPrice,
    [totalWithDeliveryPrice, safeTotalPrice]
  );

  // Гарантия на строки
  const safeAddress = useMemo(() => (typeof address === 'string' ? address : ''), [address]);
  const safePhoneNumber = useMemo(() => (typeof phoneNumber === 'string' ? phoneNumber : ''), [phoneNumber]);
  const safeComment = useMemo(() => (typeof comment === 'string' ? comment : ''), [comment]);

  // CSS классы
  const inputClassName = tw`pl-2 py-3 w-1/2 border border-[${Colors.darkModeInput}] focus:outline-none text-[${Colors.darkModeText}] rounded`;

  // Общие элементы ошибок
  const renderError = (condition, message) =>
    condition ? <Text style={tw`ml-2 text-sm text-[${Colors.red}]`}>{message}</Text> : null;

  return (
    <ScrollView contentContainerStyle={tw`flex-grow mx-3`} keyboardShouldPersistTaps="handled">
      {/* Список блюд */}
      <View style={tw`w-full min-h-24 flex items-center rounded-2xl py-4 bg-[${Colors.darkModeElBg}] shadow-md`}>
        {items.map((item, index) => (
          <FlatListItems item={item} Colors={Colors} key={index} />
        ))}
      </View>

      {/* Выбор времени */}
      <View style={tw`w-full h-auto bg-[${Colors.darkModeElBg}] mt-6 rounded-2xl shadow-md`}>
        <View style={tw`w-full h-auto flex flex-row justify-between items-center py-4 px-4`}>
          <Text style={tw`text-[${Colors.darkModeText}] font-bold`}>
            Выбрать время {orderType === 'Доставка' ? 'доставки' : 'самовывоза'}:
          </Text>
          <Switch value={showDate} color={Colors.main} onValueChange={onToggleSwitch} />
        </View>
        {showDate && (
          <View style={tw`w-full h-auto flex flex-row justify-between items-center py-2 px-4`}>
            <Text style={tw`text-[${Colors.darkModeText}]`}>Время:</Text>
            <DatePickerComponent shortDate={shortDate} shortTime={shortTime} />
          </View>
        )}
      </View>

      {/* Форма для доставки */}
      {orderType === 'Доставка' && (
        <View style={tw`w-full h-auto py-3 mt-6 px-4 bg-[${Colors.darkModeElBg}] rounded-2xl shadow-md`}>
          {/* Адрес */}
          <Text style={tw`text-[${Colors.darkModeText}] my-1 opacity-80`}>Введите ваш адрес:</Text>
          <View style={tw`flex flex-row items-center`}>
            <TextInput
              placeholder="Адрес"
              value={safeAddress}
              onChangeText={(text) => dispatch(setAddress(text))}
              style={[
                inputClassName,
                checkEmptyField && !safeAddress ? { borderColor: Colors.red, borderWidth: 1 } : {},
              ]}
            />
            {renderError(checkEmptyField && !safeAddress, 'Поле не заполнено')}
          </View>

          {/* Телефон */}
          <Text style={tw`text-[${Colors.darkModeText}] my-1 opacity-80`}>Введите ваш номер телефона:</Text>
          <View style={tw`flex flex-row items-center`}>
            <MaskInput
              keyboardType="numeric"
              placeholder="+7 (978) 697-84-75"
              value={safePhoneNumber}
              onChangeText={(masked) => dispatch(setPhoneNumber(masked))}
              style={[
                inputClassName,
                checkEmptyField && safePhoneNumber.length < 18 ? { borderColor: Colors.red, borderWidth: 1 } : {},
              ]}
              mask={[
                '+',
                '7',
                ' ',
                '(',
                /\d/,
                /\d/,
                /\d/,
                ')',
                ' ',
                /\d/,
                /\d/,
                /\d/,
                '-',
                /\d/,
                /\d/,
                '-',
                /\d/,
                /\d/,
              ]}
            />
            {renderError(checkEmptyField && safePhoneNumber.length < 18, 'Поле не заполнено')}
          </View>

          {/* Комментарий */}
          <Text style={tw`text-[${Colors.darkModeText}] my-1 opacity-80`}>Введите комментарий:</Text>
          <TextInput
            placeholder="Комментарий"
            value={safeComment}
            onChangeText={(text) => dispatch(setComment(text))}
            style={inputClassName}
          />

          {/* Условия оплаты */}
          {paid ? (
            <Text style={tw`mt-4 text-[12px] text-[${Colors.darkModeText}]`}>
              Если сумма заказа ниже <Text style={tw`text-[${Colors.red}] font-bold`}>{safeMinDeliveryAmount}</Text> ₽,
              стоимость доставки составляет{' '}
              <Text style={tw`text-[${Colors.main}] font-bold`}>{safeDeliveryCost}</Text> ₽
            </Text>
          ) : (
            <Text style={tw`mt-4 text-[12px] text-[${Colors.darkModeText}]`}>
              Минимальная сумма доставки: <Text style={tw`text-[${Colors.red}] font-bold`}>{safeMinDeliveryAmount}</Text>{' '}
              ₽
            </Text>
          )}
        </View>
      )}

      {/* Самовывоз */}
      {orderType === 'Самовывоз' && (
        <View style={tw`w-full h-auto py-3 mt-6 px-4 bg-[${Colors.darkModeElBg}] rounded-2xl shadow-md`}>
          {/* Телефон */}
          <Text style={tw`text-[${Colors.darkModeText}] my-1 opacity-80`}>Введите ваш номер телефона:</Text>
          <View style={tw`flex flex-row items-center`}>
            <MaskInput
              keyboardType="numeric"
              placeholder="+7 (978) 697-84-75"
              value={safePhoneNumber}
              onChangeText={(masked) => dispatch(setPhoneNumber(masked))}
              style={[
                inputClassName,
                checkEmptyField && safePhoneNumber.length < 18 ? { borderColor: Colors.red, borderWidth: 1 } : {},
              ]}
              mask={[
                '+',
                '7',
                ' ',
                '(',
                /\d/,
                /\d/,
                /\d/,
                ')',
                ' ',
                /\d/,
                /\d/,
                /\d/,
                '-',
                /\d/,
                /\d/,
                '-',
                /\d/,
                /\d/,
              ]}
            />
            {renderError(checkEmptyField && safePhoneNumber.length < 18, 'Поле не заполнено')}
          </View>

          {/* Комментарий */}
          <Text style={tw`text-[${Colors.darkModeText}] my-1 opacity-80`}>Введите комментарий:</Text>
          <TextInput
            placeholder="Комментарий"
            value={safeComment}
            onChangeText={(text) => dispatch(setComment(text))}
            style={inputClassName}
          />
        </View>
      )}

      {/* Итоговая стоимость */}
      <View style={tw`flex px-4 mt-6 mb-24`}>
        <View style={tw`flex flex-row justify-between`}>
          <Text style={tw`font-bold text-[${Colors.darkModeText}]`}>
            {paid ? 'Итого с доставкой:' : 'Итого:'}
          </Text>
          <Text style={tw`font-bold text-[${Colors.darkModeText}]`}>
            {paid ? safeTotalWithDeliveryPrice : safeTotalPrice}₽
          </Text>
        </View>
        <View style={tw`flex flex-row justify-between opacity-60 mt-1`}>
          <Text style={tw`text-[${Colors.darkModeText}]`}>Всего блюд:</Text>
          <Text style={tw`text-[${Colors.darkModeText}]`}>{totalCount}</Text>
        </View>
      </View>
    </ScrollView>
  );
};

export default React.memo(OrderItems);