import { Provider } from 'react-redux';
import React from 'react';
import { store } from '../redux/store';
import PreLayout from '../components/PreLayout';
import "../global.css"
import ErrorBoundary from '../components/ErrorBoundary';

const _layout = () => {

  return (
    <Provider store={store}>
      <ErrorBoundary>
        <PreLayout />
      </ErrorBoundary>
    </Provider>
  );
};

export default _layout;
