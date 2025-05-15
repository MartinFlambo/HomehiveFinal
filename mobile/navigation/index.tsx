import React from 'react';
import UserStack from './userStack';
import AuthStack from './authStack';
import { useAuthStore } from '../store/authStore';

export default function RootNavigation() {
  const user = useAuthStore((state) => state.user);
  const token = useAuthStore((state) => state.token);

  const isLoggedIn = user !== null && token !== null;

  return isLoggedIn ? <UserStack /> : <AuthStack />;
}
