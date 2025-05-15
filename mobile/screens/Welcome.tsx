import React, { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { StackScreenProps } from "@react-navigation/stack";
import { Button } from "react-native-elements";
import Logo from "../components/Logo";
import { useAuthStore } from "../store/authStore";

const WelcomeScreen: React.FC<StackScreenProps<any>> = ({ navigation }) => {
  const { user, token, checkAuth} = useAuthStore()


  useEffect(()=> {
    checkAuth()
  })
  return (
    <View style={styles.container}>
      <Logo />
      <View style={styles.containerTitle}>
        <Text style={styles.title}>Tu App para el día a día</Text>
        <Text style={styles.description}>
          Ahora tu organización y tus finanzas unidas en la palma de tu mano
        </Text>
      </View>
      <View style={styles.buttons}>
        <Button
          title="Iniciar sesión"
          buttonStyle={styles.button}
          onPress={() => navigation.navigate("Sign In")}
        />
        <Button
          title="Registrate"
          type="outline"
          buttonStyle={styles.button}
          onPress={() => navigation.navigate("Sign Up")}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  description: {
    fontSize: 16,
    color: "#666",
    fontFamily: "lato",
    maxWidth: "70%",
    textAlign: "center",
  },

  containerTitle: {
    alignItems: "center",
    marginTop: 10,
    marginBottom: 20,
  },

  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    fontFamily: "lato",
    textAlign: "center",
  },

  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },

  buttons: {
    marginTop: 20,
    alignItems: "center",
  },

  button: {
    marginTop: 10,
    width: 200,
    borderRadius: 10,
  },
});

export default WelcomeScreen;
