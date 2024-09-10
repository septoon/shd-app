import { useSelector } from 'react-redux';
import React from 'react';
import { Stack, useSegments } from 'expo-router';
import { StyleSheet } from 'react-native';
import { selectCategory } from '../common/selectors';

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
            headerLargeTitle: true,
            headerShadowVisible: false,
            headerLargeTitleStyle: { color: '#FB5a3c' }, // Исправлено на корректный цвет
            headerLargeTitleShadowVisible: false,
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
