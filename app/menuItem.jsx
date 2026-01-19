import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal, Pressable, ActivityIndicator, Image } from 'react-native';
import tw from 'twrnc';

import AntDesign from '@expo/vector-icons/AntDesign';
import { useColors } from '../common/Colors';

const MenuItemDetails = ({ promotion, promotionCount, modalVisible, setModalVisible, selectedItem, handleDecrementDish, items, isItemInCart, setClickedItems, handleAddDish, imageLoading, setImageLoading}) => {
  const Colors = useColors()

  const imageClassName = tw`w-full h-[45%] rounded-[-12] bg-[${Colors.darkModeBg}]`
  return (
    <Modal
        animationType="slide"
        visible={modalVisible}
        style={tw`relative w-full h-full`}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
          {imageLoading[selectedItem.id] ? (
              <ActivityIndicator size={48} color={Colors.main} style={imageClassName} />
            ) : null}
            
          <Image
            onLoadStart={() => {
              setImageLoading(prev => ({ ...prev, [selectedItem.id]: true }));
            }}
            onLoadEnd={() => {
              setImageLoading(prev => ({ ...prev, [selectedItem.id]: false }));
            }} source={{ uri: selectedItem.image }} style={imageClassName}/>
        <Pressable style={tw`absolute top-2 right-2 w-10 h-10`} onPress={() => setModalVisible(!modalVisible)} >
          <AntDesign name="closecircle" size={26} color="#20B2AA" style={tw`absolute top-2 right-2 elevation-4`} />
        </Pressable>
      <View style={tw`flex bg-[${Colors.darkModeBg}] h-[60%] absolute top-[40%] justify-between w-full p-4 rounded-t-2xl pb-8`}>
        <View style={tw`w-full mb-4`}>
          <Text style={tw`text-lg text-[${Colors.darkModeText}] font-bold mb-4`}>{selectedItem.name}</Text>
          <Text style={tw`text-sm text-gray-500`}>
          {selectedItem.options ? (
            <>
              <Text style={tw`text-sm text-gray-500`}>{selectedItem.options || ''}</Text>
              <Text style={tw`text-sm text-gray-500`}>
                Средний вес ≈ {selectedItem.weight ? `${selectedItem.weight}г.` : 'N/A'}
              </Text>
            </>
          ) : (
            <Text style={tw`text-sm text-gray-500`}>
              Колличество: {selectedItem.serving || 'Не указано'}
            </Text>
          )}
          </Text>
          {
            selectedItem.description ? <Text style={tw`text-sm text-gray-500 mt-2`}>{selectedItem.description}</Text> : null
          }
          {
            promotion ? (
              <View style={tw`flex`}>
                <Text style={tw`text-sm mt-16 text-[${Colors.darkModeText}] line-through`}>{selectedItem.price} руб.</Text>
                <Text style={tw`text-xl font-bold text-[${Colors.darkModeText}]`}>{selectedItem.price * (1 - promotionCount / 100)} руб.</Text>
              </View>
            ) : (
              <Text style={tw`text-lg font-bold mt-16 text-[${Colors.darkModeText}]`}>{selectedItem.price} руб.</Text>
            )
          }
        </View>
        {
          selectedItem.onStop ? (
            <View style={tw`rounded-lg w-[70%] self-center flex justify-center items-center py-2 bg-[${Colors.lightSlateGray}]`}>
              <Text style={tw`text-white font-bold`}>Недоступно</Text>
            </View>
          ) : (
            <TouchableOpacity
                    style={tw`bg-[${Colors.main}] rounded-lg w-[70%] self-center`} elevation={8}
                    onPress={() => {
                      setClickedItems((prev) => ({
                        ...prev,
                        [selectedItem.id]: true,
                      }));
                      handleAddDish(selectedItem);
                    }}
                  >
                    {isItemInCart(selectedItem.id) ? (
                      <View
                        style={tw`w-full h-12 flex flex-row justify-between z-99`}
                      >
                        <TouchableOpacity
                          onPress={() => handleDecrementDish(selectedItem)}
                          style={tw`w-[30%] h-full flex items-center justify-center rounded-l-lg`}
                        >
                          <Text style={tw`text-white font-bold`}>-</Text>
                        </TouchableOpacity>
                        <View style={tw`w-[40%] h-full flex items-center justify-center`}>
                          <Text style={tw`text-white font-bold opacity-60`}>в корзине</Text>
                          <Text style={tw`text-white font-bold`}>
                            {items.find((i) => String(i.id) === String(selectedItem.id)).quantity} шт.
                          </Text>
                        </View>
                        <TouchableOpacity
                          onPress={() => handleAddDish(selectedItem)}
                          style={tw`w-[30%] h-full flex items-center justify-center rounded-r-lg`}
                        >
                          <Text style={tw`text-white font-bold`}>+</Text>
                        </TouchableOpacity>
                      </View>
                    ) : (
                      <View style={[styles.button, tw`bg-[${Colors.main}]`]}>
                        <Text style={styles.buttonText}>Добавить</Text>
                      </View>
                    )}
            </TouchableOpacity>
          )
        }
      </View>
      </Modal>
  );
};

export default React.memo(MenuItemDetails);

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 18,
    borderRadius: 12,
  },
  buttonText: {
    fontSize: 14,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  },
});