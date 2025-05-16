import React, { useState } from "react";
import {
  View,
  Text,
  KeyboardAvoidingView,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Alert,
  Image,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "react-native/Libraries/NewAppScreen";

export default function CreateTaskScreen() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dificult, setDificult] = useState(3);
  const [image, setImage] = useState(""); 
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const allowedImages = ["aspirar.jpg", "limpiar.jpg", "ordenar.jpg"];

  const handleSubmit = async () => {
    if (!title || !description || !image) {
      Alert.alert("Error", "Por favor, rellena todos los campos");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("http://tu-api.com/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          description,
          dificult,
          image, 
        }),
      });

      if (!response.ok) {
        throw new Error("Error al crear la tarea");
      }

      Alert.alert("Éxito", "Tarea creada correctamente");
      router.push("/tasks");
    } catch (error) {
      Alert.alert("Error", "Hubo un problema al crear la tarea");
      console.error(error);
    }

    setLoading(false);
  };

  const renderDificultPicker = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <TouchableOpacity key={i} onPress={() => setDificult(i)} style={styles.button}>
          <Ionicons
            name={i <= dificult ? "star" : "star-outline"}
            size={32}
            color={i <= dificult ? "#f4b400" : Colors.textSecondary}
          />
        </TouchableOpacity>
      );
    }
    return <View style={styles.ratingContainer}>{stars}</View>;
  };

  const renderImageSelector = () => {
    return (
      <View style={styles.imageSelectorContainer}>
        {allowedImages.map((img) => (
          <TouchableOpacity key={img} onPress={() => setImage(img)} style={styles.imageOption}>
            <Image source={{ uri: `http://tu-api.com/images/${img}` }} style={styles.previewImage} />
            <Text style={styles.imageText}>{img}</Text>
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.card}>
          <View style={styles.header}>
            <Text style={styles.title}>Crear Tarea</Text>
            <Text style={styles.subtitle}>Añade los detalles de la tarea</Text>
          </View>

          <View style={styles.form}>
            <View style={styles.formGroup}>
              <Text style={styles.label}>Nombre de la tarea</Text>
              <TextInput
                style={styles.input}
                placeholder="Inserta el nombre de la tarea"
                value={title}
                onChangeText={setTitle}
              />
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.label}>Descripción</Text>
              <TextInput
                style={styles.input}
                placeholder="Añade una descripción"
                value={description}
                onChangeText={setDescription}
              />
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.label}>Dificultad</Text>
              {renderDificultPicker()}
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.label}>Seleccionar Imagen</Text>
              {renderImageSelector()}
            </View>

            <TouchableOpacity style={styles.button} onPress={handleSubmit} disabled={loading}>
              {loading ? <ActivityIndicator color={Colors.white} /> : <Text style={styles.buttonText}>Confirmar</Text>}
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  card: {
    backgroundColor: "#f9f9f9",
    padding: 20,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  header: {
    alignItems: "center",
    marginBottom: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#333",
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
  },
  form: {
    marginBottom: 20,
  },
  formGroup: {
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    paddingHorizontal: 10,
    fontSize: 16,
    color: "#333",
    height: 40,
  },
  ratingContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: 10,
  },
  button: {
    backgroundColor: "#1E90FF",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 20,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
  },
  imageSelectorContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 10,
  },
  imageOption: {
    alignItems: "center",
    marginHorizontal: 5,
  },
  previewImage: {
    width: 80,
    height: 80,
    borderRadius: 5,
  },
  imageText: {
    marginTop: 5,
    color: "#333",
    fontSize: 14,
  },
});
