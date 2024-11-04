import { StyleSheet } from 'react-native';
import React from 'react';
import { Tabs } from 'expo-router';
import TabBar from '../../components/TabBar';

const _layout = () => {
  return (
      <Tabs tabBar={(props) => <TabBar {...props} />}>
        <Tabs.Screen name="index" options={{ tabBarLabel: 'Меню', headerShown: false, }} />
        <Tabs.Screen name="delivery" options={{ tabBarLabel: 'Доставка', headerShown: false, }} />
        <Tabs.Screen name="contacts" options={{ tabBarLabel: 'Контакты', headerShown: false, }} />
        <Tabs.Screen name="cart" options={{ tabBarLabel: 'Корзина', tabBarVisible: false, headerShown: false, }} />
      </Tabs>
  );
};

export default _layout;

const styles = StyleSheet.create({});
