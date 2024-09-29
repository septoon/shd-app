import { useDispatch } from 'react-redux';
import React, { useState } from "react";
import { Button, View } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { setDateType } from '../../redux/Features/cart/dateSlece';

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

  console.log(typeof shortDate)

  return (
    <View>
      <Button title={shortDate + shortTime} onPress={showDatePicker} />
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        cancelTextIOS="Отменить"
        confirmTextIOS="Выбрать"
        display="inline"
        mode="datetime"
        locale="ru_RU"
        minimumDate={new Date()}
        minimumTime={new Date()}
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
    </View>
  );
};

export default DatePicker;