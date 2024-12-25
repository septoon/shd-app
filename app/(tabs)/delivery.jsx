import React, { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDelivery } from '../../redux/Features/delivery/deliverySlice';
import { pressToCall } from '../../common/pressToCall';
import { ScrollView, Text, View, TouchableOpacity } from 'react-native';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

import tw from 'twrnc';
import PreLoader from '../../components/PreLoader';
import { useColors } from '../../common/Colors';

const Delivery = () => {
  const dispatch = useDispatch();
  const Colors = useColors()

  const { phoneNumber } = useSelector((state) => state.contacts);
  const {promotion, promotionCount} = useSelector((state) => state.delivery);
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
  }, [dispatch]);

  const deliveryInfo = useMemo(
    () => ({
      paidDelivery,
      deliveryStart,
      deliveryEnd,
      minDeliveryAmount,
      deliveryCost,
      phoneNumber
    }),
    [paidDelivery, deliveryStart, deliveryEnd, minDeliveryAmount, deliveryCost, phoneNumber]
  );

  const promotionMemo = useMemo(() => promotion, [promotion]);
  const promotionCountMemo = useMemo(() => promotionCount, [promotionCount]);

  if (status === 'loading') {
    return <PreLoader />
  }

  if (status === 'failed') {
    return (
      <View>
        <Text>Ошибка: {error}</Text>
      </View>
    );
  }

  return (
    <ScrollView contentInsetAdjustmentBehavior="automatic" style={tw`bg-[${Colors.darkModeBg}] p-4`}>
       <View style={tw`p-3 w-full flex flex-col items-start justify-start bg-[${Colors.darkModeElBg}] rounded-xl`}>
        {deliveryInfo.paidDelivery ? (
          <>
            <Text style={tw`text-sm mb-3 font-semibold text-[${Colors.darkModeText}]`}>
              Если сумма заказа превышает {deliveryInfo.minDeliveryAmount}р, доставка по городу бесплатная!
            </Text>
            <Text style={tw`text-sm mb-3 font-semibold text-[${Colors.darkModeText}]`}>
              Если сумма заказа меньше {deliveryInfo.minDeliveryAmount}р, стоимость доставки по городу - {deliveryCost}р.
            </Text>
          </>
        ) : (
          <>
            <Text style={tw`text-sm mb-3 font-semibold text-[${Colors.darkModeText}]`}>
              Минимальная сумма заказа для оформления доставки - {deliveryInfo.minDeliveryAmount}р.
            </Text>
            <Text style={tw`text-sm mb-3 font-semibold text-[${Colors.darkModeText}]`}>
              Стоимость доставки по городу - бесплатная!
            </Text>
            <Text style={tw`text-sm mb-3 font-semibold text-[${Colors.darkModeText}]`}>
              Если сумма заказа составляет менее {deliveryInfo.minDeliveryAmount}р, можете оформить самовывоз.
            </Text>
          </>
        )}
        <Text style={tw`text-sm mb-3 font-semibold text-[${Colors.darkModeText}]`}>
          Режим работы доставки: {deliveryInfo.deliveryStart}:00 - {deliveryInfo.deliveryEnd}:00.
        </Text>
        </View>

        {
        promotionMemo && (
          <View style={tw`flex mt-2 bg-[${Colors.darkModeElBg}] rounded-xl p-4`}>
            <Text style={tw`text-2xl font-extrabold text-[${Colors.main}]`}>СКИДКА {promotionCountMemo}%</Text>
            <Text style={tw`text-[${Colors.darkModeText}]`}>На доставку и самовывоз</Text>
          </View>
        )
      }

        <Text style={tw`text-xl m-3 font-semibold text-[${Colors.darkModeText}]`}>Для осуществления заказа Вам необходимо:</Text>

        <View style={tw`p-3 w-full flex flex-col items-start justify-start bg-[${Colors.darkModeElBg}] rounded-xl`}>
        <Text style={tw`text-[${Colors.darkModeText}]`}>
          Оформить заказ на сайте: выбрать в меню интересующие вас блюда, добавить их в корзину,
          заполнить контактные данные в диалоговом окне и оформить заказ.
        </Text>
        <Text style={tw`mb-3 text-[${Colors.darkModeText}]`}>
          Или звонить по номеру
          <TouchableOpacity onPress={() => pressToCall(deliveryInfo.phoneNumber)}>
            <Text style={tw`text-blue-500 font-bold`}> {deliveryInfo.phoneNumber}</Text>
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
          этом случае вам необходимо проконтролировать состояние заказа, позвонив по телефону:
          <TouchableOpacity onPress={() => pressToCall(deliveryInfo.phoneNumber)}>
            <Text style={tw`text-blue-500 font-bold`}>{deliveryInfo.phoneNumber}.</Text>
          </TouchableOpacity>
        </Text>
        <Text style={tw`my-4 font-bold text-[${Colors.darkModeText}]`}>Оплата заказа происходит двумя способами:</Text>
        <View style={tw`w-full flex-row items-center mb-2`}>
          <MaterialCommunityIcons name="cash" size={24} style={tw`mr-2`} color={Colors.main} />
          <Text style={tw`font-bold text-[${Colors.darkModeText}]`}>Наличными</Text>
        </View>
        <View style={tw`w-full flex-row items-center`}>
        <MaterialCommunityIcons name="credit-card" size={24} style={tw`mr-2`} color={Colors.main} />
          <Text style={tw`font-bold text-[${Colors.darkModeText}]`}>Банковской картой</Text>
        </View>
        </View>
      <View style={tw`w-full px-3 flex flex-col items-center mb-20`}></View>
    </ScrollView>
  );
};

export default React.memo(Delivery);
