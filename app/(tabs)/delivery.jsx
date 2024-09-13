import { Image, ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Delivery = () => {
  return (
    <ScrollView contentInsetAdjustmentBehavior="automatic">
      <View className="px-4 mb-8 flex text-sm">
        <Text className="text-xl mb-3 font-semibold">Для осуществления заказа Вам необходимо:</Text>

        <Text>
           Оформить заказ на сайте: выбрать в меню интересующие вас блюда, добавить их в корзину, заполнить контактные данные в диалоговом окне и оформить заказ.
        </Text>
        <Text className="mb-3">Или звонить по номеру +7 (978) 879-62-20</Text>
        <Text className="mb-3">
          После получения заявки, в течение 10 минут, наш менеджер свяжется с вами по указанному номеру телефона для подтверждения заказа. С ним вы можете провести корректировку заказа и его стоимости, обсудить время доставки и прочие условия.
        </Text>
        <Text>
          ЕСЛИ НАШ МЕНЕДЖЕР НЕ СВЯЗАЛСЯ С ВАМИ В ТЕЧЕНИЕ 10 МИНУТ по указанному вами номеру телефона, подтверждение о приеме заказа – ваш заказ считается не принятым в обработку. В этом случае вам необходимо проконтролировать состояние заказа, позвонив по телефону
          +7 (978) 879-62-20.
        </Text>
        <Text className="mb-6 font-bold">Оплата заказа происходит двумя способами:</Text>
        <View className="w-full flex items-start">
          <Image src='' className="w-8 mr-6" alt="cash" />
          <Text className="font-bold">Наличными</Text>
        </View>
        <View className="w-full flex items-start">
          <Image src='' className="w-8 mr-6" alt="credit card" />
          <Text className="font-bold">Банковской картой</Text>
        </View>
      </View>
      <View className="w-full px-3 flex flex-col items-center">
        
      </View>
    </ScrollView>
  )
}

export default Delivery

const styles = StyleSheet.create({})