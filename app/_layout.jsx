import React from 'react';
import { Stack, useRouter, useSegments } from 'expo-router';

const _layout = () => {
  const segments = useSegments();  // Получаем сегменты маршрута для динамического заголовка

  // Определяем заголовки для каждого экрана
  const headerTitles = {
    index: 'Главная',
    menu: 'Меню',
    delivery: 'Доставка',
    contacts: 'Контакты',
    cart: 'Корзина',
  };

  // Определяем текущий экран и заголовок по последнему сегменту
  const currentSegment = segments[segments.length - 1];
  const currentTitle = headerTitles[currentSegment] || 'Главная';  // Заголовок по умолчанию

  return (
    <Stack>
      <Stack.Screen
        name="(tabs)"
        options={{ 
          headerTitle: currentTitle,  // Устанавливаем динамический заголовок
          headerLargeTitle: true,
          headerShadowVisible: false,
          headerLargeTitleStyle: { color: '#FB5a3c' },  // Исправлено на корректный цвет
          headerLargeTitleShadowVisible: false,
          headerStyle: { backgroundColor: 'rgb(242, 242, 242)' },
        }}
      />
    </Stack>
  );
};

export default _layout;