import { FlatList, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import React, { useState, useEffect } from 'react';
import tw from 'twrnc';
import { Colors } from '../../common/Colors';
import { RadioButton, Switch } from 'react-native-paper';
import FlatListItems from './FlatListItems';
import DatePickerComponent from './DatePicker';
import { useSelector, useDispatch } from 'react-redux';
import { setDateType } from '../../redux/Features/cart/dateSlece';

const DeliveryOrder = ({ items, totalCount, totalPrice, orderType, date, setDate }) => {
  const [checked, setChecked] = useState('Наличные')

  const { shortDate, shortTime } = useSelector((state) => state.date);
  const dispatch = useDispatch();

  const [showDate, setShowDate] = useState(false)

  const onToggleSwitch = () => setShowDate(!showDate);

  useEffect(() => {
    dispatch(setDateType(new Date()))
  }, [])
  
  return (
    <View style={tw`absolute left-0 right-0 bottom-0 top-28 flex justify-between`}>
      <ScrollView>
        <View style={tw`w-full min-h-24 max-h-28 rounded-2xl py-4 bg-white`}>
          <FlatList data={items} renderItem={({ item }) => <FlatListItems item={item} />} />
        </View>
        <View style={tw`w-full h-auto bg-white mt-6 rounded-2xl`}>
          <View style={tw`w-full h-auto flex flex-row justify-between items-center py-4 px-4`}>
            <Text>Выбрать время {orderType === 'Доставка' ? 'доставки' : 'самовывоза'}:</Text>
            <Switch value={showDate} color={Colors.main} onValueChange={onToggleSwitch} />
          </View>
          {
            showDate && (<View style={tw`w-full h-auto flex flex-row justify-between items-center py-4 px-4`}>
              <Text>Время:</Text>
              <DatePickerComponent date={date} shortDate={shortDate} shortTime={shortTime}/>
            </View>)
          }
        </View>
        {orderType === 'Доставка' ? (
          <>
            <View style={tw`w-full h-auto py-3 mt-6 px-4 bg-white rounded-2xl`}>
              <Text>Адрес:</Text>
              <TextInput placeholder='Адрес' style={tw`bg-[${Colors.slideBg}] w-1/2 rounded-lg py-2 pl-2 mb-2`} />
              <Text>Номер телефона:</Text>
              <TextInput keyboardType="numeric" placeholder='Номер телефона' style={tw`bg-[${Colors.slideBg}] w-1/2 rounded-lg py-2 pl-2 mb-2`} />
              <Text>Комментарий:</Text>
              <TextInput placeholder='Комментарий' style={tw`bg-[${Colors.slideBg}] w-1/2 rounded-lg py-2 pl-2`} />
            </View>
            <View style={tw`mt-6 bg-white rounded-2xl`} name="checkbox">
              <RadioButton.Group
                onValueChange={(newValue) => setChecked(newValue)}
                value={checked}>
                <RadioButton.Item style={tw`py-2`} color={Colors.main} label="Наличные" value="Наличные" />
                <View style={tw`w-full px-4 opacity-30`}>
                  <View style={tw`bg-[${Colors.main}] h-px`}></View>
                </View>
                <RadioButton.Item style={tw`py-2`} color={Colors.main} label="Карта" value="Карта" />
              </RadioButton.Group>
            </View>
          </>
        ) : (
          <View style={tw`w-full h-auto py-3 mt-6 px-4 bg-white rounded-2xl`}>
            <Text>Номер телефона:</Text>
              <TextInput placeholder='Номер телефона' style={tw`bg-[${Colors.slideBg}] w-full rounded-lg py-2 pl-2 mb-2`} />
              <Text>Комментарий:</Text>
              <TextInput placeholder='Комментарий' style={tw`bg-[${Colors.slideBg}] w-full rounded-lg py-2 pl-2`} />
          </View>
        )}
      <View style={tw`flex px-4 mt-6`}>
        <View style={tw`flex flex-row justify-between`}>
          <Text style={tw`font-bold`}>Итого:</Text>
          <Text style={tw`font-bold`}>{totalPrice}₽</Text>
        </View>
        <View style={tw`flex flex-row justify-between opacity-60 mt-1`}>
          <Text style={tw``}>Всего блюд:</Text>
          <Text style={tw``}>{totalCount}</Text>
        </View>
      </View>
      </ScrollView>
      <View style={tw`bg-transparent py-6 rounded-2xl flex justify-center items-center`}>
        <Pressable
          style={tw` rounded-lg py-3 w-2/3 flex justify-around flex-row items-center bg-[${Colors.main}]`}>
          <Text style={tw`text-lg font-bold text-white`}>Заказать:</Text>
          <Text style={tw`text-lg font-bold text-white`}>{totalPrice} ₽</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default DeliveryOrder;

const styles = StyleSheet.create({});
