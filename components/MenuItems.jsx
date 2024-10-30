import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Pressable, ActivityIndicator } from 'react-native';
import tw from 'twrnc';
import MenuItemDetails from '../app/menuItem';
import { useDispatch, useSelector } from 'react-redux';
import * as Haptics from 'expo-haptics';
import { addDishToCart, decrementDishFromCart } from '../redux/Features/cart/cartSlice';
import { useColors } from '../common/Colors';

const MenuItem = ({ menuData, loading, selectedCategory, onAddDishes }) => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [clickedItems, setClickedItems] = useState({});
  const [imageLoading, setImageLoading] = useState({}); // объект для отслеживания загрузки каждого изображения
  const { items } = useSelector(state => state.cart);
  const Colors = useColors();

  const dispatch = useDispatch();

  useEffect(() => {
    setImageLoading({});
  }, [selectedCategory]);

  const handlePress = (item) => {
    setSelectedItem(item);
  };

  const isItemInCart = (id) => {
    return items.find(item => item.id === id);
  };

  const handleAddDish = (item) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    onAddDishes(
      item.id,
      item.name,
      item.image,
      item.serving,
      item.options,
      item.price,
      item.weight
    );
  };

  return (
    <View style={tw`w-full mb-8`}>
      {!loading && menuData[selectedCategory].map((item, index) => (
        <Pressable key={index} onPress={() => handlePress(item)} style={tw`mb-2`}>
          <View style={styles.imageContainer}>
            {imageLoading[item.id] ? (
              <ActivityIndicator size="large" color={Colors.main} style={styles.preloader} />
            ) : null}
            <Image key={`${selectedCategory}-${item.id}`}
              onLoadStart={() => {
                setImageLoading(prev => ({ ...prev, [item.id]: true })); // Устанавливаем загрузку для конкретного id
              }}
              onLoadEnd={() => {
                setImageLoading(prev => ({ ...prev, [item.id]: false })); // Отключаем загрузку для конкретного id
              }} 
              source={{ uri: item.image }} 
              style={styles.itemImage} 
            />
          </View>
          <View style={tw`flex justify-between w-full p-2`}>
            <View style={tw`w-full mb-4`}>
              <Text style={tw`text-xl font-bold mb-2 text-[${Colors.darkModeText}]`}>{item.name}</Text>
              {item.options ? (
                <>
                  <Text style={tw`text-sm text-gray-500`}>{item.options}</Text>
                  <Text style={tw`text-sm text-gray-500`}>
                    Приблизительный вес: {item.weight}г.
                  </Text>
                </>
              ) : (
                <Text style={tw`text-sm text-gray-500`}>Количество: {item.serving}</Text>
              )}
            </View>
            <View style={tw`w-full flex flex-row justify-between items-center h-10`}>
              <Text style={tw`text-lg font-bold mt-2 text-[${Colors.darkModeText}]`}>{item.price} руб.</Text>
              <TouchableOpacity
                style={tw`rounded-lg w-28`}
                onPress={() => {
                  setClickedItems(prev => ({
                    ...prev,
                    [item.id]: true,
                  }));
                  handleAddDish(item);
                }}
              >
                {isItemInCart(item.id) ? (
                  <View style={tw`w-full h-full flex flex-row justify-between z-99 bg-[${Colors.main}] rounded-lg`}>
                    <TouchableOpacity
                      onPress={() => dispatch(decrementDishFromCart(item))}
                      style={tw`w-[30%] h-full flex items-center justify-center rounded-l-lg`}
                    >
                      <Text style={tw`text-white font-bold`}>-</Text>
                    </TouchableOpacity>
                    <View style={tw`w-[40%] h-full flex items-center justify-center`}>
                      <Text style={tw`text-white font-bold`}>
                        {items.find(i => i.id === item.id).quantity}
                      </Text>
                    </View>
                    <TouchableOpacity
                      onPress={() => dispatch(addDishToCart(item))}
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
            </View>
          </View>
        </Pressable>
      ))}

      {selectedItem && (
        <MenuItemDetails
          modalVisible={!!selectedItem}
          setModalVisible={() => setSelectedItem(null)}
          id={selectedItem.id}
          name={selectedItem.name}
          image={selectedItem.image}
          serving={selectedItem.serving}
          options={selectedItem.options}
          description={selectedItem.description}
          price={selectedItem.price}
          weight={selectedItem.weight}
          items={items}
          setClickedItems={setClickedItems}
          isItemInCart={isItemInCart}
          handleAddDish={handleAddDish}
          imageLoading={imageLoading} setImageLoading={setImageLoading}
        />
      )}
    </View>
  );
};

export default MenuItem;

const styles = StyleSheet.create({
  itemImage: {
    width: '100%',
    height: 180,
    borderRadius: 12,
    marginBottom: 8,
  },
  imageContainer: {
    width: '100%',
    height: 180,
    borderRadius: 12,
    overflow: 'hidden',
    position: 'relative',
  },
  preloader: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    paddingHorizontal: 18,
    borderRadius: 8,
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