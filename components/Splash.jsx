import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import LottieView from 'lottie-react-native';
import * as SplashScreen from 'expo-splash-screen';

SplashScreen.preventAutoHideAsync(); // Предотвращаем автоматическое скрытие splash screen

const SplashScreenComponent = ({ onAnimationFinish }) => {
  useEffect(() => {
    const timeout = setTimeout(async () => {
      console.log("Hiding Splash Screen");
      await SplashScreen.hideAsync();
      onAnimationFinish && onAnimationFinish();
    }, 3000); // Время в миллисекундах, на которое задерживается анимация

    return () => clearTimeout(timeout);
  }, []);

  return (
    <View style={styles.container}>
      <LottieView
        source={require('../assets/splashLoading.json')}
        autoPlay
        loop={false}
        onAnimationFinish={() => onAnimationFinish && onAnimationFinish()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff',
  },
});

export default SplashScreenComponent;