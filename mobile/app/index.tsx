import { useRouter } from 'expo-router';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import React, { useEffect } from 'react';
import { ActivityIndicator } from 'react-native';

const Index = () => {
  const router = useRouter();

  const auth = getAuth();

  // ✅ Use useEffect to prevent re-renders causing hook issues
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log('User is signed in', user.uid);
        router.replace('/(tabs)/home');
      } else {
        console.log('User is signed out');
        router.replace('/(auth)/sign-in');
      }
    });

    return () => unsubscribe(); // Cleanup on unmount
  }, []);
  return <ActivityIndicator size="large" className="flex-1 items-center justify-center" />;
};

export default Index;
