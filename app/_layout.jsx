import React from 'react';
import { Stack, useSegments } from 'expo-router';
import { SafeAreaView, StyleSheet } from 'react-native';
import tw from 'twrnc';

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
    <SafeAreaView style={styles.container}>
      <Stack>
        <Stack.Screen
          name="(tabs)"
          options={{ 
            headerTitle: currentTitle,  // Устанавливаем динамический заголовок
            headerLargeTitle: true,
            headerShadowVisible: false,
            headerLargeTitleStyle: { color: '#FB5a3c' },  // Исправлено на корректный цвет
            headerLargeTitleShadowVisible: false,
            headerStyle: { backgroundColor: 'white' },  // Цвет фона заголовка
          }}
        />
      </Stack>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',  // Цвет фона всего приложения
  },
});

export default _layout;