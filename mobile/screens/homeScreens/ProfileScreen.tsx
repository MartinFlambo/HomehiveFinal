import React, { useState } from "react";
import { StyleSheet, Text, View, SafeAreaView } from "react-native";
import { Button, Image } from "react-native-elements";
import { useAuthStore } from "../../store/authStore";

export default function CreateTaskScreen() {
  const [task, setTasks] = useState([]);
  const { user, token, logout } = useAuthStore();

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
            <View>
              <Text>{user?.username}</Text>
            </View>
            <View>
              <Text>{user?.email}</Text>
            </View>
          </View>
        </View>
        <View style={styles.buttonContainer}>
          <Button
            title="Cerrar Sesión"
            onPress={logout}
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
    width:"100%",
    padding:20,
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