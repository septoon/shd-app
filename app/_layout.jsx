import { Provider } from 'react-redux';
import React from 'react';
import { StyleSheet } from 'react-native';
import { store } from '../redux/store';
import PreLayout from '../components/PreLayout';

const _layout = () => {

  return (
    <Provider store={store}>
      <PreLayout />
    </Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default _layout;
