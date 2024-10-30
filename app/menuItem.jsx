import { useDispatch } from 'react-redux';
import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Modal, Pressable, ActivityIndicator } from 'react-native';
import tw from 'twrnc';
import { addDishToCart, decrementDishFromCart } from '../redux/Features/cart/cartSlice';

import AntDesign from '@expo/vector-icons/AntDesign';
import { useColors } from '../common/Colors';

const MenuItemDetails = ({ modalVisible, setModalVisible, id, name, image, serving, options, description, price, weight, items, isItemInCart, setClickedItems, handleAddDish, imageLoading, setImageLoading}) => {
  const dispatch = useDispatch();
  const Colors = useColors()

  const imageClassName = tw`shadow-inner w-full h-[45%] rounded-[-12] bg-[${Colors.darkModeBg}]`
  return (
    <Modal
        animationType="slide"
        presentationStyle="pageSheet"
        visible={modalVisible}
        style={tw`relative w-full h-full`}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
          {imageLoading[id] ? (
              <ActivityIndicator size="large" color={Colors.main} style={imageClassName} />
            ) : null}
            
          <Image 
            onLoadStart={() => {
              setImageLoading(prev => ({ ...prev, [id]: true })); // Устанавливаем загрузку для конкретного id
            }}
            onLoadEnd={() => {
              setImageLoading(prev => ({ ...prev, [id]: false })); // Отключаем загрузку для конкретного id
            }} src={image} style={imageClassName} />
        <Pressable style={tw`absolute top-2 right-2 w-10 h-10`} onPress={() => setModalVisible(!modalVisible)} >
        <AntDesign name="closecircle" size={26} color="#e0e0e0" style={tw`absolute top-2 right-2 shadow-black`} />
        </Pressable>
      <View style={tw`flex bg-[${Colors.darkModeBg}] h-[60%] absolute top-[40%] justify-between w-full p-4 rounded-2xl pb-8`}>
        <View style={tw`w-full mb-4`}>
          <Text style={tw`text-lg text-[${Colors.darkModeText}] font-bold mb-4`}>{name}</Text>
          <Text style={tw`text-sm text-gray-500`}>
          {options ? (
          <View style={tw``}>
            <Text style={tw`text-sm text-gray-500`}>{options}</Text>
            <Text style={tw`text-sm text-gray-500`}>
              Приблизительный вес: {weight}г.
            </Text>
          </View>
        ) : (
          <Text style={tw`text-sm text-gray-500`}>Колличество: {serving}</Text>
        )}
          </Text>
          {
            description ? <Text style={tw`text-sm text-gray-500 mt-2`}>{description}</Text> : null
          }
          <Text style={tw`text-lg font-bold mt-2 text-[${Colors.darkModeText}]`}>{price} руб.</Text>
        </View>
        <TouchableOpacity
                  style={tw`bg-[${Colors.main}] rounded-lg w-[70%] self-center shadow-2xl`}
                  onPress={() => {
                    setClickedItems(prev => ({
                      ...prev,
                      [id]: true, // Отмечаем товар как "нажатый"
                    }));
                    handleAddDish({
                      id,
                      name,
                      image,
                      serving,
                      options,
                      price,
                      weight
                    })
                  }}
                >
        {isItemInCart(id) ? (
            <View style={tw`w-full h-12 flex flex-row justify-between z-99`}>
              <TouchableOpacity onPress={() => dispatch(decrementDishFromCart({
                      id,
                      name,
                      image,
                      serving,
                      options,
                      price,
                      weight
                    }))} style={tw`w-[20%] h-full flex items-center justify-center bg-[${Colors.main}] rounded-l-lg`}>
                <Text style={tw`text-white font-bold`}>-</Text>
              </TouchableOpacity>
            <View style={tw`w-[40%] h-full flex items-center justify-center`}>
              <Text style={tw`text-white font-bold opacity-60`}>в корзине</Text>
              <Text style={tw`text-white font-bold`}> 
                {items.find(i => i.id === id).options ? items.find(i => i.id === id).serving * items.find(i => i.id === id).quantity + ' г.': items.find(i => i.id === id).quantity + ' шт.'} 
              </Text>
            </View>
            <TouchableOpacity onPress={() => dispatch(addDishToCart({
                      id,
                      name,
                      image,
                      serving,
                      options,
                      price,
                      weight
                    }))} style={tw`w-[20%] h-full flex items-center justify-center bg-[${Colors.main}] rounded-r-lg`}>
                <Text style={tw`text-white font-bold`}>+</Text>
            </TouchableOpacity>
        
          </View>
          ) : 
          (<View style={styles.button}><Text style={[styles.buttonText, tw`bg-[${Colors.main}]`]}>
            Добавить
          </Text></View>)
          }
          </TouchableOpacity>
      </View>
      </Modal>
  );
};

export default MenuItemDetails;

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 18,
    borderRadius: 12,
    elevation: 3,
  },
  buttonText: {
    fontSize: 14,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  },
});