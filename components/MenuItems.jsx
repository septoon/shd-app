import React, { useEffect, useState, useMemo, useCallback } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Pressable, Animated, ActivityIndicator } from 'react-native';
import tw from 'twrnc';
import MenuItemDetails from '../app/menuItem';
import { useDispatch, useSelector } from 'react-redux';
import * as Haptics from 'expo-haptics';
import { addDishToCart, decrementDishFromCart } from '../redux/Features/cart/cartSlice';
import { useColors } from '../common/Colors';
import { Image } from 'expo-image';

const MenuItems = ({ menuData, loading, selectedCategory }) => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [clickedItems, setClickedItems] = useState({});
  const [imageLoading, setImageLoading] = useState({});
  const [scaleValues, setScaleValues] = useState([]);

  const { items } = useSelector((state) => state.cart);
  const Colors = useColors();
  const dispatch = useDispatch();

  useEffect(() => {
    setScaleValues(menuData[selectedCategory].map(() => new Animated.Value(1)));
    setImageLoading({});
  }, [selectedCategory, menuData]);

  const handlePress = useCallback((item) => setSelectedItem(item), []);

  // Исправленная функция проверки товара в корзине
  const isItemInCart = useCallback(
    (id) => items.some((item) => String(item.id) === String(id)),
    [items]
  );

  // Инкремент товара
  const handleAddDish = useCallback(
    (item) => {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
      dispatch(
        addDishToCart({
          id: String(item.id),
          name: String(item.name),
          image: String(item.image),
          serving: item.serving ? parseFloat(item.serving) : null,
          options: item.options ? String(item.options) : null,
          price: parseFloat(item.price),
          weight: item.weight ? parseFloat(item.weight) : null,
        })
      );
    },
    [dispatch]
  );

  // Декремент товара
  const handleDecrementDish = useCallback(
    (item) => {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      dispatch(
        decrementDishFromCart({
          id: String(item.id),
          price: parseFloat(item.price),
        })
      );
    },
    [dispatch]
  );

  const handlePressIn = useCallback(
    (index) => {
      if (scaleValues[index]) {
        Animated.spring(scaleValues[index], {
          toValue: 0.95,
          useNativeDriver: true,
        }).start();
      }
    },
    [scaleValues]
  );

  const handlePressOut = useCallback(
    (index) => {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Soft);
      if (scaleValues[index]) {
        Animated.spring(scaleValues[index], {
          toValue: 1,
          useNativeDriver: true,
        }).start();
      }
    },
    [scaleValues]
  );

  const itemsInCategory = useMemo(() => menuData[selectedCategory], [menuData, selectedCategory]);

  return (
    <View style={tw`w-full mb-8`}>
      {!loading &&
        itemsInCategory.map((item, index) => (
          <Pressable
            key={index}
            onPress={() => handlePress(item)}
            onPressIn={() => handlePressIn(index)}
            onPressOut={() => handlePressOut(index)}
            style={tw`mb-4`}
          >
            <Animated.View
              style={[
                tw`bg-[${Colors.darkModeElBg}] rounded-xl py-4 px-3`,
                { transform: [{ scale: scaleValues[index] || 1 }] },
              ]}
            >
              <View style={styles.imageContainer}>
                {imageLoading[item.id] && (
                  <ActivityIndicator size={48} color={Colors.main} style={styles.preloader} />
                )}
                <Image
                  key={`${selectedCategory}-${item.id}`}
                  onLoadStart={() => setImageLoading((prev) => ({ ...prev, [item.id]: true }))}
                  onLoadEnd={() => setImageLoading((prev) => ({ ...prev, [item.id]: false }))}
                  source={item.image}
                  style={styles.itemImage}
                  cachePolicy="disk"
                />
              </View>
              <View style={tw`flex justify-between w-full pt-2`}>
                <View style={tw`w-full mb-4`}>
                  <Text style={tw`text-xl font-bold mb-2 text-[${Colors.darkModeText}]`}>
                    {item.name}
                  </Text>
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
                  <Text style={tw`text-lg font-bold mt-2 text-[${Colors.darkModeText}]`}>
                    {item.price} руб.
                  </Text>
                  <TouchableOpacity
                    style={tw`rounded-lg w-28`}
                    onPress={() => {
                      setClickedItems((prev) => ({
                        ...prev,
                        [item.id]: true,
                      }));
                      handleAddDish(item);
                    }}
                  >
                    {isItemInCart(item.id) ? (
                      <View
                        style={tw`w-full h-full flex flex-row justify-between z-99 bg-[${Colors.main}] rounded-lg`}
                      >
                        <TouchableOpacity
                          onPress={() => handleDecrementDish(item)}
                          style={tw`w-[30%] h-full flex items-center justify-center rounded-l-lg`}
                        >
                          <Text style={tw`text-white font-bold`}>-</Text>
                        </TouchableOpacity>
                        <View style={tw`w-[40%] h-full flex items-center justify-center`}>
                          <Text style={tw`text-white font-bold`}>
                            {items.find((i) => String(i.id) === String(item.id)).quantity}
                          </Text>
                        </View>
                        <TouchableOpacity
                          onPress={() => handleAddDish(item)}
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
            </Animated.View>
          </Pressable>
        ))}

      {selectedItem && (
        <MenuItemDetails
          modalVisible={!!selectedItem}
          setModalVisible={() => setSelectedItem(null)}
          selectedItem={selectedItem}
          items={items}
          setClickedItems={setClickedItems}
          isItemInCart={isItemInCart}
          handleAddDish={handleAddDish}
          handleDecrementDish={handleDecrementDish}
          imageLoading={imageLoading}
          setImageLoading={setImageLoading}
        />
      )}
    </View>
  );
};

export default MenuItems;

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