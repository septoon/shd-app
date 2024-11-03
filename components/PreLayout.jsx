import React, { useRef, useState } from 'react';
import { Link, Stack, useFocusEffect, useSegments } from 'expo-router';
import ClearCartBtn from '../components/Cart/ClearCartBtn';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useColors } from '../common/Colors';
import { Platform } from 'react-native';

const PreLayout = () => {
  const segments = useSegments();
  const Colors = useColors()
  const [currentTitleS, setCurrentTitleS] = useState('Меню');
  const previousTitleRef = useRef(''); // Реф для хранения заголовка предыдущего экрана

  // Определяем заголовки для каждого экрана
  const headerTitles = {
    index: 'Меню',
    delivery: 'Доставка',
    contacts: 'Контакты',
    cart: 'Корзина',
    profile: 'Профиль',
  };

  // Определяем текущий экран и заголовок по последнему сегменту
  const currentSegment = segments[segments.length - 1];
  const currentTitle = headerTitles[currentSegment] === 'Профиль' ? currentTitleS : headerTitles[currentSegment] || 'Меню'; // Заголовок по умолчанию

  useFocusEffect(
    React.useCallback(() => {
      previousTitleRef.current = currentTitleS; // Сохраняем текущий заголовок как предыдущий
      setCurrentTitleS(currentTitle); // Устанавливаем новый заголовок
    }, [currentSegment])
  );


  const RightComponent = () => {
    if(currentTitle === 'Корзина') {
      return <ClearCartBtn />
    } else {
      return <Link href="/profile" onPress={() => {}}>
        <MaterialIcons name="account-circle" size={24} color={Colors.main} />
      </Link>
    }
  }

  return (
      <Stack>
        <Stack.Screen
          name="(tabs)"
          options={{
            headerTitle: currentTitle,
            headerBlurEffect: 'regular',
            headerTransparent: Platform.OS === 'ios' ? true : false,
            headerLargeTitle: Platform.OS === 'ios' ? true : false,
            headerShadowVisible: false,
            headerStyle: {
              backgroundColor: Colors.darkModeBg,
            },
            headerTintColor: Colors.main,
            headerLargeTitleShadowVisible: false,
            headerRight: RightComponent,
            presentation: currentTitle === 'Корзина' ? 'modal' : null,
          }}
        />
      </Stack>
  );
};

export default PreLayout;
