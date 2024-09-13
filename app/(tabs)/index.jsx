import React, { useState, useEffect } from 'react';
import { Image, RefreshControl, ScrollView, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { getData } from '../../common/getData';
import { useDispatch, useSelector } from 'react-redux';
import { selectCategory } from '../../common/selectors';
import { setSelectedCategory } from '../../redux/Features/menu/menuSlice';
import MenuItems from '../../components/MenuItems';
import { useOnAddDishes } from '../../common/dishActions'; // Импортируем функцию
import { initializeCart } from '../../redux/Features/cart/cartSlice';

const Menu = () => {
  const dispatch = useDispatch();
  const selectedCategory = useSelector(selectCategory);
  const [menuData, setMenuData] = useState({});
  const [loading, setLoading] = useState(true);
  const [loaded, setLoaded] = useState([]);

  const onAddDishes = useOnAddDishes();

  const [refreshing, setRefreshing] = React.useState(false);
  const fetchData = async () => {
    const data = await getData();
    if (data) {
      setMenuData(data);
      const firstCategory = Object.keys(data)[0]; // Получаем первую категорию
      dispatch(setSelectedCategory(firstCategory));
    }
    setLoading(false);
  };

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  useEffect(() => {
    fetchData();
    dispatch(initializeCart());
  }, []);

  // Обработчик для выбора категории
  const handleCategoryPress = (category) => {
    dispatch(setSelectedCategory(category));
  };

  return (
    <ScrollView
      contentInsetAdjustmentBehavior="automatic"
      style={styles.container}
      contentContainerStyle={styles.scrollView}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
    >
      <ScrollView horizontal className="flex flex-row w-full p-4">
        {Object.keys(menuData).map((category, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => handleCategoryPress(category)}
            style={[
              styles.category,
              { backgroundColor: selectedCategory === category ? '#ff6347' : '#fff' },
            ]}
          >
            <Image src={menuData[category][0].image} style={styles.categoryImage} />
            <Text
              style={[
                styles.categoryText,
                { color: selectedCategory === category ? '#fff' : '#000' },
              ]}
            >
              {category}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <ScrollView className="flex w-full p-4 mt-6">
        {selectedCategory && (
          <MenuItems
            menuData={menuData}
            loading={loading}
            selectedCategory={selectedCategory}
            loaded={loaded}
            setLoaded={setLoaded}
            onAddDishes={onAddDishes} // Передаем функцию добавления товара
          />
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