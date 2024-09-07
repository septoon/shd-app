import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Tabs } from 'expo-router';
import TabBar from '../../components/TabBar';

const _layout = () => {
  return (
    <Tabs tabBar={(props) => <TabBar {...props} />}>
      <Tabs.Screen name="index" options={{ title: 'Главная' }} />
      <Tabs.Screen name="menu" options={{ title: 'Меню' }} />
      <Tabs.Screen name="delivery" options={{ title: 'Доставка' }} />
      <Tabs.Screen name="contacts" options={{ title: 'Контакты' }} />
      <Tabs.Screen name="cart" options={{ title: 'Корзина' }} />
    </Tabs>
  );
};

export default _layout;

const styles = StyleSheet.create({});
