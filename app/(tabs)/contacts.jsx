import React, { useEffect, useMemo, useCallback } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
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
  const Colors = useColors();

  // Выбор данных из Redux
  const { phoneNumber, address, scheduleStart, scheduleEnd, status, error } = useSelector(
    (state) => state.contacts
  );

  // Загружаем данные при монтировании компоненты
  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchContacts());
    }
  }, [dispatch, status]);

  // Мемоизация данных
  const contactInfo = useMemo(
    () => ({
      phoneNumber,
      address,
      scheduleStart,
      scheduleEnd,
    }),
    [phoneNumber, address, scheduleStart, scheduleEnd]
  );

  // Обработчик вызова телефона
  const handlePressToCall = useCallback(() => {
    pressToCall(contactInfo.phoneNumber);
  }, [contactInfo.phoneNumber]);

  // Обработка состояния загрузки
  if (status === 'loading') {
    return <PreLoader />;
  }

  // Обработка ошибки
  if (status === 'failed') {
    return (
      <View style={tw`flex-1 justify-center items-center`}>
        <Text style={[tw`text-center text-red-500`, { color: Colors.errorText }]}>
          Ошибка загрузки данных: {error}
        </Text>
      </View>
    );
  }

  // Рендер контактов
  return (
    <ScrollView contentInsetAdjustmentBehavior="automatic" style={tw`bg-[${Colors.darkModeBg}] p-4`}>
      <View style={tw`p-3 w-full h-full flex flex-col items-start justify-start bg-[${Colors.darkModeElBg}] rounded-xl`}>
        <View style={tw`w-full flex flex-col`}>
          {/* Блок с телефоном */}
          <View style={tw`flex-row items-center mb-4`}>
            <AntDesign name="contacts" size={28} style={tw`mr-4`} color={Colors.main} />
            <View>
              <Text style={tw`mb-1 text-[${Colors.darkModeText}]`}>Телефон:</Text>
              <TouchableOpacity onPress={handlePressToCall}>
                <Text style={tw`text-blue-500 font-bold`}>{contactInfo.phoneNumber}</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Блок с адресом */}
          <View style={tw`flex-row items-center mb-4`}>
            <Entypo name="address" size={28} style={tw`mr-4`} color={Colors.main} />
            <View>
              <Text style={tw`mb-1 text-[${Colors.darkModeText}]`}>Адрес:</Text>
              <Text style={tw`font-bold text-[${Colors.darkModeText}]`}>{contactInfo.address}</Text>
            </View>
          </View>

          {/* Блок с расписанием */}
          <View style={tw`flex-row items-center`}>
            <MaterialIcons name="schedule" size={28} style={tw`mr-4`} color={Colors.main} />
            <View>
              <Text style={tw`mb-1 text-[${Colors.darkModeText}]`}>Режим работы:</Text>
              <Text style={tw`font-bold text-[${Colors.darkModeText}]`}>
                {contactInfo.scheduleStart}:00 - {contactInfo.scheduleEnd}:00
              </Text>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default React.memo(Contacts);