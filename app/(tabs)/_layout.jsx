import { StyleSheet } from 'react-native';
import React from 'react';
import { Tabs } from 'expo-router';
import TabBar from '../../components/TabBar';
import { Provider } from 'react-redux';
import { store } from '../../redux/store';

const _layout = () => {
  return (
    <Provider store={store}>
      <Tabs tabBar={(props) => <TabBar {...props} />}>
        <Tabs.Screen name="index" options={{ title: 'Меню' }} />
        <Tabs.Screen name="delivery" options={{ title: 'Доставка' }} />
        <Tabs.Screen name="contacts" options={{ title: 'Контакты' }} />
        <Tabs.Screen name="cart" options={{ title: 'Корзина' }} />
      </Tabs>
    </Provider>
  );
};

export default _layout;

const styles = StyleSheet.create({});
