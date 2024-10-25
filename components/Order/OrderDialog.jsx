import { Modal, Pressable, Text, View } from 'react-native';
import React from 'react';
import { AntDesign } from '@expo/vector-icons';
import tw from 'twrnc';
import SlideButton from './SlideButton';
import OrderItems from './OrderItems';
import { Colors } from '../../common/Colors';

const OrderDialog = ({
  modalVisible,
  setModalVisible,
  orderType,
  items,
  totalCount,
  totalPrice,
  shortDate,
  shortTime,
}) => {
  return (
    <Modal
      animationType="slide"
      presentationStyle="pageSheet"
      visible={modalVisible}
      onRequestClose={() => setModalVisible(false)}
    >
      <View style={tw`w-full h-full relative bg-[${Colors.darkModeBg}]`}>
        <View
          style={tw`absolute left-0 top-0 z-99 bg-[${Colors.darkModeBg}] right-0`}
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
          setModalVisible={setModalVisible}
        />
      </View>
    </Modal>
  );
};

export default OrderDialog;