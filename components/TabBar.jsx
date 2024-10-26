import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import tw from 'twrnc';
import { AntDesign, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { useSelector } from 'react-redux';
import { useColors } from '../common/Colors';

const TabBar = ({ state, descriptors, navigation }) => {
  const Colors = useColors()
  const { totalCount } = useSelector(state => state.cart);
  const icons = {
    index: (props) => <MaterialIcons name="menu-book" size={24} color={Colors.darkModeIcon} {...props} />,
    delivery: (props) => <MaterialCommunityIcons name="truck-delivery-outline" size={24} color={Colors.darkModeIcon} {...props} />,
    contacts: (props) => <MaterialCommunityIcons name="contacts" size={22} color={Colors.darkModeIcon} {...props} />,
    cart: (props) => <AntDesign name="shoppingcart" size={24} color={Colors.darkModeIcon} {...props} />
  }
  const grayColor = '#737373';
  const tabBarVisible = descriptors[state.routes[state.index].key].options.tabBarVisible;

  if (tabBarVisible === false) {
    return null; // Возвращаем null, если tabBarVisible равен false
  }
  return (
    <View style={[tw`absolute left-0 right-0 bottom-0 flex-row justify-around items-center bg-[${Colors.darkModeBg}] mx-0 py-3 pb-6 pt-3 shadow-lg`, {shadowColor: 'black', 
      shadowOffset: { width: 0, height: 10 }, 
      shadowRadius: 10, 
      shadowOpacity: 0.1 }]}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        if (['_sitemap', '+not-found'].includes(route.name)) return null

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <TouchableOpacity
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            key={route.name}
            onPress={onPress}
            onLongPress={onLongPress}
            style={tw`flex justify-center items-center gap-1 relative`}
          >
            {label === 'Корзина' && totalCount > 0 ? (<View style={tw`absolute top-[-2] flex justify-center items-center right-0 w-5 h-5 bg-[${Colors.main}] rounded-full`}>
              <Text style={tw`text-white text-xs`}>{totalCount}</Text>
              </View>) : ''}
            {
              icons[route.name]({ color: isFocused ? Colors.main : grayColor })
            }
            <Text style={{ color: isFocused ? Colors.main : grayColor, fontSize: 11 }}>
              {label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  )
}

export default TabBar

const styles = StyleSheet.create({})