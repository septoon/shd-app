import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { ActivityIndicator, RefreshControl, ScrollView, StyleSheet, Text, TouchableOpacity, Vibration, View } from 'react-native';

import { useDispatch, useSelector } from 'react-redux';
import { fetchMenuData, setSelectedCategory } from '../../redux/Features/menu/menuSlice';
import MenuItems from '../../components/MenuItems';
import { useOnAddDishes } from '../../common/dishActions';
import { initializeCart } from '../../redux/Features/cart/cartSlice';
import tw from 'twrnc';
import { fetchDelivery } from '../../redux/Features/delivery/deliverySlice';
import PreLoader from '../../components/PreLoader';
import { useColors } from '../../common/Colors';
import { initializeOrderHistory } from '../../redux/Features/cart/orderHistorySlice';
import { Image } from 'expo-image';

const Menu = () => {
  const dispatch = useDispatch();
  const Colors = useColors();
  const { menuData, status: menuStatus, error: menuError, selectedCategory } = useSelector((state) => state.menu);

  const {promotion, promotionCount} = useSelector((state) => state.delivery);
  
  const [categoryImageLoading, setCategoryImageLoading] = useState({});
  const [refreshing, setRefreshing] = useState(false);

  const onAddDishes = useOnAddDishes();

  const fetchData = useCallback(async () => {
    dispatch(fetchMenuData());
      const firstCategory = Object.keys(menuData)[0];
    }, [dispatch]);
    
    const onRefresh = useCallback(() => {
      setRefreshing(true);
      fetchData();
      dispatch(setSelectedCategory(firstCategory));
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, [fetchData]);

  useEffect(() => {
    fetchData();
    dispatch(initializeOrderHistory());
    dispatch(initializeCart());
    dispatch(fetchDelivery());
  }, [dispatch, fetchData]);
  const promotionMemo = useMemo(() => promotion, [promotion]);
  const promotionCountMemo = useMemo(() => promotionCount, [promotionCount]);

  const menuDataKeys = useMemo(() => Object.keys(menuData), [menuData]);
  const categoryImages = useMemo(() => {
    return menuDataKeys.reduce((acc, category) => {
      acc[category] = menuData[category]?.[0]?.image;
      return acc;
    }, {});
  }, [menuDataKeys, menuData]);

  const handleCategoryPress = useCallback((category) => {
    Vibration.vibrate();
    dispatch(setSelectedCategory(category));
  }, [dispatch]);

  if (menuStatus === 'failed') {
    return (
      <View style={tw`pt-10`}>
        <Text>Ошибка загрузки данных: {menuError}</Text>
        <TouchableOpacity onPress={fetchData}>
          <Text>Повторить</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return menuStatus === 'loading' ? <PreLoader /> : (
  <ScrollView
      contentInsetAdjustmentBehavior="automatic"
      style={tw`bg-[${Colors.darkModeBg}]`}
      contentContainerStyle={styles.scrollView}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
    >
      {
        promotionMemo && (
          <View style={tw`flex mt-2 bg-[${Colors.darkModeElBg}] rounded-md mx-4 p-4`} elevation={4}>
            <Text style={tw`text-2xl font-extrabold text-[${Colors.main}]`}>СКИДКА {promotionCountMemo}%</Text>
            <Text style={tw`text-[${Colors.darkModeText}]`}>На доставку и самовывоз</Text>
          </View>
        )
      }
      <ScrollView horizontal style={tw`flex flex-row w-full p-4`}>
        {menuDataKeys.map((category, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => handleCategoryPress(category)}
            style={[
              styles.category,
              { backgroundColor: selectedCategory === category ? Colors.main : Colors.darkModeElBg },
              index === menuDataKeys.length - 1 ? { marginRight: 35 } : null,
            ]}
          >
            <View style={tw`w-[72px] h-[72px] relative flex items-center justify-center bg-[${Colors.darkModeBg}] rounded-full mb-4`}>
              {categoryImageLoading[index] && (
                <ActivityIndicator size="small" color={Colors.main} style={styles.preloader} />
              )}
              <Image
                key={`${selectedCategory}-${index}`}
                onLoadStart={() => setCategoryImageLoading((prev) => ({ ...prev, [index]: true }))}
                onLoadEnd={() => setCategoryImageLoading((prev) => ({ ...prev, [index]: false }))}
                source={{ uri: categoryImages[category] }}
                style={[styles.categoryImage, tw`rounded-full`]}
                cachePolicy="disk"
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
      <ScrollView style={tw`flex w-full p-2 mt-2`}>
         {selectedCategory && (
          <MenuItems
            menuData={menuData}
            menuStatus={menuStatus}
            selectedCategory={selectedCategory}
            onAddDishes={onAddDishes}
            promotion={promotionMemo}
            promotionCount={promotionCountMemo}
          />
        )} 
      </ScrollView>
    </ScrollView>
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
    elevation: 4,
  },
  categoryImage: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    elevation: 3,
  },
  categoryText: {
    fontSize: 12,
  },
});