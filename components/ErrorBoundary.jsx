// components/ErrorBoundary.jsx
import React from 'react';
import { SafeAreaView, Text, StyleSheet } from 'react-native';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
    console.log('ErrorBoundary: Initialized');
  }

  static getDerivedStateFromError(error) {
    console.log('ErrorBoundary: getDerivedStateFromError', error);
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.log('ErrorBoundary: componentDidCatch', error, errorInfo);
    this.setState({ error, errorInfo });
    // Здесь можно интегрировать внешнюю службу логирования, например, Sentry
  }

  render() {
    if (this.state.hasError) {
      console.log('ErrorBoundary: Rendering fallback UI');
      return (
        <SafeAreaView style={styles.container}>
          <Text style={styles.text}>Что-то пошло не так.</Text>
          <Text style={styles.errorText}>{this.state.error && this.state.error.toString()}</Text>
          <Text style={styles.errorInfo}>{this.state.errorInfo && this.state.errorInfo.componentStack}</Text>
        </SafeAreaView>
      );
    }

    return this.props.children; 
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    fontSize: 18,
    color: 'red',
    marginBottom: 10
  },
  errorText: {
    fontSize: 14,
    color: 'red',
    textAlign: 'center',
    marginHorizontal: 20
  },
  errorInfo: {
    fontSize: 12,
    color: 'gray',
    textAlign: 'center',
    marginHorizontal: 20
  }
});

export default ErrorBoundary;