import { auth } from '@/config/firebaseConfig';
import { Redirect, Slot } from 'expo-router';
import React from 'react';

const AuthLayout = () => {
  const user = auth.currentUser;

  if (user) {
    return <Redirect href="/(tabs)/home" />;
  }

  return <Slot />;
};

export default AuthLayout;
