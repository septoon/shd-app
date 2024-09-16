import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Pressable } from 'react-native';
import { Skeleton } from 'moti/skeleton';
import tw from 'twrnc';
import MenuItemDetails from '../app/menuItem';
import { useDispatch, useSelector } from 'react-redux';
import { addDishToCart, decrementDishFromCart } from '../redux/Features/cart/cartSlice';
import { Colors } from '../common/Colors';

const MenuItem = ({ menuData, loading, selectedCategory, loaded, setLoaded, onAddDishes }) => {
  const [selectedItem, setSelectedItem] = useState(null); // Сохраняем выбранный элемент
  const [clickedItems, setClickedItems] = useState({});
  const { items } = useSelector(state => state.cart);
  const { isEnabled } = useSelector(state => state.toggleItems)

  const dispatch = useDispatch()

  const handlePress = (item) => {
    setSelectedItem(item); // Устанавливаем выбранный элемент
  };

  const isItemInCart = (id) => {
    return items.find(item => item.id === id); // Проверяем, есть ли товар в корзине
  };

  const handleAddDish = (item) => {
    onAddDishes(
      item.id,
      item.name,
      item.image,
      item.serving,
      item.options,
      item.price,
      item.weight
    );
  }

  return (
    <View style={isEnabled ? tw`w-[40%]` : ''}>
      {!loading && menuData[selectedCategory].map((item, index) => (
        <Pressable key={index} onPress={() => handlePress(item)}>
          <View style={tw`bg-white mb-4 rounded-2xl shadow-lg`}>
            {loaded.includes(item.id) ? (
              <Image src={item.image} style={styles.itemImage} />
            ) : (
              <Skeleton colorMode="light" show>
                <Image
                  src={item.image}
                  onLoad={(e) => setLoaded((prev) => [...prev, item.id])}
                  style={styles.itemImage}
                />
              </Skeleton>
            )}
            <View style={tw`flex justify-between w-full p-4`}>
              <View style={tw`w-full mb-4`}>
                <Text style={tw`text-base mb-4`}>{item.name}</Text>
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
              <View style={tw`w-full flex ${isEnabled ? 'flex-col' : 'flex-row'} justify-between items-center h-10`}>
                <Text style={tw`text-lg font-bold mt-2`}>{item.price} руб.</Text>
                <TouchableOpacity
                  style={tw`bg-[${Colors.main}] rounded-lg w-28`}
                  onPress={() => {
                    setClickedItems(prev => ({
                      ...prev,
                      [item.id]: true, // Отмечаем товар как "нажатый"
                    }));
                    handleAddDish(item)
                  }}
                >
                    {clickedItems[item.id] && isItemInCart(item.id) ? (
                      <View style={tw`w-full h-full flex flex-row justify-between z-99`}>
                        <TouchableOpacity onPress={() => dispatch(decrementDishFromCart(item))} style={tw`w-[30%] border-r border-white h-full flex items-center justify-center bg-[${Colors.main}] rounded-lg`}>
                          <Text style={tw`text-white font-bold`}>-</Text>
                        </TouchableOpacity>
                      <View style={tw`w-[40%] h-full flex items-center justify-center`}>
                        <Text style={tw`text-white font-bold`}>{items.find(i => i.id === item.id).quantity}</Text>
                      </View>
                      <TouchableOpacity onPress={() => dispatch(addDishToCart(item))} style={tw`w-[30%] border-l border-white h-full flex items-center justify-center bg-[${Colors.main}] rounded-lg`}>
                          <Text style={tw`text-white font-bold`}>+</Text>
                      </TouchableOpacity>
                  
                    </View>
                    ) : 
                    (<View style={[styles.button, tw`bg-[${Colors.main}]`]}><Text style={styles.buttonText}>
                      Добавить
                    </Text></View>)
                    }
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Pressable>
      ))}

      {/* Модальное окно для выбранного элемента */}
      {selectedItem && (
        <MenuItemDetails
          onAddDishes={onAddDishes}
          modalVisible={!!selectedItem} // Показываем модальное окно только для выбранного элемента
          setModalVisible={() => setSelectedItem(null)} // Закрываем модальное окно
          id={selectedItem.id}
          name={selectedItem.name}
          image={selectedItem.image}
          serving={selectedItem.serving}
          options={selectedItem.options}
          price={selectedItem.price}
          weight={selectedItem.weight}
          items={items}
          clickedItems={clickedItems}
          setClickedItems={setClickedItems}
          isItemInCart={isItemInCart}
          handleAddDish={handleAddDish}
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
    fontWeight: 'regular',
    letterSpacing: 0.25,
    color: 'white',
  },
});