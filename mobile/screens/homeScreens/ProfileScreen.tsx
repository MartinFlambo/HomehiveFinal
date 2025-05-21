import React from "react";
import { Alert, SafeAreaView, StyleSheet, Text, View } from "react-native";
import { Button, Image } from "react-native-elements";
import { useAuthStore } from "../../store/authStore";

export default function ProfileScreen() {
  const { user, logout } = useAuthStore();

  const confirmLogout = () => {
    Alert.alert(
      "Cerrar sesión",
      "¿Estás seguro de que deseas cerrar la sesión?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Cerrar sesión",
          onPress: () => logout(),
          style: "destructive",
        },
      ]
    );
  };
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <View style={styles.userInfo}>
          <View style={styles.imageContainer}>
            <Image
              source={{ uri: user?.profileImage }}
              style={styles.imageProfile}
            />
          </View>
          <View>
            <Text style={styles.userLabel}>{user?.username}</Text>
            <Text style={styles.userLabel}>{user?.email}</Text>
          </View>
        </View>
        <View style={styles.buttonContainer}>
          <Button
            title="Cerrar Sesión"
            onPress={confirmLogout}
            type="outline"
            buttonStyle={styles.buttonLogout}
            titleStyle={styles.buttonTitle}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  switchContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
    width: "100%",
  },
  switchLabel: {
    fontSize: 14,
    color: "#333",
    marginRight: 10,
  },

  userLabel: {
    fontWeight: "600",
    fontSize: 16,
    color: "#000",
  },
  taskContainer: {
    flex: 1,
    width: "100%",
    paddingBottom: 10,
  },
  scrollContent: {
    paddingBottom: 10,
  },
  taskTitle: {
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 10,
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10,
  },
  imageContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
  },
  imageProfile: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  userInfo: {
    width: "100%",
    padding: 20,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 20,
    borderRadius: 10,
    borderWidth: 1,
  },
  buttonContainer: {
    width: "100%",
  },
  buttonLogout: {
    borderColor: "red",
    borderWidth: 2,
    borderRadius: 10,
    width: "100%",
  },
  buttonTitle: {
    color: "red",
    fontWeight: "bold",
  },
});
