import { ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import React, { useState, useEffect } from 'react';
import tw from 'twrnc';
import { RadioButton, Switch } from 'react-native-paper';
import MaskInput from 'react-native-mask-input';

import FlatListItems from './FlatListItems';
import DatePickerComponent from './DatePicker';
import { useDispatch, useSelector } from 'react-redux';
import { setDateType } from '../../redux/Features/cart/dateSlece';
import { sendOrder } from '../../common/sendOrder';
import { clearCart } from '../../redux/Features/cart/cartSlice';
import { isDeliveryTimeValid, isOrderTimeValid } from '../../common/isDeliveryTimeValid';
import { useColors } from '../../common/Colors';
import OrderFinish from './OrderFinish';
import { fetchDelivery } from '../../redux/Features/delivery/deliverySlice';

const OrderItems = ({ items, totalCount, totalPrice, orderType, shortDate, shortTime, setModalVisible }) => {
  const dispatch = useDispatch();

  const Colors = useColors()

  const [showDate, setShowDate] = useState(false);
  const [orderValues, setOrderValues] = useState({});
  const onToggleSwitch = () => setShowDate(!showDate);
  const [finishVisible, setFinishVisible] = useState(false)

  useEffect(() => {
    const isoDate = new Date().toISOString();
    dispatch(fetchDelivery())
    dispatch(setDateType(isoDate));
  }, []);

  const [address, setAddress] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [comment, setComment] = useState('');
  const [pay, setPay] = useState('Наличные');

  const { paidDelivery, deliveryStart, deliveryEnd, minDeliveryAmount, deliveryCost, status } = useSelector((state) => state.delivery);
  const { scheduleStart, scheduleEnd } = useSelector((state) => state.contacts);

  const ordersCount = Math.floor(Math.random() * 99999999);

  const onClickClearCart = () => {
    dispatch(clearCart());
  };

  const totalWithDeliveryPrice = deliveryCost + totalPrice;
  const paid = paidDelivery && totalPrice < minDeliveryAmount && orderType === 'Доставка';
  const handleOrder = () => {
    const dishes = items.map((item) => `${item.name} x ${item.options ? item.quantity * item.serving + 'г.' : item.quantity + 'шт.'}`).join('\n');

    const orderDetails = {
      orderType,
      address,
      phoneNumber,
      comment,
      dishes,
      items,
      paid,
      totalPrice,
      totalWithDeliveryPrice,
      pay,
      checked: showDate,
      shortDate,
      shortTime,
      ordersCount,
      setOrderValues,
      onClickClearCart,
    };

    sendOrder(orderDetails);
    dispatch(clearCart())
    setFinishVisible(true)
    // setModalVisible(false)
  };

  const isButtonDisabled =
  orderType === 'Доставка'
    ? 
    !phoneNumber ||
      !address ||
      totalPrice < minDeliveryAmount ||
      !isDeliveryTimeValid(new Date(), deliveryStart, deliveryEnd)
    : 
    !phoneNumber || !isOrderTimeValid(new Date(), scheduleStart, scheduleEnd)

  const inputClassName = tw`pl-2 py-3 w-1/2 border border-[${Colors.darkModeInput}] focus:outline-none  text-[${Colors.darkModeText}] rounded`

  return (
    <View style={tw`absolute left-0 right-0 bottom-0 top-28 flex justify-end`}>
      <ScrollView>
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
              <TextInput
                placeholder="Адрес"
                value={address}
                onChangeText={(text) => setAddress(text)}
                style={inputClassName}
              />
              <Text style={tw`text-[${Colors.darkModeText}] my-1`}>Номер телефона:</Text>
              <MaskInput
              keyboardType="numeric"
              placeholder="+7 (978) 697-84-75"
              value={phoneNumber}
              onChangeText={(masked, unmasked) => setPhoneNumber(masked)}
              style={inputClassName}
              mask={['+', '7', ' ', '(', /\d/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/]}
            />
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
            <MaskInput
              keyboardType="numeric"
              placeholder="+7 (978) 697-84-75"
              value={phoneNumber}
              onChangeText={(masked, unmasked) => setPhoneNumber(masked)}
              style={inputClassName}
              mask={['+', '7', ' ', '(', /\d/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/]}
            />
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
        <TouchableOpacity
          disabled={isButtonDisabled}
          onPress={handleOrder}
          style={tw`rounded-lg p-3 w-[70%] shadow-xl absolute bottom-6 left-[15%] right-0 ml-auto mr-auto text-center flex justify-around flex-row items-center ${isButtonDisabled ? `bg-[${Colors.lightSlateGray}]` : `bg-[${Colors.main}]`} `}>
            {
              orderType === 'Доставка' && !isDeliveryTimeValid(new Date(), deliveryStart, deliveryEnd)
                ? <Text style={tw`text-xs font-bold text-white`}>Доставка работает с {deliveryStart}:00 до {deliveryEnd}:00</Text>
                : orderType === 'Самовывоз' && !isOrderTimeValid(new Date(), scheduleStart, scheduleEnd) ? (
                  <Text style={tw`text-sm font-bold text-white`}>Кафе работает с {scheduleStart}:00 до {scheduleEnd}:00</Text>
                ) : (
                  <>
                    <Text style={tw`text-sm font-bold text-white`}>Заказать:</Text>
                    <Text style={tw`text-sm font-bold text-white`}>{totalPrice} ₽</Text>
                  </>
                )
            }
        </TouchableOpacity>
        <OrderFinish orderValues={orderValues} shortDate={shortDate} shortTime={shortTime} finishVisible={finishVisible} setFinishVisible={setFinishVisible} setModalVisible={setModalVisible} />
    </View>
  );
};

export default OrderItems;
