import { ScrollView, Text, TextInput, View } from 'react-native';
import React from 'react';
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
  paid
}) => {
  const Colors = useColors();
  const dispatch = useDispatch();

  // Безопасные проверки численных значений
  const safeMinDeliveryAmount = Number.isFinite(Number(minDeliveryAmount)) ? Number(minDeliveryAmount) : 0;
  const safeDeliveryCost = Number.isFinite(Number(deliveryCost)) ? Number(deliveryCost) : 0;
  const safeTotalPrice = Number.isFinite(Number(totalPrice)) ? Number(totalPrice) : 0;
  const safeTotalWithDeliveryPrice = Number.isFinite(Number(totalWithDeliveryPrice))
    ? Number(totalWithDeliveryPrice)
    : safeTotalPrice;

  // Гарантируем, что адрес, телефон и комментарий — строки
  const safeAddress = typeof address === 'string' ? address : '';
  const safePhoneNumber = typeof phoneNumber === 'string' ? phoneNumber : '';
  const safeComment = typeof comment === 'string' ? comment : '';

  const inputClassName = tw`pl-2 py-3 w-1/2 border border-[${Colors.darkModeInput}] focus:outline-none text-[${Colors.darkModeText}] rounded`;

  return (
    <ScrollView contentContainerStyle={tw`flex-grow mx-3`} keyboardShouldPersistTaps="handled">
      <View style={tw`w-full min-h-24 rounded-2xl py-4 bg-[${Colors.darkModeElBg}] shadow-md`}>
        {items.map((item, index) => (
          <FlatListItems item={item} key={index} />
        ))}
      </View>
      

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

      {orderType === 'Доставка' ? (
        <>
          <View style={tw`w-full h-auto py-3 mt-6 px-4 bg-[${Colors.darkModeElBg}] rounded-2xl shadow-md`}>
            <Text style={tw`text-[${Colors.darkModeText}] my-1 opacity-80`}>Введите ваш адрес:</Text>
            <View style={tw`flex flex-row items-center`}>
              <TextInput
                placeholder="Адрес"
                value={safeAddress}
                onChangeText={(text) => dispatch(setAddress(text))}
                style={[
                  inputClassName,
                  checkEmptyField && !safeAddress ? { borderColor: Colors.red, borderWidth: 1 } : {}
                ]}
                />
              {checkEmptyField && !safeAddress ? (
                <Text style={tw`ml-2 text-sm text-[${Colors.red}]`}>Поле не заполнено</Text>
              ) : null}
            </View>

            <Text style={tw`text-[${Colors.darkModeText}] my-1 opacity-80`}>Введите ваш номер телефона:</Text>
            <View style={tw`flex flex-row items-center`}>
              <MaskInput
                keyboardType="numeric"
                placeholder="+7 (978) 697-84-75"
                value={safePhoneNumber}
                onChangeText={(masked) => dispatch(setPhoneNumber(masked))}
                style={[
                  inputClassName,
                  checkEmptyField && safePhoneNumber.length < 18 ? { borderColor: Colors.red, borderWidth: 1 } : {}
                ]}
                mask={['+', '7', ' ', '(', /\d/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/]}
                />
              {checkEmptyField && safePhoneNumber.length < 18 ? (
                <Text style={tw`ml-2 text-sm text-[${Colors.red}]`}>Поле не заполнено</Text>
              ) : null}
            </View>

            <Text style={tw`text-[${Colors.darkModeText}] my-1 opacity-80`}>Введите комментарий:</Text>
            <TextInput
              placeholder="Комментарий"
              value={safeComment}
              onChangeText={(text) => dispatch(setComment(text))}
              style={inputClassName}
              />
          </View>
              {paid ? (
                <Text style={tw`mt-4 mx-4 text-[12px] text-[${Colors.darkModeText}]`}>
                  Если сумма заказа ниже <Text style={tw`text-[${Colors.red}] font-bold`}>{safeMinDeliveryAmount}</Text> ₽,
                  стоимость доставки составляет <Text style={tw`text-[${Colors.main}] font-bold`}>{safeDeliveryCost}</Text> ₽
                </Text>
              ) : (
                <Text style={tw`mt-4 mx-4 text-[12px] text-[${Colors.darkModeText}]`}>
                  Минимальная сумма доставки: <Text style={tw`text-[${Colors.red}] font-bold`}>{safeMinDeliveryAmount}</Text> ₽
                </Text>
              )}

          <Text style={tw`text-[${Colors.darkModeText}] font-bold my-3 ml-4`}>Способ оплаты:</Text>
          <View style={tw`bg-[${Colors.darkModeElBg}] rounded-2xl shadow-md`} name="checkbox">
            <RadioButton.Group onValueChange={(newValue) => setPay(newValue)} value={pay}>
              <RadioButton.Item
                style={tw`py-2`}
                labelStyle={{ color: Colors.darkModeText }}
                color={Colors.main}
                label="Наличные"
                value="Наличные"
                />
              <View style={tw`w-full px-4 opacity-30`}>
                <View style={tw`bg-[${Colors.main}] h-px`} />
              </View>
              <RadioButton.Item
                style={tw`py-2`}
                labelStyle={{ color: Colors.darkModeText }}
                color={Colors.main}
                label="Карта"
                value="Карта"
              />
            </RadioButton.Group>
          </View>
        </>
      ) : (
        <View style={tw`w-full h-auto py-3 mt-6 px-4 bg-[${Colors.darkModeElBg}] rounded-2xl shadow-md`}>
          <Text style={tw`text-[${Colors.darkModeText}] my-1 opacity-80`}>Введите ваш номер телефона:</Text>
          <View style={tw`flex flex-row items-center`}>
            <MaskInput
              keyboardType="numeric"
              placeholder="+7 (978) 697-84-75"
              value={safePhoneNumber}
              onChangeText={(masked) => dispatch(setPhoneNumber(masked))}
              style={[
                inputClassName,
                checkEmptyField && safePhoneNumber.length < 18 ? { borderColor: Colors.red, borderWidth: 1 } : {}
              ]}
              mask={['+', '7', ' ', '(', /\d/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/]}
            />
            {checkEmptyField && safePhoneNumber.length < 18 ? (
              <Text style={tw`ml-2 text-sm text-[${Colors.red}]`}>Поле не заполнено</Text>
            ) : null}
          </View>

          <Text style={tw`text-[${Colors.darkModeText}] my-1 opacity-80`}>Введите комментарий:</Text>
          <TextInput
            placeholder="Комментарий"
            value={safeComment}
            onChangeText={(text) => dispatch(setComment(text))}
            style={inputClassName}
          />
        </View>
      )}

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

export default OrderItems;