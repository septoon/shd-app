import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import tw from 'twrnc';
import { AntDesign, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';

const TabBar = ({ state, descriptors, navigation }) => {

  const icons = {
    index: (props) => <AntDesign name="home" size={24} color={grayColor} {...props} />,
    menu: (props) => <MaterialIcons name="menu-book" size={24} color={grayColor} {...props} />,
    delivery: (props) => <MaterialCommunityIcons name="truck-delivery-outline" size={24} color={grayColor} {...props} />,
    contacts: (props) => <MaterialCommunityIcons name="contacts" size={22} color={grayColor} {...props} />,
    cart: (props) => <AntDesign name="shoppingcart" size={24} color={grayColor} {...props} />
  }
  const primaryColor = '#FB5a3c';
  const grayColor = '#c9c6ce';
  return (
    <View style={[tw`absolute left-4 right-4 bottom-5 rounded-3xl flex-row justify-around items-center bg-white mx-0 py-3 shadow-lg`, {shadowColor: 'black', 
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
            style={tw`flex justify-center items-center gap-1`}
          >
            {
              icons[route.name]({ color: isFocused ? primaryColor : grayColor })
            }
            <Text style={{ color: isFocused ? primaryColor : grayColor, fontSize: 11 }}>
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