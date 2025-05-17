import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Button, Image } from "react-native-elements";
import { useAuthStore } from "../../store/authStore";

export default function CreateTaskScreen() {
  const [task, setTasks] = useState([]);
  const { user } = useAuthStore();
  console.log(user)
  return (
    <View style={styles.container}>
      <Image
        source={{ uri: user?.profileImage }}
        style={{ width: 100, height: 100, borderRadius: 50 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    marginTop: 10,
  },
});
