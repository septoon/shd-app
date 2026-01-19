import React, { useEffect, useState, useMemo, useCallback } from 'react';
import {
  Pressable,
  SafeAreaView,
  Text,
  View,
  Modal,
  Platform,
  Alert,
  TouchableOpacity,
} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import tw from 'twrnc';

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
import { fetchDelivery } from '../../redux/Features/delivery/deliverySlice';
import { loadInitialOrderState } from '../../redux/Features/cart/orderSlice';

const OrderDialog = ({
  modalVisible,
  setModalVisible,
  selectedDate,
  items,
  totalCount,
  totalPrice,
  shortDate,
  shortTime,
}) => {
  const Colors = useColors();
  const dispatch = useDispatch();
  const router = useRouter();

  const [showDate, setShowDate] = useState(false);
  const onToggleSwitch = () => setShowDate(!showDate);
  const [isDisabledMessage, setIsDisabledMessage] = useState(false);
  const [checkEmptyField, setCheckEmptyField] = useState(false);
  const [pay, setPay] = useState('Наличные');

  const { orderType } = useSelector((state) => state.order);
  const { address, phoneNumber, comment } = useSelector((state) => state.order);
  const { paidDelivery, deliveryStart, deliveryEnd, minDeliveryAmount, deliveryCost } = useSelector(
    (state) => state.delivery
  );
  const { scheduleStart, scheduleEnd } = useSelector((state) => state.contacts);
  const { status: deliveryStatus, error: deliveryError } = useSelector((state) => state.delivery);

  const timeToValidate = useMemo(
    () => (showDate && selectedDate ? new Date(selectedDate) : new Date()),
    [showDate, selectedDate]
  );

  const ordersCount = useMemo(() => Math.floor(Math.random() * 99999999), []);

  const isButtonDisabled = useMemo(() => {
    if (orderType === 'Доставка') {
      return (
        !phoneNumber ||
        phoneNumber.length < 18 ||
        !address ||
        (totalPrice < minDeliveryAmount && !paidDelivery) ||
        !isDeliveryTimeValid(timeToValidate, deliveryStart, deliveryEnd)
      );
    }
    return (
      !phoneNumber ||
      phoneNumber.length < 18 ||
      !isOrderTimeValid(timeToValidate, scheduleStart, scheduleEnd)
    );
  }, [
    orderType,
    phoneNumber,
    address,
    totalPrice,
    minDeliveryAmount,
    paidDelivery,
    timeToValidate,
    deliveryStart,
    deliveryEnd,
    scheduleStart,
    scheduleEnd,
  ]);

  const totalWithDeliveryPrice = useMemo(() => deliveryCost + totalPrice, [deliveryCost, totalPrice]);
  const paid = useMemo(
    () => paidDelivery && totalPrice < minDeliveryAmount && orderType === 'Доставка',
    [paidDelivery, totalPrice, minDeliveryAmount, orderType]
  );

  const handlePrivacyPress = useCallback(() => {
    setModalVisible(false);
    router.push('/privacy');
  }, [router, setModalVisible]);

  const handleOrder = useCallback(() => {
    const dishes = items
      .map(
        (item) =>
          `${item.name} x ${
            item.options ? item.quantity * item.serving + 'г.' : item.quantity + 'шт.'
          }`
      )
      .join('\n');

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

    if (isButtonDisabled) {
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
        [
          { text: 'Мои заказы', onPress: () => router.push('/profile') },
          { text: 'OK' },
        ]
      );
      setModalVisible(false);
    }
  }, [
    items,
    orderType,
    address,
    phoneNumber,
    comment,
    paid,
    totalPrice,
    totalWithDeliveryPrice,
    pay,
    showDate,
    shortDate,
    shortTime,
    ordersCount,
    isButtonDisabled,
    dispatch,
    router,
    setModalVisible,
  ]);

  useEffect(() => {
    const isoDate = new Date().toISOString();
    dispatch(loadInitialOrderState());
    dispatch(setDateType(isoDate));
  }, [dispatch]);

  return (
    <Modal
      animationType="slide"
      presentationStyle={Platform.OS === 'ios' ? 'pageSheet' : 'overFullScreen'}
      visible={modalVisible}
      onRequestClose={() => setModalVisible(false)}
    >
      <SafeAreaView style={tw`w-full h-full relative bg-[${Colors.darkModeBg}]`}>
        <View style={tw`z-99 bg-[${Colors.darkModeBg}]`}>
          <View style={tw`flex flex-row items-center justify-between h-16 px-2`}>
            <View style={tw`w-8 h-8`} />
            <Text style={tw`text-lg font-bold text-[${Colors.darkModeText}]`}>Оформление заказа</Text>
            <Pressable
              style={tw`w-8 h-8 mt-2`}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <AntDesign name="closecircle" size={26} color="#20B2AA" style={tw`shadow-black`} />
            </Pressable>
          </View>
          <SlideButton />
        </View>
        {deliveryStatus === 'loading' ? (
          <PreLoader />
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
              onPrivacyPress={handlePrivacyPress}
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

export default React.memo(OrderDialog);
