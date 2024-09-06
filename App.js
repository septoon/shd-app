import { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import tw from 'twrnc';
import { getData } from './src/common/getData';
import { Link } from 'expo-router';

const App = () => {
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
    <View style={tw`w-full h-full flex bg-white justify-center items-center`}>
      
      
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App;