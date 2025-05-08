import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button } from 'react-native-elements';


export default function HomeScreen() {

  return (
    <View style={styles.container}>
      <Text>Bienvenido!</Text>

      <Button title="Sign Out" style={styles.button}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    marginTop: 10
  }
});