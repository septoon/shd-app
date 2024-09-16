import { useDispatch, useSelector } from 'react-redux';
import React from 'react';
import { Stack, useSegments } from 'expo-router';
import { StyleSheet, Button } from 'react-native';
import { selectCategory } from '../common/selectors';
import ClearCartBtn from '../components/ClearCartBtn';

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

  return (
      <Stack>
        <Stack.Screen
          name="(tabs)"
          options={{
            headerTitle: currentTitle === 'Меню' ? `Меню: "${selectedCategory}"` : currentTitle, // Устанавливаем динамический заголовок
            headerBlurEffect: 'regular',
            headerTransparent: true,
            headerLargeTitle: currentTitle === 'Корзина' ? false : true,
            headerShadowVisible: false,
            headerLargeTitleStyle: { color: '#FB5a3c' }, // Исправлено на корректный цвет
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default PreLayout;
