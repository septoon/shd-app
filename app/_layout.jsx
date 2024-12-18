import { Provider } from 'react-redux';
import React from 'react';
import { store } from '../redux/store';
import PreLayout from '../components/PreLayout';
import "../global.css"
import ErrorBoundary from '../components/ErrorBoundary';
import { ThemeProvider } from '../common/ThemeProvider';

const _layout = () => {

  return (
    <Provider store={store}>
      <ThemeProvider>
        <ErrorBoundary>
          <PreLayout />
        </ErrorBoundary>
      </ThemeProvider>
    </Provider>
  );
};

export default _layout;
