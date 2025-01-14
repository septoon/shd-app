import React, { useRef, useState } from 'react';
import { Link, Stack, useFocusEffect, useSegments } from 'expo-router';
import ClearCartBtn from '../components/Cart/ClearCartBtn';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useColors } from '../common/Colors';
import { useSelector } from 'react-redux';

const PreLayout = () => {
  const segments = useSegments();
  const Colors = useColors()
  const [currentTitleS, setCurrentTitleS] = useState('Меню');
  const { items } = useSelector(state => state.cart)
  const previousTitleRef = useRef('');

  const headerTitles = {
    index: 'Меню',
    delivery: 'Доставка',
    contacts: 'Контакты',
    cart: 'Корзина',
    profile: 'Профиль',
  };

  const currentSegment = segments[segments.length - 1];
  const currentTitle = headerTitles[currentSegment] === 'Профиль' ? currentTitleS : headerTitles[currentSegment] || 'Меню';

  useFocusEffect(
    React.useCallback(() => {
      previousTitleRef.current = currentTitleS;
      setCurrentTitleS(currentTitle);
    }, [currentSegment])
  );


  const RightComponent = () => {
    if (currentTitle === 'Корзина') {
      return items.length > 0 ? <ClearCartBtn /> : null;
    } else {
      return (
        <Link href="/profile">
          <MaterialIcons name="account-circle" size={26} color={Colors.darkModeText} />
        </Link>
      );
    }
  };

  return (
    <Stack>
      <Stack.Screen
        name="(tabs)"
        options={{
          headerTitle: currentTitle,
          headerStyle: {
            backgroundColor: Colors.darkModeBg,
          },
          headerTintColor: Colors.darkModeText,
          headerRight: RightComponent,
        }}
      />
    </Stack>
);
};

export default PreLayout;
