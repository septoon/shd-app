import { Pressable, SafeAreaView, Text, View, Modal, Platform, Alert, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import { AntDesign } from '@expo/vector-icons';
import tw from 'twrnc';
import * as Haptics from 'expo-haptics';

import SlideButton from './SlideButton';
import OrderItems from './OrderItems';
import { useColors } from '../../common/Colors';
import { useDispatch, useSelector } from 'react-redux';
import { setDateType } from '../../redux/Features/cart/dateSlice';
import OrderButton from './OrderButton';
import { clearCart } from '../../redux/Features/cart/cartSlice';
import { isDeliveryTimeValid, isOrderTimeValid } from '../../common/isDeliveryTimeValid';
import { addOrderToHistoryAsync } from '../../redux/Features/cart/orderHistorySlice';
import { sendOrder } from '../../common/sendOrder';
import { useRouter } from 'expo-router';
import PreLoader from '../PreLoader';

const OrderDialog = ({
  modalVisible,
  setModalVisible,
  orderType,
  items,
  totalCount,
  totalPrice,
  shortDate,
  shortTime
}) => {

  const Colors = useColors();
  const dispatch = useDispatch();
  const router = useRouter();

  const [showDate, setShowDate] = useState(false);
  const onToggleSwitch = () => setShowDate(!showDate);
  const [isDisabledMessage, setIsDisabledMessage] = useState(false);
  const [checkEmptyField, setCheckEmptyField] = useState(false);
  
  useEffect(() => {
    const isoDate = new Date().toISOString();
    
    dispatch(setDateType(isoDate));
  }, [dispatch]);
  
  const [pay, setPay] = useState('Наличные');
  
  const { selectedDate } = useSelector((state) => state.date);
  const { address, phoneNumber, comment } = useSelector((state) => state.order);
  const { paidDelivery, deliveryStart, deliveryEnd, minDeliveryAmount, deliveryCost } = useSelector((state) => state.delivery);
  const { scheduleStart, scheduleEnd } = useSelector((state) => state.contacts);
  const { status: deliveryStatus, error: deliveryError } = useSelector((state) => state.delivery);
  const timeToValidate = showDate && selectedDate ? new Date(selectedDate) : new Date();

  const ordersCount = Math.floor(Math.random() * 99999999);

  const isButtonDisabled =
    orderType === 'Доставка'
      ? 
      !phoneNumber || phoneNumber.length < 18 ||
        !address ||
        totalPrice < minDeliveryAmount && !paidDelivery ||
        !isDeliveryTimeValid(timeToValidate, deliveryStart, deliveryEnd)
      : 
      !phoneNumber || phoneNumber.length < 18 || !isOrderTimeValid(timeToValidate, scheduleStart, scheduleEnd);

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
      date: new Date().toISOString(),
    };
    
    if(isButtonDisabled) {
      Haptics.notificationAsync(
        Haptics.NotificationFeedbackType.Error
      );
      setCheckEmptyField(true);
      setIsDisabledMessage(true);
      
      setTimeout(() => {
        setCheckEmptyField(false);
        setIsDisabledMessage(false);
      }, 2000);
    } else {
      sendOrder(orderDetails);
      dispatch(clearCart());
      dispatch(addOrderToHistoryAsync(orderDetails));
      Alert.alert(
        'Спасибо за заказ',
        'В течение 10-ти минут с вами свяжется оператор для подтверждения заказа.',
        [{text: 'Мои заказы', onPress: () => router.push('/profile')}, { text: 'OK' }]
      );
      setModalVisible(false)
    }
  };

  return (
    <Modal
      animationType="slide"
      presentationStyle={Platform.OS === 'ios' ? "pageSheet" : "overFullScreen"}
      visible={modalVisible}
      onRequestClose={() => setModalVisible(false)}
    >
      <SafeAreaView style={tw`w-full h-full relative bg-[${Colors.darkModeBg}]`}>
        <View
          style={tw`z-99 bg-[${Colors.darkModeBg}]`}
        >
          <View
            style={tw`flex flex-row items-center justify-between h-16 px-2`}
          >
            <View style={tw`w-8 h-8`}></View>
            <Text style={tw`text-lg font-bold text-[${Colors.darkModeText}]`}>Оформление заказа</Text>
            <Pressable
              style={tw`w-8 h-8 mt-2`}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <AntDesign
                name="closecircle"
                size={26}
                color="#20B2AA"
                style={tw`shadow-black`}
              />
            </Pressable>
          </View>
          <SlideButton />
        </View>
        {deliveryStatus === 'loading' ? ( <PreLoader /> 
        ) : deliveryStatus === 'failed' ? (
        <View style={tw`flex-1 justify-center items-center bg-[${Colors.darkModeBg}] px-4`}>
          <Text style={tw`text-red-500 text-lg mb-4`}>Ошибка загрузки данных доставки:</Text>
          <Text style={tw`text-center text-[${Colors.darkModeText}]`}>{deliveryError}</Text>
          <TouchableOpacity
            onPress={() => {
              dispatch(fetchDelivery());
            }}
            style={tw`mt-6 bg-[${Colors.main}] px-4 py-2 rounded-lg`}
          >
            <Text style={tw`text-white text-lg`}>Попробовать снова</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <>
        <OrderItems
          totalCount={totalCount}
          items={items}
          totalPrice={totalPrice}
          orderType={orderType}
          shortDate={shortDate}
          shortTime={shortTime}
          setPay={setPay}
          minDeliveryAmount={minDeliveryAmount}
          deliveryCost={deliveryCost}
          showDate={showDate}
          onToggleSwitch={onToggleSwitch}
          address={address}
          phoneNumber={phoneNumber}
          comment={comment}
          checkEmptyField={checkEmptyField}
          totalWithDeliveryPrice={totalWithDeliveryPrice}
          pay={pay}
          paid={paid}
        />

        <OrderButton 
          minDeliveryAmount={minDeliveryAmount} 
          timeToValidate={timeToValidate}
          isOrderTimeValid={isOrderTimeValid}
          handleOrder={handleOrder}
          orderType={orderType}
          isDeliveryTimeValid={isDeliveryTimeValid}
          deliveryStart={deliveryStart}
          deliveryEnd={deliveryEnd}
          scheduleStart={scheduleStart}
          scheduleEnd={scheduleEnd}
          isButtonDisabled={isButtonDisabled}
          totalWithDeliveryPrice={totalWithDeliveryPrice}
          paid={paid}
          isDisabledMessage={isDisabledMessage}
          totalPrice={totalPrice} 
        />
        </>
        )}
      </SafeAreaView>
    </Modal>
  );
};

export default OrderDialog;