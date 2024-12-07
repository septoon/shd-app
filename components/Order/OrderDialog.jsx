import { Pressable, SafeAreaView, Text, View, Modal, Platform } from 'react-native';
import React, { useEffect, useState } from 'react';
import { AntDesign } from '@expo/vector-icons';
import tw from 'twrnc';

import SlideButton from './SlideButton';
import { useColors } from '../../common/Colors';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDelivery } from '../../redux/Features/delivery/deliverySlice';
import { setDateType } from '../../redux/Features/cart/dateSlice';

const OrderDialog = ({
  modalVisible,
  setModalVisible
}) => {

  const Colors = useColors();
  const dispatch = useDispatch();

  
  useEffect(() => {
    const isoDate = new Date().toISOString();
    dispatch(fetchDelivery());
    dispatch(setDateType(isoDate));
  }, [dispatch]);
  

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