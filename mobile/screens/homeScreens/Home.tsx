import React, { useEffect, useState } from "react";
import {
  Alert,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Switch,
} from "react-native";
import { Button, Image } from "react-native-elements";
import TaskCard from "../../components/TaskCard";
import { useAuthStore } from "../../store/authStore";
import { useTaskStore } from "../../store/taskStore";

export default function ProfileScreen() {
  const { user } = useAuthStore();
  const { deleteTask, getUserTasks, tasks, isLoading, completeTask } =
    useTaskStore();

  const [isEnabled, setIsEnabled] = useState(false);

  useEffect(() => {
    getUserTasks(isEnabled);
  }, [isEnabled]);

  const toggleSwitch = () => setIsEnabled((prev) => !prev);

  const confirmDeleteTask = async (id: string) => {
    const { success, error } = await deleteTask(id);
    Alert.alert(
      success ? "Tarea eliminada" : "Error",
      success
        ? "La tarea ha sido eliminada correctamente."
        : error || "Error al eliminar la tarea"
    );
  };

  const handleDeleteTask = (id: string) => {
    Alert.alert(
      "Eliminar tarea",
      "¿Estás seguro de que deseas eliminar esta tarea?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Eliminar",
          onPress: () => confirmDeleteTask(id),
          style: "destructive",
        },
      ]
    );
  };

  const confirmCompleteTask = async (id: string) => {
    const { success, error } = await completeTask(id);
    Alert.alert(
      success ? "Tarea completada" : "Error",
      success
        ? "La tarea ha sido completada correctamente."
        : error || "Error al completar la tarea"
    );
  };

  const handleCompleteTask = (id: string) => {
    Alert.alert("Completar tarea", "¿Marcar tarea como completada?", [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Completar",
        onPress: () => confirmCompleteTask(id),
        style: "cancel",
      },
    ]);
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
          <View style={{ flex: 1, width: "100%" }}>
            <Text style={styles.userLabel}>{user?.username}</Text>
            <Text
              style={styles.userLabel}
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {user?.email}
            </Text>
            <Text style={styles.userLabel}>
              Miembro desde:{" "}
              {user?.createdAt
                ? new Date(user.createdAt).toLocaleDateString("es-ES", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })
                : "Fecha desconocida"}
            </Text>
          </View>
        </View>

        <View style={styles.taskContainer}>
          <Text style={styles.taskTitle}>
            {isEnabled ? "Tareas completadas:" : "Tareas pendientes:"}
          </Text>

          <View style={styles.switchContainer}>
            <Text style={styles.switchLabel}>
              {isEnabled ? "" : "Pulsa para ver las tareas completadas"}
            </Text>
            <Switch
              trackColor={{ false: "#767577", true: "#81b0ff" }}
              thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggleSwitch}
              value={isEnabled}
            />
          </View>

          {isLoading ? (
            <Text>Cargando tareas...</Text>
          ) : tasks?.length === 0 ? (
            <Text style={{ fontStyle: "italic" }}>No tienes tareas aún.</Text>
          ) : (
            <ScrollView contentContainerStyle={styles.scrollContent}>
              {tasks?.map((task) => (
                <TaskCard
                  key={task._id}
                  tarea={task}
                  onLongPress={() => handleDeleteTask(task._id)}
                  onPress={() => handleCompleteTask(task._id)}
                />
              ))}
            </ScrollView>
          )}
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
    fontWeight: "500",
    fontSize: 14,
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
});
