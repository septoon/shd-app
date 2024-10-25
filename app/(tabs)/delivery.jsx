import { Linking, TouchableOpacity } from 'react-native';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import tw from 'twrnc';
import { fetchContacts } from '../../redux/Features/contacts/contactsSlice';
import { fetchDelivery } from '../../redux/Features/delivery/deliverySlice';
import { pressToCall } from '../../common/pressToCall';
import { Colors } from '../../common/Colors';

const Delivery = () => {
  const dispatch = useDispatch();
  const { phoneNumber } = useSelector((state) => state.contacts);
  const {
    paidDelivery,
    deliveryStart,
    deliveryEnd,
    minDeliveryAmount,
    deliveryCost,
    status,
    error,
  } = useSelector((state) => state.delivery);

  useEffect(() => {
    dispatch(fetchDelivery());
    dispatch(fetchContacts());
  }, [dispatch]);

  return (
    <ScrollView contentInsetAdjustmentBehavior="automatic" style={tw`bg-[${Colors.darkModeBg}]`}>
      <View style={tw`px-4 pt-4 flex text-sm`}>
        {
          paidDelivery ? (
            <>
              <Text style={tw`text-sm mb-3 font-semibold text-[${Colors.darkModeText}]`}>
                Если сумма заказа превышает {minDeliveryAmount}р, доставка по городу бесплатная!
              </Text>

              <Text style={tw`text-sm mb-3 font-semibold text-[${Colors.darkModeText}]`}>
                Если сумма заказа меньше {minDeliveryAmount}р, стоимость доставки по городу - {deliveryCost}р.
              </Text>
            </>
          ) : (
            <>
              <Text style={tw`text-sm mb-3 font-semibold text-[${Colors.darkModeText}]`}>
                Минимальная сумма заказа, для оформления доставки - {minDeliveryAmount}р.
              </Text>

              <Text style={tw`text-sm mb-3 font-semibold text-[${Colors.darkModeText}]`}>
                Стоимость доставки по городу - бесплатная!
              </Text>

              <Text style={tw`text-sm mb-3 font-semibold text-[${Colors.darkModeText}]`}>
                Если сумма заказа, составляет менее {minDeliveryAmount}р, можете оформить самовывоз.
              </Text>
            </>
          )
        }

              <Text style={tw`text-sm mb-3 font-semibold text-[${Colors.darkModeText}]`}>
                Режим работы доставки: {deliveryStart}:00 - {deliveryEnd}:00.
              </Text>

        <Text style={tw`text-xl mb-3 font-semibold text-[${Colors.darkModeText}]`}>Для осуществления заказа Вам необходимо:</Text>

        <Text style={tw`text-[${Colors.darkModeText}]`}>
          Оформить заказ на сайте: выбрать в меню интересующие вас блюда, добавить их в корзину,
          заполнить контактные данные в диалоговом окне и оформить заказ.
        </Text>
        <Text style={tw`mb-3 text-[${Colors.darkModeText}]`}>
          Или звонить по номеру
          <TouchableOpacity onPress={() => pressToCall(phoneNumber)}>
            <Text style={tw`text-blue-500 underline`}> {phoneNumber}</Text>
          </TouchableOpacity>
        </Text>
        <Text style={tw`mb-3 text-[${Colors.darkModeText}]`}>
          После получения заявки, в течение 10 минут, наш менеджер свяжется с вами по указанному
          номеру телефона для подтверждения заказа. С ним вы можете провести корректировку заказа и
          его стоимости, обсудить время доставки и прочие условия.
        </Text>
        <Text style={tw`text-[${Colors.darkModeText}]`}>
          ЕСЛИ НАШ МЕНЕДЖЕР НЕ СВЯЗАЛСЯ С ВАМИ В ТЕЧЕНИЕ 10 МИНУТ по указанному вами номеру
          телефона, подтверждение о приеме заказа – ваш заказ считается не принятым в обработку. В
          этом случае вам необходимо проконтролировать состояние заказа, позвонив по телефону
          <TouchableOpacity onPress={() => pressToCall(phoneNumber)}>
            <Text style={tw`text-blue-500 underline text-[${Colors.darkModeText}]`}>{phoneNumber}.</Text>
          </TouchableOpacity>
        </Text>
        <Text style={tw`mb-6 font-bold text-[${Colors.darkModeText}]`}>Оплата заказа происходит двумя способами:</Text>
        <View style={tw`w-full flex items-start`}>
          <Image src="" style={tw`w-8 mr-6`} alt="cash" />
          <Text style={tw`font-bold text-[${Colors.darkModeText}]`}>Наличными</Text>
        </View>
        <View style={tw`w-full flex items-start`}>
          <Image src="" style={tw`w-8 mr-6`} alt="credit card" />
          <Text style={tw`font-bold text-[${Colors.darkModeText}]`}>Банковской картой</Text>
        </View>
      </View>
      <View style={tw`w-full px-3 flex flex-col items-center`}></View>
    </ScrollView>
  );
};

export default Delivery;

const styles = StyleSheet.create({});
