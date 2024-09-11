import React from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { useLocalSearchParams } from 'expo-router'; // Используем useLocalSearchParams
import { Skeleton } from 'moti/skeleton';
import tw from 'twrnc';

const MenuItemDetails = () => {
  const { id, name, image, price, options, serving, weight, loaded, setLoaded, onAddDishes } = useLocalSearchParams();

  return (
    <View style={tw`relative h-full mb-4`}>
    {loaded ? (
      <Image src={image} style={styles.itemImage} />
    ) : (
      <Skeleton colorMode="light" show>
        <Image
          src={image}
          onLoad={(e) => setLoaded((prev) => [...prev, item.id])}
          style={styles.itemImage}
        />
      </Skeleton>
    )}
    <View style={tw`flex bg-white h-[60%] absolute top-[40%] justify-between w-full p-4 rounded-2xl pb-8`}>
      <View style={tw`w-full mb-4`}>
        <Text style={tw`text-lg font-bold mb-4`}>{name}</Text>
      
      <View style={tw`w-full flex flex-row justify-between items-center h-10`}>
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
        <Text style={tw`text-lg font-bold mt-2`}>{price} руб.</Text>
      </View>
      </View>
        <TouchableOpacity
          style={styles.button}
          onPress={() =>
            onAddDishes(
              id,
              name,
              image,
              serving,
              options,
              price,
            )
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