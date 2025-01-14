import { Text, TouchableOpacity, View } from 'react-native';
import React, { useMemo } from 'react';
import tw from 'twrnc';
import { AntDesign, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { useSelector } from 'react-redux';
import { useColors } from '../common/Colors';
import { useRouter } from 'expo-router'; // Импортируем useRouter

const TabBar = ({ state, descriptors }) => {
  const router = useRouter(); // Используем useRouter
  const Colors = useColors();
  const { totalCount } = useSelector((state) => state.cart);

  // Определяем иконки для каждого маршрута
  const icons = useMemo(
    () => ({
      index: (props) => <MaterialIcons name="menu-book" size={24} {...props} />,
      delivery: (props) => <MaterialCommunityIcons name="truck-delivery-outline" size={24} {...props} />,
      contacts: (props) => <MaterialCommunityIcons name="contacts" size={22} {...props} />,
      cart: (props) => <AntDesign name="shoppingcart" size={24} {...props} />,
    }),
    []
  );

  const grayColor = '#737373';

  return (
    <View
      style={[
        tw`absolute left-0 right-0 bottom-0 flex-row justify-around items-center mx-0 py-3 pt-3`,
        { backgroundColor: Colors.darkModeBg },
      ]} elevation={6}
    >
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        if (['_sitemap', '+not-found'].includes(route.name)) return null;

        const isFocused = state.index === index;

        const onPress = () => {
          router.push(route.name === 'index' ? '/' : `/${route.name}`);
        };

        return (
          <TouchableOpacity
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            key={route.name}
            onPress={onPress}
            style={tw`flex justify-center items-center gap-1 relative`}
          >
            {label === 'Корзина' && totalCount > 0 ? (
              <View
                style={tw`absolute top-[-2] flex justify-center items-center right-0 w-5 h-5 bg-[${Colors.main}] rounded-full`}
              >
                <Text style={tw`text-white text-xs`}>{totalCount}</Text>
              </View>
            ) : null}
            {icons[route.name]?.({
              color: isFocused ? Colors.main : grayColor,
            })}
            <Text
              style={{
                color: isFocused ? Colors.main : grayColor,
                fontSize: 11,
              }}
            >
              {label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default React.memo(TabBar);
