import { KeyboardAvoidingView, Platform, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import React from 'react';
import tw from 'twrnc';
import { RadioButton, Switch } from 'react-native-paper';
import MaskInput from 'react-native-mask-input';

import FlatListItems from './FlatListItems';
import DatePickerComponent from './DatePicker';
import { isDeliveryTimeValid, isOrderTimeValid } from '../../common/isDeliveryTimeValid';
import { useColors } from '../../common/Colors';

const OrderItems = ({ items, totalCount, totalPrice, orderType, shortDate, shortTime, setPhoneNumber, setAddress, setComment, setPay, minDeliveryAmount, paidDelivery, showDate, onToggleSwitch, address, phoneNumber, comment, checkEmptyField, pay, paid }) => {
  const Colors = useColors()

  const inputClassName = tw`pl-2 py-3 w-1/2 border border-[${Colors.darkModeInput}] focus:outline-none  text-[${Colors.darkModeText}] rounded`

  return (
    <KeyboardAvoidingView
      style={tw`pb-24 pt-5`}
      behavior={Platform.OS === 'ios' ? 'position' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
    >
      <ScrollView contentContainerStyle={tw`flex-grow`} keyboardShouldPersistTaps="handled">
        <View style={tw`w-full min-h-24 rounded-2xl py-4 bg-[${Colors.darkModeElBg}] shadow-md`}>
          {items.map((item, index) => (
            <FlatListItems item={item} key={index} />
          ))}
        </View>
        {totalPrice < minDeliveryAmount && orderType === 'Доставка' && !paidDelivery ? (
          <Text style={tw`mt-4 mx-4 text-[12px] text-[${Colors.darkModeText}]`}>
            Минимальная сумма доставки: <Text style={tw`text-[${Colors.red}] font-bold`}>{minDeliveryAmount}</Text> ₽
          </Text>
        ) : paid && (
            <Text style={tw`mt-4 mx-4 text-[12px] text-[${Colors.darkModeText}]`}>
              Если сумма заказа ниже <Text style={tw`text-[${Colors.red}] font-bold`}>{minDeliveryAmount}</Text> ₽,
              стоимость доставки составляет <Text style={tw`text-[${Colors.red}] font-bold`}>{deliveryCost}</Text> ₽
            </Text>
          )
        }
        <View style={tw`w-full h-auto bg-[${Colors.darkModeElBg}] mt-6 rounded-2xl shadow-md`}>
          <View style={tw`w-full h-auto flex flex-row justify-between items-center py-4 px-4`}>
            <Text style={tw`text-[${Colors.darkModeText}]`}>Выбрать время {orderType === 'Доставка' ? 'доставки' : 'самовывоза'}:</Text>
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
              <Text style={tw`text-[${Colors.darkModeText}] my-1`}>Адрес:</Text>
              <View style={tw`flex flex-row items-center`}>
                <TextInput
                  placeholder="Адрес"
                  value={address}
                  onChangeText={(text) => setAddress(text)}
                  style={[inputClassName, tw`${isDeliveryTimeValid && checkEmptyField && !address ? `border border-[${Colors.red}]` : null}`]}
                />
                {
                  isDeliveryTimeValid && checkEmptyField && !address ? <Text style={tw`ml-2 text-sm text-[${Colors.red}]`}>Поле не заполнено</Text> : null
                }
              </View>
              <Text style={tw`text-[${Colors.darkModeText}] my-1`}>Номер телефона:</Text>
              <View style={tw`flex flex-row items-center`}>
                <MaskInput
                  keyboardType="numeric"
                  placeholder="+7 (978) 697-84-75"
                  value={phoneNumber}
                  onChangeText={(masked, unmasked) => setPhoneNumber(masked)}
                  style={[inputClassName, tw`${isDeliveryTimeValid && checkEmptyField && phoneNumber.length < 18 ? `border border-[${Colors.red}]` : null}`]}
                  mask={['+', '7', ' ', '(', /\d/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/]}
                />
                {
                  isDeliveryTimeValid && checkEmptyField && phoneNumber.length < 18 ? <Text style={tw`ml-2 text-sm text-[${Colors.red}]`}>Поле не заполнено</Text> :  null
                }
              </View>
              <Text style={tw`text-[${Colors.darkModeText}] my-1`}>Комментарий:</Text>
              <TextInput
                placeholder="Комментарий"
                value={comment}
                onChangeText={(text) => setComment(text)}
                style={inputClassName}
              />
            </View>
            <View style={tw`mt-6 bg-[${Colors.darkModeElBg}] rounded-2xl shadow-md`} name="checkbox">
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
            <Text style={tw`text-[${Colors.darkModeText}] my-1`}>Номер телефона:</Text>
            <View style={tw`flex flex-row items-center`}>
              <MaskInput
                keyboardType="numeric"
                placeholder="+7 (978) 697-84-75"
                value={phoneNumber}
                onChangeText={(masked, unmasked) => setPhoneNumber(masked)}
                style={[inputClassName, tw`${isOrderTimeValid && checkEmptyField && phoneNumber.length < 18 ? `border border-[${Colors.red}]` : null}`]}
                mask={['+', '7', ' ', '(', /\d/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/]}
              />
              {
                  isOrderTimeValid && checkEmptyField && phoneNumber.length < 18 ? <Text style={tw`ml-2 text-sm text-[${Colors.red}]`}>Поле не заполнено</Text> : null
              }
            </View>
            <Text style={tw`text-[${Colors.darkModeText}] my-1`}>Комментарий:</Text>
            <TextInput
              placeholder="Комментарий"
              value={comment}
              onChangeText={(text) => setComment(text)}
              style={inputClassName}
            />
          </View>
        )}
        <View style={tw`flex px-4 mt-6 mb-24`}>
          <View style={tw`flex flex-row justify-between`}>
            <Text style={tw`font-bold text-[${Colors.darkModeText}]`}>{paid ? 'Итого с доставкой:' : 'Итого:'}</Text>
            <Text style={tw`font-bold text-[${Colors.darkModeText}]`}>{paid ? totalWithDeliveryPrice : totalPrice}₽</Text>
          </View>
          <View style={tw`flex flex-row justify-between opacity-60 mt-1`}>
            <Text style={tw`text-[${Colors.darkModeText}]`}>Всего блюд:</Text>
            <Text style={tw`text-[${Colors.darkModeText}]`}>{totalCount}</Text>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default OrderItems;
