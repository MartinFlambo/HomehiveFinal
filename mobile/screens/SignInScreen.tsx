import React from "react";
import { ImageBackground, StyleSheet, Text, TextInput, View } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { Input, Button } from "react-native-elements";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

const auth = getAuth();

const SignInScreen = () => {
  const [value, setValue] = React.useState({
    email: "",
    password: "",
    error: "",
  });

  async function signIn() {
    if (value.email === "" || value.password === "") {
      setValue({
        ...value,
        error: "Email and password are mandatory.",
      });
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, value.email, value.password);
    } catch (error) {
      if (error instanceof Error) {
        setValue({
          ...value,
          error: error.message,
        });
      }
    }
  }

  const headerImage = require('../../assets/images/headerImage.png')


  return (
    <View style={styles.container}>
          <View style={styles.header}>
            <ImageBackground source={headerImage} style={styles.header}/>
          </View>
          <Text style={styles.title}>Iniciar sesión</Text>
    
          {!!value.error && <View style={styles.error}><Text>{value.error}</Text></View>}
    
          <View style={styles.control}>
            <TextInput
              placeholder='Email'
              style={styles.TextInput}
              value={value.email}
              onChangeText={(text) => setValue({ ...value, email: text })}
            />
    
            <TextInput
              placeholder='Password'
              style={styles.TextInput}
              value={value.password}
              onChangeText={(text) => setValue({ ...value, password: text })}
              secureTextEntry={true}
            />
    
            <Button title="Iniciar sesión" buttonStyle={styles.buttonSend} onPress={signIn} />
          </View>
        </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginVertical: 10,
    fontFamily: "lato",
    textAlign: "center",
  },

  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  header: {
    alignSelf: 'stretch',
    width: null,
    height: 200
  },

  TextInput:{
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
    width: '80%'
  },

  control: {
    marginTop: 10,
    width: '100%',
    padding: 10,
    alignItems: "center",
  },

  buttonSend: {
    marginTop: 20,
    borderRadius: 10,
    width: '100%'
  },

  error: {
    marginTop: 10,
    padding: 10,
    color: '#fff',
    backgroundColor: '#D54826FF',
  }
});
export default SignInScreen;
