import { useSocket } from '@/hooks/useSocket';
import React from 'react';
import { View, Text, FlatList } from 'react-native';
import { Label } from '../ui/label';
import { Button } from '../ui/button';
import { Card } from '../ui/card';

export default function LiveProductsScreen() {
  const { connected, products, sendProduct } = useSocket({
    url: 'http://192.168.1.101:8000',
    room: 'general',
  });

  const handleSend = () => {
    sendProduct({
      name: 'Product B',
      description: 'Another example',
      price: 50,
      imageUrl: 'http://example.com/product.png',
      categoryId: 'cmfcjdkch0000w6o8xm3ydy5k',
    });
  };

  console.log('Current products:', products);
  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Label>Status: {connected ? 'Connected' : 'Disconnected'}</Label>
      <Button onPress={handleSend}>
        <Text>Send Product</Text>
      </Button>

      <Card style={{ flex: 1 }}>
        <Label>{products.length} products</Label>
      </Card>
    </View>
  );
}
