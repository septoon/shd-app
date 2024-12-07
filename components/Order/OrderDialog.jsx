// components/Order/OrderDialog.jsx
import { Pressable, SafeAreaView, Text, View, Modal, Platform } from 'react-native';
import React, { useEffect, useState } from 'react';
import { AntDesign } from '@expo/vector-icons';
import tw from 'twrnc';
import * as Haptics from 'expo-haptics';

import SlideButton from './SlideButton';
import OrderItems from './OrderItems';
import { useColors } from '../../common/Colors';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDelivery } from '../../redux/Features/delivery/deliverySlice';
import { setDateType } from '../../redux/Features/cart/dateSlice'; // Исправлено название файла
import OrderButton from './OrderButton';
import { clearCart } from '../../redux/Features/cart/cartSlice';
import OrderFinish from './OrderFinish';
import { isDeliveryTimeValid, isOrderTimeValid } from '../../common/isDeliveryTimeValid';
import { sendOrder } from '../../common/sendOrder';
import { addOrderToHistoryAsync } from '../../redux/Features/cart/orderHistorySlice';

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

  const [showDate, setShowDate] = useState(false);
  const [orderValues, setOrderValues] = useState({});
  const onToggleSwitch = () => setShowDate(!showDate);
  const [finishVisible, setFinishVisible] = useState(false);
  const [isDisabledMessage, setIsDisabledMessage] = useState(false);
  const [checkEmptyField, setCheckEmptyField] = useState(false);
  
  useEffect(() => {
    const isoDate = new Date().toISOString();
    dispatch(fetchDelivery());
    dispatch(setDateType(isoDate));
  }, [dispatch]);
  
  const [pay, setPay] = useState('Наличные');
  
  const { selectedDate } = useSelector((state) => state.date);
  const { address, phoneNumber, comment } = useSelector((state) => state.order);
  const { paidDelivery, deliveryStart, deliveryEnd, minDeliveryAmount, deliveryCost } = useSelector((state) => state.delivery);
  const { scheduleStart, scheduleEnd } = useSelector((state) => state.contacts);

  const timeToValidate = showDate && selectedDate ? new Date(selectedDate) : new Date();

  const ordersCount = Math.floor(Math.random() * 99999999);

  const onClickClearCart = () => {
    dispatch(clearCart());
  };

  const isButtonDisabled =
    orderType === 'Доставка'
      ? 
      !phoneNumber || phoneNumber.length < 18 ||
        !address ||
        totalPrice < minDeliveryAmount ||
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
      // setOrderValues и onClickClearCart удалены, так как они не нужны для отправки заказа
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
      setFinishVisible(true);
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
        
      </SafeAreaView>
    </Modal>
  );
};

export default OrderDialog;