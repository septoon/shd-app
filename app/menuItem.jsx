import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, PanResponder } from 'react-native';
import { useLocalSearchParams } from 'expo-router'; 
import tw from 'twrnc';
import { useOnAddDishes } from '../common/dishActions'; // Импорт функции

const MenuItemDetails = () => {
  const { id, name, image, price, options, serving, weight } = useLocalSearchParams();
  const onAddDishes = useOnAddDishes(); // Получаем функцию

  return (
    <View style={tw`relative h-full mb-4`}>
      <Image src={image} style={styles.itemImage} />
      <View style={tw`flex bg-white h-[60%] absolute top-[40%] justify-between w-full p-4 rounded-2xl pb-8`}>
        <View style={tw`w-full mb-4`}>
          <Text style={tw`text-lg font-bold mb-4`}>{name}</Text>
          <Text style={tw`text-sm text-gray-500`}>
          {options ? (
          <>
            <Text style={tw`text-sm text-gray-500`}>{options}</Text>
            <Text style={tw`text-sm text-gray-500`}>
              Приблизительный вес: {weight}г.
            </Text>
          </>
        ) : (
          <Text style={tw`text-sm text-gray-500`}>Колличество: {serving}</Text>
        )}
          </Text>
          <Text style={tw`text-lg font-bold mt-2`}>{price} руб.</Text>
        </View>
        <TouchableOpacity
          style={styles.button}
          onPress={() =>
            onAddDishes(id, name, image, serving, options, price)
          }
        >
          <Text style={styles.buttonText}>Добавить</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default MenuItemDetails;

const styles = StyleSheet.create({
  itemImage: {
    width: '100%',
    height: '45%',
    borderRadius: -12,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 18,
    borderRadius: 12,
    elevation: 3,
    backgroundColor: '#FB5a3c',
  },
  buttonText: {
    fontSize: 14,
    lineHeight: 21,
    fontWeight: 'regular',
    letterSpacing: 0.25,
    color: 'white',
  },
});