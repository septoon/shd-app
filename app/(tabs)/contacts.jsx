import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import tw from 'twrnc';
import AntDesign from '@expo/vector-icons/AntDesign';
import Entypo from '@expo/vector-icons/Entypo';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

import { fetchContacts } from '../../redux/Features/contacts/contactsSlice';
import PreLoader from '../../components/PreLoader';
import { pressToCall } from '../../common/pressToCall';
import { useColors } from '../../common/Colors';

const Contacts = () => {
  const dispatch = useDispatch();

  const Colors = useColors()

  const contacts = useSelector((state) => state.contacts);
  const { phoneNumber, address, scheduleStart, scheduleEnd } = contacts;

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch])

  if (contacts.status === 'loading') {
    return <PreLoader />
  }
  return (
    <ScrollView contentInsetAdjustmentBehavior="automatic" style={tw`bg-[${Colors.darkModeBg}] p-4`}>
      <View style={tw`p-3 w-full h-full flex flex-col items-start justify-start bg-[${Colors.darkModeElBg}] rounded-xl`}>
        <View style={tw`w-full flex flex-col`}>
          <View style={tw`flex-row items-center mb-4`}>
            <AntDesign name="contacts" size={28} style={tw`mr-4`} color={Colors.main} />
            <View>
              <Text style={tw`mb-1 text-[${Colors.darkModeText}]`}>Телефон:</Text>
              <TouchableOpacity onPress={() => pressToCall(phoneNumber)}>
                <Text style={tw`text-blue-500 font-bold`}>{phoneNumber}</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={tw`flex-row items-center mb-4`}>
            <Entypo name="address" size={28} style={tw`mr-4`} color={Colors.main} />
            <View>
              <Text style={tw`mb-1 text-[${Colors.darkModeText}]`}>Адрес:</Text>
              <Text style={tw`font-bold text-[${Colors.darkModeText}]`}>{address}</Text>
            </View>
          </View>

          <View style={tw`flex-row items-center`}>
          <MaterialIcons name="schedule" size={28} style={tw`mr-4`} color={Colors.main} />
            <View>
              <Text style={tw`mb-1 text-[${Colors.darkModeText}]`}>Режим работы:</Text>
              <Text style={tw`font-bold text-[${Colors.darkModeText}]`}>{scheduleStart}:00 - {scheduleEnd}:00.</Text>
              
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default Contacts;

const styles = StyleSheet.create({});
