import { Skeleton } from 'moti/skeleton';
import React from 'react';
import { StyleSheet, Text, View, Image, Button } from 'react-native';
import tw from 'twrnc';

const MenuItem = ({menuData, loading, selectedCategory, loaded, setLoaded, onAddDishes}) => {
  return (
    <View>
      { !loading && menuData[selectedCategory].map((item, index) => (
        <View key={index} style={tw`bg-white mb-4 rounded-2xl shadow-lg`}>
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
          <View style={tw`flex flex-row justify-between w-full p-4`}>
            <View style={tw`w-[70%]`}>
              <Text style={tw`text-base`}>{item.name}</Text>
              <Text style={tw`text-sm text-gray-500`}>{item.description}</Text>
              <Text style={tw`text-lg font-bold mt-2`}>{item.price} руб.</Text>
            </View>
            <View style={tw`flex justify-end`}>
              <Button
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
                title="Добавить"
              />
            </View>
          </View>
        </View>
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
});
