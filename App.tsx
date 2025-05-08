import React from 'react';
import { ThemeProvider } from 'react-native-elements';
import RootNavigation from './mobile/navigation';

export default function App() {
  return (
    <ThemeProvider>
      <RootNavigation />
    </ThemeProvider>
  );
}
