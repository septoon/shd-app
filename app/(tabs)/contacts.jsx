import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import React from 'react';

const Contacts = () => {
  return (
    <ScrollView contentInsetAdjustmentBehavior="automatic">
      <View className="pt-6 w-full h-full flex flex-col items-start">
        <View className="w-full flex flex-col pl-3">
          <View сlassName="flex items-center mb-3">
            {/* <Image src="" style={tw`w-8 mr-4`} alt="phone" /> */}
            <View>
              <Text>Телефон</Text>
              <Text classNam="font-bold">+ 7 (978) 879-62-20</Text>
            </View>
          </View>

          <View сlassName="flex items-center mb-3">
            {/* <Image src="" style={tw`w-8 mr-4`} alt="address" /> */}
            <View>
              <Text>Адрес</Text>
              <Text classNam="font-bold">г. Алушта, ул. Ленина 13</Text>
            </View>
          </View>

          <View сlassName="flex items-center mb-3">
            {/* <Image src="" style={tw`w-8 mr-4`} alt="clock" /> */}
            <View>
              <Text>Режим работы</Text>
              <Text classNam="font-bold">11:00 - 23:00</Text>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default Contacts;

const styles = StyleSheet.create({});
