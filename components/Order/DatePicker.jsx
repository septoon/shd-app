import { useDispatch } from 'react-redux';
import React, { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { setDateType } from '../../redux/Features/cart/dateSlece';
import  tw from 'twrnc';
import { Colors } from '../../common/Colors';

const DatePicker = ({shortDate, shortTime}) => {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const dispatch = useDispatch();

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    dispatch(setDateType(date))
    hideDatePicker();
  };

  return (
    <View>
      <TouchableOpacity onPress={showDatePicker} style={tw`flex flex-row`}>
        <View style={tw`py-2 px-3 rounded-lg mr-2 bg-[${Colors.bgInput}]`}>
          <Text>{shortDate}</Text>
        </View>
        <View style={tw`py-2 px-3 rounded-lg bg-[${Colors.bgInput}]`}>
          <Text>{shortTime}</Text>
        </View>
      </TouchableOpacity>
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        cancelTextIOS="Отменить"
        confirmTextIOS="Выбрать"
        display="inline"
        mode="datetime"
        locale="ru_RU"
        minimumDate={new Date()}
        minimumTime={new Date()}
        minuteInterval={10}
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
    </View>
  );
};

export default DatePicker;