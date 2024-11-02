import React, { useState, useEffect } from 'react';
import { ActivityIndicator, Image, RefreshControl, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { getData } from '../../common/getData';
import { useDispatch, useSelector } from 'react-redux';
import { selectCategory } from '../../common/selectors';
import { setSelectedCategory } from '../../redux/Features/menu/menuSlice';
import MenuItems from '../../components/MenuItems';
import { useOnAddDishes } from '../../common/dishActions'; // Импортируем функцию
import { initializeCart } from '../../redux/Features/cart/cartSlice';
import tw from 'twrnc';
import { loadToggleFromStorage } from '../../redux/Features/menu/toggleItemsDisplaySlice';
import * as Haptics from 'expo-haptics';

import PreLoader from '../../components/PreLoader';
import { useColors } from '../../common/Colors';
import { loadInitialOrderState } from '../../redux/Features/cart/orderSlice';

const Menu = () => {
  const dispatch = useDispatch();
  const Colors = useColors()
  const selectedCategory = useSelector(selectCategory);
  const [menuData, setMenuData] = useState({});
  const [loading, setLoading] = useState(true);
  const [categoryImageLoading, setCategoryImageLoading] = useState({});

  const onAddDishes = useOnAddDishes();

  const [refreshing, setRefreshing] = useState(false);
  const fetchData = async () => {
    const data = await getData();
    if (data) {
      setMenuData(data);
      const firstCategory = Object.keys(data)[0];
      dispatch(setSelectedCategory(firstCategory));
    }
    setLoading(false);
  };

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    fetchData();
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  useEffect(() => {
    fetchData();
    dispatch(loadInitialOrderState());
    dispatch(initializeCart());
    dispatch(loadToggleFromStorage());
  }, []);

  // Обработчик для выбора категории
  const handleCategoryPress = (category) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Soft)
    dispatch(setSelectedCategory(category));
  };

  return (
      loading === true ? <PreLoader /> : (

        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={tw`bg-[${Colors.darkModeBg}]`}
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
                { backgroundColor: selectedCategory === category ? Colors.main : Colors.darkModeElBg },
              ]}
            >
              <View style={tw`w-[72px] h-[72px] relative flex items-center justify-center bg-[${Colors.darkModeBg}] rounded-full mb-4`}>
                {categoryImageLoading[index] ? (
                  <ActivityIndicator size="small" color={Colors.main} style={styles.preloader} />
                ) : null}
                <Image
                  key={`${selectedCategory}-${index}`}
                  onLoadStart={() => {
                    setCategoryImageLoading(prev => ({ ...prev, [index]: true }))
                  }}
                  onLoadEnd={() => {
                    setCategoryImageLoading(prev => ({ ...prev, [index]: false }))
                  }} 
                  source={{ uri: menuData[category][0].image }}
                  style={styles.categoryImage} 
                />
              </View>
              <Text
                style={[
                  styles.categoryText,
                  { color: selectedCategory === category ? '#fff' : Colors.darkModeText },
                ]}
              >
                {category}
              </Text>
            </TouchableOpacity>
            ))}
          </ScrollView>
          <ScrollView style={tw`flex w-full p-4 mt-2`}>
            {selectedCategory && (
              <MenuItems
                menuData={menuData}
                loading={loading}
                selectedCategory={selectedCategory}
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
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
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