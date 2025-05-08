import React from 'react';
import UserStack from './userStack';
import AuthStack from './authStack';

export default function RootNavigation() {
  const isLoggedIn = false; // Cambia esto según el estado de autenticación del usuario

  return isLoggedIn ? <UserStack /> : <AuthStack />;
}