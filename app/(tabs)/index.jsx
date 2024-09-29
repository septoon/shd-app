import React, { useState, useEffect } from 'react';
import { Image, RefreshControl, ScrollView, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { getData } from '../../common/getData';
import { useDispatch, useSelector } from 'react-redux';
import { selectCategory } from '../../common/selectors';
import { setSelectedCategory } from '../../redux/Features/menu/menuSlice';
import MenuItems from '../../components/MenuItems';
import { useOnAddDishes } from '../../common/dishActions'; // Импортируем функцию
import { initializeCart } from '../../redux/Features/cart/cartSlice';
import tw from 'twrnc';
import { loadToggleFromStorage } from '../../redux/Features/menu/toggleItemsDisplaySlice';
import { Colors } from '../../common/Colors';
import { View } from 'moti';
import LottieView from 'lottie-react-native';

const Menu = () => {
  const dispatch = useDispatch();
  const selectedCategory = useSelector(selectCategory);
  const [menuData, setMenuData] = useState({});
  const [loading, setLoading] = useState(true);
  const [loaded, setLoaded] = useState([]);

  const animation = React.useRef(null);

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
    dispatch(loadToggleFromStorage());
  }, []);

  // Обработчик для выбора категории
  const handleCategoryPress = (category) => {
    dispatch(setSelectedCategory(category));
  };

  return (
      loading === true ? ( 
      <View style={tw`flex w-full h-full justify-center items-center`}>
          <LottieView
          autoPlay
          ref={animation}
          style={{
            width: 100,
            height: 100,
            backgroundColor: 'transparent',
          }}
          source={require('../../assets/loaders/Preloader.json')}
        />
      </View>
      ) : (

        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.container}
          contentContainerStyle={styles.scrollView}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        >
          <ScrollView horizontal style={tw`flex flex-row w-full p-4`}>
            {Object.keys(menuData).map((category, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => handleCategoryPress(category)}
                style={[
                  styles.category,
                  { backgroundColor: selectedCategory === category ? Colors.main : '#fff' },
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
          <ScrollView style={tw`flex w-full p-4 mt-6`}>
            {selectedCategory && (
              <MenuItems
                menuData={menuData}
                loading={loading}
                selectedCategory={selectedCategory}
                loaded={loaded}
                setLoaded={setLoaded}
                onAddDishes={onAddDishes}
              />
            )}
          </ScrollView>
        </ScrollView>
      )
    
  );
};

export default Menu;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
  },
  category: {
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