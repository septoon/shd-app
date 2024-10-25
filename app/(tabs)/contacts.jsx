import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import tw from 'twrnc';
import { fetchContacts } from '../../redux/Features/contacts/contactsSlice';
import PreLoader from '../../components/PreLoader';
import { pressToCall } from '../../common/pressToCall';
import { Colors } from '../../common/Colors';

const Contacts = () => {
  const dispatch = useDispatch();

  const contacts = useSelector((state) => state.contacts);
  const { phoneNumber, address, scheduleStart, scheduleEnd } = contacts;

  const callToPhoneNumber = `tel:${phoneNumber}`

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch])

  if (contacts.status === 'loading') {
    return <PreLoader />
  }
  return (
    <ScrollView contentInsetAdjustmentBehavior="automatic" style={tw`bg-[${Colors.darkModeBg}]`}>
      <View style={tw`pt-4 w-full h-full flex flex-col items-start justify-start`}>
        <View style={tw`w-full flex flex-col pl-3`}>
          <View style={tw`flex items-center mb-3`}>
            {/* <Image src="" style={tw`w-8 mr-4`} alt="phone" /> */}
            <View>
              <Text style={tw`text-[${Colors.darkModeText}]`}>Телефон</Text>
              <TouchableOpacity onPress={() => pressToCall(phoneNumber)}>
                <Text style={tw`text-blue-500 underline`}>{phoneNumber}</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={tw`flex items-center mb-3`}>
            {/* <Image src="" style={tw`w-8 mr-4`} alt="address" /> */}
            <View>
              <Text style={tw`text-[${Colors.darkModeText}]`}>Адрес</Text>
              <Text style={tw`font-bold text-[${Colors.darkModeText}]`}>{address}</Text>
            </View>
          </View>

          <View style={tw`flex items-center mb-3`}>
            {/* <Image src="" style={tw`w-8 mr-4`} alt="clock" /> */}
            <View>
              <Text style={tw`text-[${Colors.darkModeText}]`}>Режим работы</Text>
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
