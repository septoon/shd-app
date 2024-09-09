import { Image, ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import tw from 'twrnc';

const Delivery = () => {
  return (
    <ScrollView contentInsetAdjustmentBehavior="automatic">
      <View style={tw`px-4 mb-8 flex flex-col text-sm`}>
        <Text style={tw`text-xl mb-3 font-semibold`}>Для осуществления заказа Вам необходимо:</Text>

        <Text>
           Оформить заказ на сайте: выбрать в меню интересующие вас блюда, добавить их в корзину, заполнить контактные данные в диалоговом окне и оформить заказ.
        </Text>
        <Text style={tw`mb-3`}>Или звонить по номеру +7 (978) 879-62-20</Text>
        <Text  style={tw`mb-3`}>
          После получения заявки, в течение 10 минут, наш менеджер свяжется с вами по указанному номеру телефона для подтверждения заказа. С ним вы можете провести корректировку заказа и его стоимости, обсудить время доставки и прочие условия.
        </Text>
        <Text style={tw`flex flex-col`}>
          ЕСЛИ НАШ МЕНЕДЖЕР НЕ СВЯЗАЛСЯ С ВАМИ В ТЕЧЕНИЕ 10 МИНУТ по указанному вами номеру телефона, подтверждение о приеме заказа – ваш заказ считается не принятым в обработку. В этом случае вам необходимо проконтролировать состояние заказа, позвонив по телефону
          +7 (978) 879-62-20.
        </Text>
        <Text style={tw`mb-6 font-bold`}>Оплата заказа происходит двумя способами:</Text>
        <View style={tw`w-full flex items-center mb-3`}>
          <Image src='' style={tw`w-8 mr-6`} alt="cash" />
          <Text style={tw`font-bold`}>Наличными</Text>
        </View>
        <View style={tw`w-full flex items-center`}>
          <Image src=''  style={tw`w-8 mr-6`} alt="credit card" />
          <Text style={tw`font-bold`}>Банковской картой</Text>
        </View>
      </View>
      <View style={tw`w-full px-3 flex flex-col items-center`}>
        
      </View>
    </ScrollView>
  )
}

export default Delivery

const styles = StyleSheet.create({})