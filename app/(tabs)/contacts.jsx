import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchContacts } from '../../redux/Features/contacts/contactsSlice';

const Contacts = () => {
  const dispatch = useDispatch();

  const contacts = useSelector((state) => state.contacts);
  const { phoneNumber, address, schedule } = contacts;

  const callToPhoneNumber = `tel:${phoneNumber}`

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch])

  if (contacts.status === 'loading') {
    return (
      <View className='w-full h-full flex justify-center items-center'>
        <Text className='text-dark dark:text-white'>Загрузка...</Text>
      </View>
    );
  }
  return (
    <ScrollView contentInsetAdjustmentBehavior="automatic">
      <View className="pt-6 w-full h-full flex flex-col items-start">
        <View className="w-full flex flex-col pl-3">
          <View сlassName="flex items-center mb-3">
            {/* <Image src="" style={tw`w-8 mr-4`} alt="phone" /> */}
            <View>
              <Text>Телефон</Text>
              <Text classNam="font-bold">{phoneNumber}</Text>
            </View>
          </View>

          <View сlassName="flex items-center mb-3">
            {/* <Image src="" style={tw`w-8 mr-4`} alt="address" /> */}
            <View>
              <Text>Адрес</Text>
              <Text classNam="font-bold">{address}</Text>
            </View>
          </View>

          <View сlassName="flex items-center mb-3">
            {/* <Image src="" style={tw`w-8 mr-4`} alt="clock" /> */}
            <View>
              <Text>Режим работы</Text>
              <Text classNam="font-bold">{schedule}</Text>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default Contacts;

const styles = StyleSheet.create({});
