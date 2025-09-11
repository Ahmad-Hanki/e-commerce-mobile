import { useEffect, useRef, useState } from 'react';
import { io, Socket } from 'socket.io-client';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  categoryId: string;
}

interface UseSocketOptions {
  url: string;
  room?: string;
}

export function useSocket({ url, room = 'general' }: UseSocketOptions) {
  const socketRef = useRef<Socket | null>(null);
  const [connected, setConnected] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const socket = io(url);
    socketRef.current = socket;

    socket.on('connect', () => {
      setConnected(true);
      socket.emit('joinRoom', room);
    });

    socket.on('disconnect', () => setConnected(false));

    // Listen for all products
    socket.on('products', (data: Product[]) => {
      console.log('All products received:', data);
      setProducts(data);
    });

    // Listen for new product
    socket.on('product', (product: Product) => {
      console.log('New product received:', product);
      setProducts((prev) => [...prev, product]);
    });

    socket.on('error', (err) => console.error('Socket error:', err));

    return () => {
      socket.disconnect();
    };
  }, [url, room]);

  const sendProduct = (product: Omit<Product, 'id'>) => {
    if (!socketRef.current || !connected) return;
    socketRef.current.emit('product', product);
  };

  const fetchProducts = () => {
    if (!socketRef.current || !connected) return;
    socketRef.current.emit('getProducts');
  };

  return { socket: socketRef.current, connected, products, sendProduct, fetchProducts };
}
