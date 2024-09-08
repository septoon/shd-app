import { Button, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useState, useEffect } from 'react';
import tw from 'twrnc';
import { getData } from '../../common/getData';

const Menu = () => {
  const [menuData, setMenuData] = useState({});
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState(null);  // Состояние для выбранной категории

  useEffect(() => {
    const fetchData = async () => {
      const data = await getData();
      if (data) {
        setMenuData(data);
        const firstCategory = Object.keys(data)[0];  // Получаем первую категорию
        setSelectedCategory(firstCategory);
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  // Обработчик для выбора категории
  const handleCategoryPress = (category) => {
    setSelectedCategory(category);
  };

  return (
    <ScrollView contentInsetAdjustmentBehavior="automatic" style={styles.container}>
      <ScrollView horizontal style={tw`flex flex-row w-full p-4`}>
        {Object.keys(menuData).map((category, index) => (
          <TouchableOpacity key={index} onPress={() => handleCategoryPress(category)}  style={[styles.category, { backgroundColor: selectedCategory === category ? '#ff6347' : '#fff' }]}>
            <Image src={menuData[category][0].image} style={styles.categoryImage} />
            <Text style={[styles.categoryText, { color: selectedCategory === category ? '#fff' : '#000' }]}>{category}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <ScrollView style={tw`flex w-full p-4`}>
        {selectedCategory && (
          <View>
            <Text style={tw`text-lg font-bold mb-2`}>
              {selectedCategory}
            </Text>
            {menuData[selectedCategory].map((item, index) => (
              <View key={index} style={tw`bg-white mb-4 rounded-2xl shadow-lg`}>
                <Image src={item.image} style={styles.itemImage} />
                <View style={tw`flex flex-row justify-between w-full p-4`}>
                  <View style={tw`w-[70%]`}>
                    <Text style={tw`text-base`}>{item.name}</Text>
                    <Text style={tw`text-sm text-gray-500`}>{item.description}</Text>
                    <Text style={tw`text-lg font-bold mt-2`}>{item.price} руб.</Text>
                  </View>
                  <View style={tw`flex justify-end`}>
                    <Button title='Добавить' />
                  </View>
                </View>
              </View>
            ))}
          </View>
        )}
      </ScrollView>
    </ScrollView>
  );
};

export default Menu;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  category: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    width: 90,
    paddingTop: 16,
    paddingBottom: 16,
    marginRight: 16,
    borderRadius: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  categoryImage: {
    width: 72,
    height: 72,
    marginBottom: 16,
    borderRadius: '50%',
    shadowColor: '#000',
    shadowOffset: { width: 3, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  categoryText: {
    fontSize: 14,
  },
  itemImage: {
    width: '100%',
    height: 180,
    borderRadius: 12,
    marginBottom: 8,
  },
});