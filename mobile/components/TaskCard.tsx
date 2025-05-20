// TaskCard.tsx
import React from "react";
import { View, Text, StyleSheet, Image, Pressable } from "react-native";
import { Task } from "../interfaces/interfaces";
import type { PressableStateCallbackType } from "react-native";

interface Props {
  tarea: Task;
  onLongPress?: () => void;
}

const TaskCard: React.FC<Props> = ({ tarea, onLongPress }) => {
  return (
    <Pressable
      onLongPress={onLongPress}
      delayLongPress={500}
      style={(pressed: PressableStateCallbackType) => [
        pressed.pressed && styles.cardPressed,
      ]}
    >
      <View style={styles.card}>
        <Text style={styles.title}>{tarea.title}</Text>
        <Text style={styles.description}>{tarea.description}</Text>
        <Text style={styles.difficulty}>Dificultad: {tarea.dificult}</Text>
        {tarea.image ? (
          <Image source={{ uri: tarea.image }} style={styles.taskImage} />
        ) : null}
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#ffffff",
    padding: 20,
    borderRadius: 10,
    marginVertical: 8,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    transform: [{ scale: 0.94 }],


  },
  cardPressed: {
    transform: [{ scale: 0.90 }],
    shadowOpacity: 0.2,
    shadowRadius: 8,
    backgroundColor: "#f0f0f0",
    borderRadius: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    marginBottom: 4,
    color: "#555",
  },
  difficulty: {
    fontSize: 13,
    marginBottom: 4,
    fontStyle: "italic",
    color: "#888",
  },
  author: {
    fontSize: 12,
    color: "#aaa",
  },
  taskImage: {
    width: "100%",
    height: 150,
    marginBottom: 8,
    borderRadius: 8,
  },
});

export default TaskCard;
