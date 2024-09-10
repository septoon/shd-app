import { Button, Image, ScrollView, StyleSheet, Text, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';
import tw from 'twrnc';
import { getData } from '../../common/getData';
import { Skeleton } from 'moti/skeleton';
import { useNavigation } from 'expo-router';
import { useDispatch, useSelector } from 'react-redux';
import { addDishToCart } from '../../redux/Features/cart/cartSlice';
import { selectCategory } from '../../common/selectors';
import { setSelectedCategory } from '../../redux/Features/menu/menuSlice';
import MenuItem from '../../components/MenuItem';

const Menu = () => {
  const navigation = useNavigation();

  const dispatch = useDispatch();

  const selectedCategory = useSelector(selectCategory);

  const [menuData, setMenuData] = useState({});
  const [loading, setLoading] = useState(true);
  const [loaded, setLoaded] = useState([]);
  
  useEffect(() => {
    const fetchData = async () => {
      const data = await getData();
      if (data) {
        setMenuData(data);
        const firstCategory = Object.keys(data)[0]; // Получаем первую категорию
        dispatch(setSelectedCategory(firstCategory))
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  // Обработчик для выбора категории
  const handleCategoryPress = (category) => {
    dispatch(setSelectedCategory(category));
  };

  const onAddDishes = (id, name, image, serving, options, price) => {
    const obj = {
      id,
      name,
      image,
      serving,
      options,
      price,
    };
    dispatch(addDishToCart(obj));
  };

  return (
      <ScrollView contentInsetAdjustmentBehavior="automatic" style={styles.container}>
        <ScrollView horizontal style={tw`flex flex-row w-full p-4`}>
          {Object.keys(menuData).map((category, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => handleCategoryPress(category)}
              style={[
                styles.category,
                { backgroundColor: selectedCategory === category ? '#ff6347' : '#fff' },
              ]}>
              <Image src={menuData[category][0].image} style={styles.categoryImage} />
              <Text
                style={[
                  styles.categoryText,
                  { color: selectedCategory === category ? '#fff' : '#000' },
                ]}>
                {category}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
        <ScrollView style={tw`flex w-full p-4`}>
          {selectedCategory && (
            <MenuItem menuData={menuData} loading={loading} selectedCategory={selectedCategory} loaded={loaded} setLoaded={setLoaded} onAddDishes={onAddDishes} />
          )}
        </ScrollView>
      </ScrollView>
  );
};

export default Menu;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  category: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    width: 90,
    paddingTop: 16,
    paddingBottom: 16,
    marginRight: 16,
    borderRadius: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  categoryImage: {
    width: 72,
    height: 72,
    marginBottom: 16,
    borderRadius: '50%',
    shadowColor: '#000',
    shadowOffset: { width: 3, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  categoryText: {
    fontSize: 14,
  },
});
