import { auth } from '@/config/firebaseConfig';
import { useAuth } from '@/providers/auth-provider';
import { Redirect, Slot } from 'expo-router';
import React from 'react';

const AuthLayout = () => {
  const { authChecked, user } = useAuth();
  if (authChecked && user) {
    return <Redirect href="/(tabs)/home" />;
  }

  return <Slot />;
};

export default AuthLayout;
