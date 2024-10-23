import { Linking, TouchableOpacity } from 'react-native';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import tw from 'twrnc';
import { fetchContacts } from '../../redux/Features/contacts/contactsSlice';
import { fetchDelivery } from '../../redux/Features/delivery/deliverySlice';
import { pressToCall } from '../../common/pressToCall';

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
    dispatch(fetchContacts());
    dispatch(fetchDelivery());
  }, [dispatch]);

  return (
    <ScrollView contentInsetAdjustmentBehavior="automatic">
      <View style={tw`px-4 pt-4 flex text-sm`}>
        {
          paidDelivery ? (
            <>
              <Text style={tw`text-l mb-3 font-semibold`}>
                Если сумма заказа превышает {minDeliveryAmount}р, доставка по городу бесплатная!
              </Text>

              <Text style={tw`text-l mb-3 font-semibold`}>
                Если сумма заказа меньше {minDeliveryAmount}р, стоимость доставки по городу - {deliveryCost}р.
              </Text>
            </>
          ) : (
            <>
              <Text style={tw`text-l mb-3 font-semibold`}>
                Минимальная сумма заказа, для оформления доставки - {minDeliveryAmount}р.
              </Text>

              <Text style={tw`text-l mb-3 font-semibold`}>
                Стоимость доставки по городу - бесплатная!
              </Text>

              <Text style={tw`text-l mb-3 font-semibold`}>
                Если сумма заказа, составляет менее {minDeliveryAmount}р, можете оформить самовывоз.
              </Text>
            </>
          )
        }

              <Text style={tw`text-l mb-3 font-semibold`}>
                Режим работы доставки: {deliveryStart}:00 - {deliveryEnd}:00.
              </Text>

        <Text style={tw`text-xl mb-3 font-semibold`}>Для осуществления заказа Вам необходимо:</Text>

        <Text>
          Оформить заказ на сайте: выбрать в меню интересующие вас блюда, добавить их в корзину,
          заполнить контактные данные в диалоговом окне и оформить заказ.
        </Text>
        <Text style={tw`mb-3`}>
          Или звонить по номеру
          <TouchableOpacity onPress={() => pressToCall(phoneNumber)}>
            <Text style={tw`text-blue-500 underline`}> {phoneNumber}</Text>
          </TouchableOpacity>
        </Text>
        <Text style={tw`mb-3`}>
          После получения заявки, в течение 10 минут, наш менеджер свяжется с вами по указанному
          номеру телефона для подтверждения заказа. С ним вы можете провести корректировку заказа и
          его стоимости, обсудить время доставки и прочие условия.
        </Text>
        <Text>
          ЕСЛИ НАШ МЕНЕДЖЕР НЕ СВЯЗАЛСЯ С ВАМИ В ТЕЧЕНИЕ 10 МИНУТ по указанному вами номеру
          телефона, подтверждение о приеме заказа – ваш заказ считается не принятым в обработку. В
          этом случае вам необходимо проконтролировать состояние заказа, позвонив по телефону
          <TouchableOpacity onPress={() => pressToCall(phoneNumber)}>
            <Text style={tw`text-blue-500 underline`}>{phoneNumber}.</Text>
          </TouchableOpacity>
        </Text>
        <Text style={tw`mb-6 font-bold`}>Оплата заказа происходит двумя способами:</Text>
        <View style={tw`w-full flex items-start`}>
          <Image src="" style={tw`w-8 mr-6`} alt="cash" />
          <Text style={tw`font-bold`}>Наличными</Text>
        </View>
        <View style={tw`w-full flex items-start`}>
          <Image src="" style={tw`w-8 mr-6`} alt="credit card" />
          <Text style={tw`font-bold`}>Банковской картой</Text>
        </View>
      </View>
      <View style={tw`w-full px-3 flex flex-col items-center`}></View>
    </ScrollView>
  );
};

export default Delivery;

const styles = StyleSheet.create({});
