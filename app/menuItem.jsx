import { useDispatch } from 'react-redux';
import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Modal, Pressable } from 'react-native';
import tw from 'twrnc';
import { addDishToCart, decrementDishFromCart } from '../redux/Features/cart/cartSlice';
import { Colors } from '../common/Colors';
import AntDesign from '@expo/vector-icons/AntDesign';

const MenuItemDetails = ({onAddDishes, modalVisible, setModalVisible, id, name, image, serving, options, price, weight, items, isItemInCart, clickedItems, setClickedItems, handleAddDish}) => {
  const dispatch = useDispatch();

  return (
    <Modal
        animationType="slide"
        presentationStyle="pageSheet"
        visible={modalVisible}
        style={tw`relative w-full h-full`}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <Image src={image} style={styles.itemImage} />
        <Pressable style={tw`absolute top-2 right-2 w-10 h-10`} onPress={() => setModalVisible(!modalVisible)} >
        <AntDesign name="closecircle" size={26} color="#e0e0e0" style={tw`absolute top-2 right-2 shadow-black`} />
        </Pressable>
      <View style={tw`flex bg-[${Colors.darkModeBg}] h-[60%] absolute top-[40%] justify-between w-full p-4 rounded-2xl pb-8`}>
        <View style={tw`w-full mb-4`}>
          <Text style={tw`text-lg text-[${Colors.darkModeText}] font-bold mb-4`}>{name}</Text>
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
        {clickedItems[id] && isItemInCart(id) ? (
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
              <Text style={tw`text-white font-bold`}>В корзине: {items.find(i => i.id === id).quantity}</Text>
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
  },
  buttonText: {
    fontSize: 14,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  },
});