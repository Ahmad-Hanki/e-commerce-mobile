import React from 'react';
import { View } from 'react-native';
import Categories from '../../components/home/categories';
import LiveProductsScreen from '@/components/home/LiveProductsScreen';

const Home = () => {
  return (
    <View style={{ flex: 1 }}>
      <Categories />
      <LiveProductsScreen />
    </View>
  );
};

export default Home;
