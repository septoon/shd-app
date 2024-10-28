import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Pressable } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import tw from 'twrnc';
import MenuItemDetails from '../app/menuItem';
import { useDispatch, useSelector } from 'react-redux';
import { addDishToCart, decrementDishFromCart } from '../redux/Features/cart/cartSlice';
import { useColors } from '../common/Colors';
import PreLoader from './PreLoader';

const MenuItem = ({ menuData, loading, selectedCategory, loaded, setLoaded, onAddDishes }) => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [clickedItems, setClickedItems] = useState({});
  const { items } = useSelector(state => state.cart);
  const Colors = useColors()

  const dispatch = useDispatch();

  const handlePress = (item) => {
    setSelectedItem(item);
  };

  const isItemInCart = (id) => {
    return items.find(item => item.id === id);
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
  };

  return (
    <View style={tw`w-full mb-8`}>
      {!loading && menuData[selectedCategory].map((item, index) => (
        <Pressable key={index} onPress={() => handlePress(item)} style={tw`mb-2`}>
          {loaded.includes(item.id) ? (
            <PreLoader />
          ) : (
            <Image source={{ uri: item.image }} style={styles.itemImage} />
          )}
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
          price={selectedItem.price}
          weight={selectedItem.weight}
          items={items}
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
  gradient: {
    width: '100%',
    height: 180,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlay: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  gradientText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
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