import { useDispatch, useSelector } from 'react-redux';
import React from 'react';
import { Stack, useSegments } from 'expo-router';
import { StyleSheet, Button } from 'react-native';
import { selectCategory } from '../common/selectors';
import ClearCartBtn from '../components/ClearCartBtn';
import DisplayItemsBtn from './DisplayItemsBtn';
import { Colors } from '../common/Colors';

const PreLayout = () => {
  const segments = useSegments(); // Получаем сегменты маршрута для динамического заголовка
  const selectedCategory = useSelector(selectCategory);

  // Определяем заголовки для каждого экрана
  const headerTitles = {
    index: 'Меню',
    delivery: 'Доставка',
    contacts: 'Контакты',
    cart: 'Корзина',
  };

  // Определяем текущий экран и заголовок по последнему сегменту
  const currentSegment = segments[segments.length - 1];
  const currentTitle = headerTitles[currentSegment] || 'Меню'; // Заголовок по умолчанию

  const RightComponent = () => {
    if(currentTitle === 'Корзина') {
      return <ClearCartBtn />
    } else if(currentTitle === 'Меню') {
      return<DisplayItemsBtn />
    }
  }

  return (
      <Stack>
        <Stack.Screen
          name="(tabs)"
          options={{
            headerTitle: currentTitle === 'Меню' ? `Меню: "${selectedCategory}"` : currentTitle, // Устанавливаем динамический заголовок
            headerBlurEffect: 'regular',
            headerTransparent: true,
            headerLargeTitle: false,
            headerShadowVisible: false,
            headerLargeTitleStyle: { color: Colors.main }, // Исправлено на корректный цвет
            headerLargeTitleShadowVisible: false,
            headerRight: currentTitle === 'Корзина' ? () => <ClearCartBtn /> : null,
            presentation: currentTitle === 'Корзина' ? 'modal' : null,
          }}
        />
        <Stack.Screen
          name="menuItem"
          options={{
            headerTitle: ''
          }}
        />
      </Stack>
  );
};

export default PreLayout;
