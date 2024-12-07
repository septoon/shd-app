import { Text, View, TouchableOpacity } from 'react-native';
import Modal from "react-native-modal";
import React from 'react';
import tw from 'twrnc';
import AntDesign from '@expo/vector-icons/AntDesign';
import { useColors } from '../../common/Colors';
import { useDispatch } from 'react-redux';
import { addOrderToHistory } from '../../redux/Features/cart/orderHistorySlice';
import { useRouter } from 'expo-router';

const OrderFinish = ({
  orderValues = {},
  shortDate,
  shortTime,
  finishVisible,
  setFinishVisible,
  setModalVisible,
}) => {

  const Colors = useColors();
  const dispatch = useDispatch();
  const router = useRouter();

  const {
    orderType,
    address,
    phoneNumber,
    comment,
    items = [],
    paid,
    totalPrice,
    totalWithDeliveryPrice,
    pay,
    checked,
  } = orderValues;

  const completedOrder = {
    ...orderValues,
    shortDate,
    shortTime,
    date: new Date().toISOString(),
  };

  const closeModals = () => {
    dispatch(addOrderToHistory(completedOrder));
    setFinishVisible(false);
    setModalVisible(false);
  };

  const handleNavigateToProfile = () => {
    closeModals();
    router.push('/profile');
  };

  return (
    <Modal
      swipeDirection="down"
      onSwipeComplete={closeModals}
      animationIn="bounceInUp"
      animationOut="bounceOutUp"
      animationInTiming={700}
      animationOutTiming={700}
      panResponderThreshold={9}
      hasBackdrop={true}
      backdropColor='#000'
      backdropOpacity={0.8}
      isVisible={finishVisible}
      onBackdropPress={closeModals}
      style={tw`flex justify-end m-0`}
    >
      <View style={tw`bg-[${Colors.darkModeBg}] rounded-t-xl px-4 pb-6`}>
        <View style={tw`flex-row items-center justify-between w-full overflow-hidden pt-4`}>
          <View style={tw`flex-row items-center`}>
            <Text style={tw`text-lg font-bold mr-1 text-[${Colors.darkModeText}]`}>Спасибо за заказ</Text>
            <AntDesign name="checkcircle" size={16} color={Colors.main}/>
          </View>
          <AntDesign 
            name="closecircle" 
            size={26} 
            color="#20B2AA" 
            onPress={closeModals} 
          />
        </View>
        <View style={tw`flex flex-row justify-between items-center mt-5 py-2`}>
          <Text style={tw`text-sm text-left w-full text-[${Colors.darkModeText}]`}>
            В течение 10-ти минут с вами свяжется оператор для подтверждения заказа.
          </Text>
        </View>
        <TouchableOpacity 
          style={tw`mt-4 rounded-md bg-[${Colors.historyBtn}] p-4 items-center`} 
          onPress={handleNavigateToProfile}
        >
          <Text style={tw`text-sm text-white font-bold`}>История заказов</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

export default OrderFinish;