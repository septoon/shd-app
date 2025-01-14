import { useDispatch } from 'react-redux';
import React, { useState, useCallback } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { setDateType } from '../../redux/Features/cart/dateSlice';
import tw from 'twrnc';
import { useColors } from '../../common/Colors';

const DatePicker = React.memo(({ shortDate, shortTime }) => {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const Colors = useColors();
  const dispatch = useDispatch();

  const showDatePicker = useCallback(() => {
    setDatePickerVisibility(true);
  }, []);

  const hideDatePicker = useCallback(() => {
    setDatePickerVisibility(false);
  }, []);

  const handleConfirm = useCallback(
    (date) => {
      dispatch(setDateType(date.toISOString()));
      hideDatePicker();
    },
    [dispatch, hideDatePicker]
  );

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
        display='spinner'
        mode="datetime"
        locale="ru_RU"
        minimumDate={new Date()}
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
    </View>
  );
});

export default DatePicker;