import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { Skeleton } from 'moti/skeleton';
import { useRouter } from 'expo-router';
import tw from 'twrnc';

const MenuItem = ({menuData, loading, selectedCategory, loaded, setLoaded, onAddDishes}) => {
  const router = useRouter(); // Инициализируем useRouter

  // Функция для перехода на страницу товара
  const handlePress = (item) => {
    router.push({
      pathname: '/menuItem',
      params: {
        id: item.id,
        name: item.name,
        image: item.image,
        price: item.price,
        options: item.options,
        serving: item.serving,
        weight: item.weight,
        loaded: loaded,
        setLoaded: setLoaded,
        onAddDishes: onAddDishes,
      },
    });
  };

  return (
    <View>
      { !loading && menuData[selectedCategory].map((item, index) => (
        <TouchableOpacity key={index} onPress={() => handlePress(item)}>
          <View style={tw`bg-white mb-4 rounded-2xl shadow-lg`}>
            {loaded.includes(item.id) ? (
              <Image src={item.image} style={styles.itemImage} />
            ) : (
              <Skeleton colorMode="light" show>
                <Image
                  src={item.image}
                  onLoad={(e) => setLoaded((prev) => [...prev, item.id])}
                  style={styles.itemImage}
                />
              </Skeleton>
            )}
            <View style={tw`flex justify-between w-full p-4`}>
              <View style={tw`w-full mb-4`}>
                <Text style={tw`text-base mb-4`}>{item.name}</Text>
                {item.options ? (
                  <>
                    <Text style={tw`text-sm text-gray-500`}>{item.options}</Text>
                    <Text style={tw`text-sm text-gray-500`}>
                      Приблизительный вес: {item.weight}г.
                    </Text>
                  </>
                ) : (
                  <Text style={tw`text-sm text-gray-500`}>Колличество: {item.serving}</Text>
                )}
              </View>
              <View style={tw`w-full flex flex-row justify-between items-center h-10`}>
                <Text style={tw`text-lg font-bold mt-2`}>{item.price} руб.</Text>
                <TouchableOpacity
                  style={styles.button}
                  onPress={() =>
                    onAddDishes(
                      item.id,
                      item.name,
                      item.image,
                      item.serving,
                      item.options,
                      item.price,
                    )
                  }
                >
                  <Text style={styles.buttonText}>Добавить</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default MenuItem;

const styles = StyleSheet.create({
  itemImage: {
    width: '100%',
    height: 180,
    borderRadius: 12,
    marginBottom: 8,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    paddingHorizontal: 18,
    borderRadius: 8,
    elevation: 3,
    backgroundColor: '#FB5a3c',
  },
  buttonText: {
    fontSize: 14,
    lineHeight: 21,
    fontWeight: 'regular',
    letterSpacing: 0.25,
    color: 'white',
  },
});