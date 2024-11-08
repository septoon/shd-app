
import { Text, View, TouchableOpacity } from 'react-native';
import Modal from "react-native-modal";
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import tw from 'twrnc';
import AntDesign from '@expo/vector-icons/AntDesign';
import { useColors } from '../../common/Colors';
import { useDispatch } from 'react-redux';
import { addOrderToHistory } from '../../redux/Features/cart/orderHistorySlice';

const OrderFinish = ({
  orderValues,
  shortDate,
  shortTime,
  finishVisible,
  setFinishVisible,
  setModalVisible,
}) => {

  const Colors = useColors();
  const dispatch = useDispatch()
  const navigation = useNavigation();

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
      date: new Date().toISOString(),
    };

  const closeModals = () => {
    dispatch(addOrderToHistory(completedOrder))
    setFinishVisible(false);
    setModalVisible(false);
  };

  return (
    <Modal
      swipeDirection="down"
      onSwipeComplete={(e) => closeModals()}
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
      style={tw`absolute left-[-5] right-[-5] bottom-[-5] top-[70%] rounded-xl px-4 py-6 bg-[${Colors.darkModeBg}]`}
      >
      <View style={tw`w-full  flex-row items-center`}>
          <Text style={tw`text-lg font-bold mr-1 text-[${Colors.darkModeText}]`}>Спасибо за заказ</Text>
          <AntDesign name="checkcircle" size={16} color={Colors.main}/>
        </View>
        <View style={tw`flex flex-row justify-between items-center mt-5 py-2`}>
          <Text style={tw`text-sm text-left w-full text-[${Colors.darkModeText}]`}>
            В течение 10-ти минут с вами свяжется оператор для подтверждения заказа.
          </Text>
        </View>
        <TouchableOpacity style={tw`mt-4 rounded-md bg-[${Colors.historyBtn}] p-4 items-center`} onPress={() => {
          closeModals()
          navigation.navigate('profile')
        }}>
          
          <Text style={tw`text-sm text-white font-bold`}>История заказов</Text>
        </TouchableOpacity>
    </Modal>
  );
};

export default OrderFinish;
