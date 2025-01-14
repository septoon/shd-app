import React, { useEffect, useState } from 'react';
import {
  Pressable,
  SafeAreaView,
  Text,
  View,
  Modal,
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
import { isDeliveryTimeValid, isOrderTimeValid } from '../../common/isDeliveryTimeValid';
import { useRouter } from 'expo-router';
import PreLoader from '../PreLoader';
import { fetchDelivery } from '../../redux/Features/delivery/deliverySlice';
import { loadInitialOrderState } from '../../redux/Features/cart/orderSlice';
import useOrderDialog from '../../common/hooks/useOrderDialog';

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

  const {
    timeToValidate,
    ordersCount,
    isButtonDisabled,
    totalWithDeliveryPrice,
    paid,
    handleOrder,
  } = useOrderDialog({
    orderType,
    address,
    phoneNumber,
    totalPrice,
    minDeliveryAmount,
    paidDelivery,
    deliveryStart,
    deliveryEnd,
    scheduleStart,
    scheduleEnd,
    deliveryCost,
    pay,
    items,
    comment,
    selectedDate,
    dispatch,
    setModalVisible,
    router,
    setIsDisabledMessage,
    setCheckEmptyField
  });

  useEffect(() => {
    const isoDate = new Date().toISOString();
    dispatch(loadInitialOrderState());
    dispatch(setDateType(isoDate));
  }, [dispatch]);

  return (
    <Modal
      animationType="slide"
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
              <AntDesign name="closecircle" size={26} color="#20B2AA" elevation={4} />
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