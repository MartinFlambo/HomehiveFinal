import React, { useState } from "react";
import {
  ActivityIndicator,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { StackScreenProps } from "@react-navigation/stack";

const Login: React.FC<StackScreenProps<any>> = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSignUp= () => {
    setIsLoading(true);
    console.log("Login function triggered");
    setTimeout(() => setIsLoading(false), 2000);
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 60 : 0}
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={styles.container}>
          <View style={styles.topIllustration}>
            <Image
              source={require("../../assets/images/headerImage.png")}
              resizeMode="contain"
            />
          </View>

          <View style={styles.card}>
            <View style={styles.formContainer}>
              <View style={styles.title}>
                <Text style={styles.titleText}>Registrarse</Text>
              </View>
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Nombre de usuario</Text>
                <View style={styles.inputWrapper}>
                  <Ionicons
                    name="person-outline"
                    size={20}
                    color="#1E90FF"
                    style={styles.inputIcon}
                  />
                  <TextInput
                    style={styles.input}
                    placeholder="Inserta tu nombre de usuario"
                    placeholderTextColor="#aaa"
                    value={username}
                    onChangeText={(text) => setUsername(text)}
                    keyboardType="default"
                    autoCapitalize="none"
                  />
                </View>
              </View>
              {/* EMAIL */}
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Email</Text>
                <View style={styles.inputWrapper}>
                  <Ionicons
                    name="mail-outline"
                    size={20}
                    color="#1E90FF"
                    style={styles.inputIcon}
                  />
                  <TextInput
                    style={styles.input}
                    placeholder="Inserta tu email"
                    placeholderTextColor="#aaa"
                    value={email}
                    onChangeText={(text) => setEmail(text)}
                    keyboardType="email-address"
                    autoCapitalize="none"
                  />
                </View>
              </View>

              {/* PASSWORD */}
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Password</Text>
                <View style={styles.inputWrapper}>
                  <Ionicons
                    name="lock-closed-outline"
                    size={20}
                    color="#1E90FF"
                    style={styles.inputIcon}
                  />
                  <TextInput
                    style={styles.input}
                    placeholder="Inserta tu contraseña"
                    placeholderTextColor="#aaa"
                    value={password}
                    onChangeText={(text) => setPassword(text)}
                    secureTextEntry={!showPassword}
                  />
                  <TouchableOpacity
                    onPress={() => setShowPassword(!showPassword)}
                    style={styles.eyeIcon}
                  >
                    <Ionicons
                      name={showPassword ? "eye-outline" : "eye-off-outline"}
                      size={20}
                      color="#1E90FF"
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </View>

            {/* BOTÓN LOGIN */}
            <TouchableOpacity
              style={styles.button}
              onPress={handleSignUp}
              disabled={isLoading}
            >
              {isLoading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={styles.buttonText}>Crear Cuenta</Text>
              )}
            </TouchableOpacity>

            {/* FOOTER */}
            <View style={styles.footer}>
              <Text style={styles.footerText}>¿Ya tienes cuenta?</Text>
              <TouchableOpacity onPress={() => navigation.navigate("Sign In")}>
                <Text style={styles.linkText}>Inicia Sesión</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    padding: 20,
  },
  topIllustration: {
    width: "100%",
    height: 200,
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    backgroundColor: "#f9f9f9",
    padding: 20,
    borderRadius: 10,
    width: "90%",
    elevation: 5,
    alignItems: "center",
  },
  formContainer: {
    width: "100%",
  },
  title:{
    width:"100%",
    alignItems:"center",
    marginBottom: 20
  },
  titleText:{
    fontSize: 22,
    fontWeight: 600
  },
  inputGroup: {
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingLeft: 10,
  },
  inputIcon: {
    marginRight: 10,
  },
  eyeIcon: {
    position: "absolute",
    right: 10,
  },
  input: {
    flex: 1,
    height: 40,
  },
  button: {
    backgroundColor: "#1E90FF",
    marginTop: 10,
    width: 200,
    borderRadius: 10,
    alignItems: "center",
    padding: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  footer: {
    marginTop: 20,
    alignItems: "center",
  },
  footerText: {
    fontSize: 14,
    color: "#666",
  },
  linkText: {
    fontSize: 14,
    color: "#1E90FF",
    fontWeight: "bold",
  },
});

export default Login;
