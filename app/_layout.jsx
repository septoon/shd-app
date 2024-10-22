import { Provider } from 'react-redux';
import React from 'react';
import { store } from '../redux/store';
import PreLayout from '../components/PreLayout';
import "../global.css"

const _layout = () => {

  return (
    <Provider store={store}>
      <PreLayout />
    </Provider>
  );
};

export default _layout;
