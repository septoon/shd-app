import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import tw from 'twrnc';

const Contacts = () => {
  return (
    <ScrollView contentInsetAdjustmentBehavior="automatic">
      <View style={tw`pt-6 w-full h-full flex flex-col items-start`}>
        <View style={tw`w-full flex flex-col pl-3`}>
          <View style={tw`flex items-center mb-3`}>
            <Image src="" style={tw`w-8 mr-4`} alt="phone" />
            <View style={tw`flex flex-col`}>
              <Text>Телефон</Text>
              <Text style="font-bold">+ 7 (978) 879-62-20</Text>
            </View>
          </View>

          <View style={tw`flex items-center mb-3`}>
            <Image src="" style={tw`w-8 mr-4`} alt="address" />
            <View style={tw`flex flex-col`}>
              <Text>Адрес</Text>
              <Text style="font-bold">г. Алушта, ул. Ленина 13</Text>
            </View>
          </View>

          <View style={tw`flex items-center mb-3`}>
            <Image src="" style={tw`w-8 mr-4`} alt="clock" />
            <View style={tw`flex flex-col`}>
              <Text>Режим работы</Text>
              <Text style="font-bold">11:00 - 23:00</Text>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default Contacts;

const styles = StyleSheet.create({});
