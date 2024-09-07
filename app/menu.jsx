import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, {useState, useEffect} from 'react'
import tw from 'twrnc';
import { getData } from '../src/common/getData';

const Menu = () => {
  const [menuData, setMenuData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getData();
      if (data) {
        setMenuData(data);
      }
      setLoading(false);
    };
    fetchData();
  }, []);
  return (
    <ScrollView style={tw`pl-3 pt-5`}>
      <Text style={tw`text-3xl font-bold`}>Меню</Text>
      <ScrollView horizontal style={tw`flex flex-row py-4`}>
        {
        Object.keys(menuData).map((category, index) => (
          <View key={index} style={tw`bg-white p-4 mr-4 rounded-xl shadow-lg`}>
            <Text>{category}</Text>
          </View>
        ))}
      </ScrollView>
    </ScrollView>
  )
}

export default Menu

const styles = StyleSheet.create({})