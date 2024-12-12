import { useDispatch } from 'react-redux';
import React, { useState } from 'react';
import { Platform, Text, TouchableOpacity, View } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { setDateType } from '../../redux/Features/cart/dateSlice';
import tw from 'twrnc';
import { useColors } from '../../common/Colors';

const DatePicker = ({ shortDate, shortTime }) => {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const Colors = useColors();
  const dispatch = useDispatch();

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    dispatch(setDateType(date.toISOString()));
    hideDatePicker();
  };

  const displayMode = Platform.OS === 'ios' ? 'inline' : 'spinner';

  return (
    <View>
      <TouchableOpacity onPress={showDatePicker} style={tw`flex flex-row`}>
        <View style={tw`py-2 px-3 rounded-lg mr-2 bg-[${Colors.darkModeInput}]`}>
          <Text style={tw`text-[${Colors.darkModeText}]`}>{shortDate}</Text>
        </View>
        <View style={tw`py-2 px-3 rounded-lg bg-[${Colors.darkModeInput}]`}>
          <Text style={tw`text-[${Colors.darkModeText}]`}>{shortTime}</Text>
        </View>
      </TouchableOpacity>
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        cancelTextIOS="Отменить"
        confirmTextIOS="Выбрать"
        display={displayMode}
        mode="datetime"
        locale="ru_RU"
        // Удаляем minimumTime и minuteInterval, чтобы избежать проблем на Android
        minimumDate={new Date()}
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
    </View>
  );
};

export default DatePicker;