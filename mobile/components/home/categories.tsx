import { Label } from '@/components/ui/label';
import { useCategories } from '@/services/categories/get-all-categories';
import React from 'react';
import { ActivityIndicator, FlatList, View } from 'react-native';

const Categories = () => {
  const { data, isPending } = useCategories();
  return isPending ? (
    <View className="flex-1 items-center justify-center">
      <ActivityIndicator size="large" />
    </View>
  ) : (
    <View className="mt-4 flex-row flex-wrap justify-between px-4">
      <FlatList
        data={data?.data}
        // i want to style the container
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ gap: 8 }}
        renderItem={({ item }) => {
          return (
            <View key={item.id} className="items-center justify-center rounded-lg bg-gray-200 p-2">
              <View className="text-center text-sm">
                <Label>{item.name}</Label>
              </View>
            </View>
          );
        }}
      />
    </View>
  );
};

export default Categories;
