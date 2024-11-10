import { Pressable, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { AntDesign } from '@expo/vector-icons';
import tw from 'twrnc';
import Modal from 'react-native-modal';

import SlideButton from './SlideButton';
import OrderItems from './OrderItems';
import { useColors } from '../../common/Colors';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDelivery } from '../../redux/Features/delivery/deliverySlice';
import { setDateType } from '../../redux/Features/cart/dateSlece';

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

  const Colors = useColors()
  const dispatch = useDispatch();

  const [showDate, setShowDate] = useState(false);
  const [orderValues, setOrderValues] = useState({});
  const onToggleSwitch = () => setShowDate(!showDate);
  const [checkEmptyField, setCheckEmptyField] = useState(false)
  
  useEffect(() => {
    const isoDate = new Date().toISOString();
    dispatch(fetchDelivery())
    dispatch(setDateType(isoDate));
  }, []);
  
  const [pay, setPay] = useState('Наличные');
  
  const {address, phoneNumber, comment} = useSelector((state) => state.order)
  const { paidDelivery, deliveryStart, deliveryEnd, minDeliveryAmount, deliveryCost } = useSelector((state) => state.delivery);


  
  const paid = paidDelivery && totalPrice < minDeliveryAmount && orderType === 'Доставка';


  return (
    <Modal
      isVisible={modalVisible}
      onBackdropPress={() => setModalVisible(false)}
      useNativeDriver={true}
      style={tw`m-0`}
    >
      <View style={tw`w-full h-full relative bg-[${Colors.darkModeBg}]`}>
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
        <OrderItems
          totalCount={totalCount}
          items={items}
          totalPrice={totalPrice}
          orderType={orderType}
          shortDate={shortDate}
          shortTime={shortTime}
          setPay={setPay}
          minDeliveryAmount={minDeliveryAmount}
          paidDelivery={paidDelivery}
          showDate={showDate}
          onToggleSwitch={onToggleSwitch}
          address={address}
          phoneNumber={phoneNumber}
          comment={comment}
          checkEmptyField={checkEmptyField}
          pay={pay}
          paid={paid}
          orderValues={orderValues}
        />

        </View>
    </Modal>
  );
};

export default OrderDialog;