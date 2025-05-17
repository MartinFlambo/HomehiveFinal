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
  Platform,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Button, Divider } from "react-native-elements";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "react-native/Libraries/NewAppScreen";
import { SafeAreaView } from "react-native";
import { useTaskStore } from "../../store/taskStore";

export default function CreateTaskScreen() {
  const { create, isLoading } = useTaskStore();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dificult, setDificult] = useState(3);
  const [image, setImage] = useState("");

  const pickImage = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.status !== "granted") {
      Alert.alert("Permiso denegado", "Se necesita acceso a la galería.");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 0.5,
      base64: true,
    });

    if (!result.canceled && result.assets.length > 0) {
      const base64Image = `data:image/jpeg;base64,${result.assets[0].base64}`;
      setImage(base64Image);
    }
  };

  const takePhoto = async () => {
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

    if (permissionResult.status !== "granted") {
      Alert.alert("Permiso denegado", "Se necesita acceso a la cámara.");
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      quality: 0.7,
      base64: true,
    });

    if (!result.canceled && result.assets.length > 0) {
      const base64Image = `data:image/jpeg;base64,${result.assets[0].base64}`;
      setImage(base64Image);
    }
  };

  const renderDificultPicker = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <TouchableOpacity
          key={i}
          onPress={() => setDificult(i)}
          style={styles.stars}
        >
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

  const handleSubmit = async () => {
    if (!title || !description || !image) {
      Alert.alert("Error", "Por favor, rellena todos los campos");
      return;
    }

    const result = await create(title, description, dificult.toString(), image);

    if (result.success) {
      Alert.alert("Éxito", "Tarea creada correctamente");
      setTitle("");
      setDescription("");
      setDificult(3);
      setImage("");
    } else {
      Alert.alert("Error", result.error || "No se pudo crear la tarea");
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 60 : 0}
      >
        <ScrollView contentContainerStyle={styles.container}>
          <View style={styles.card}>
            <View style={styles.header}>
              <Text style={styles.title}>Crear Tarea</Text>
              <Text style={styles.subtitle}>
                Añade los detalles de la tarea
              </Text>
            </View>

            <View style={styles.form}>
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Nombre de la tarea</Text>
                <View style={styles.inputWrapper}>
                  <Ionicons
                    name="lock-closed-outline"
                    size={20}
                    color="#1E90FF"
                    style={styles.inputIcon}
                  />
                  <TextInput
                    style={styles.input}
                    placeholder="Inserta el nombre de la tarea"
                    placeholderTextColor="#aaa"
                    value={title}
                    onChangeText={setTitle}
                  />
                </View>
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Descripción</Text>
                <View style={styles.inputWrapper}>
                  <Ionicons
                    name="lock-closed-outline"
                    size={20}
                    color="#1E90FF"
                    style={styles.inputIcon}
                  />
                  <TextInput
                    style={styles.input}
                    placeholder="Añade una descripción"
                    value={description}
                    onChangeText={setDescription}
                  />
                </View>
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Dificultad</Text>
                {renderDificultPicker()}
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Imagen</Text>
                <View style={styles.imageInput}>
                  <Button title="Galería" onPress={pickImage} type="outline" />
                  <Button title="Cámara" onPress={takePhoto} type="outline" />
                </View>

                {image !== "" && (
                  <View style={styles.previewContainer}>
                    <Image
                      source={{ uri: image }}
                      style={styles.previewImage}
                    />
                    <Button
                      title="Eliminar imagen"
                      onPress={() => setImage("")}
                      type="clear"
                      icon={
                        <Ionicons
                          name="close-circle"
                          size={20}
                          color="#ff4444"
                        />
                      }
                      titleStyle={{ color: "#ff4444", marginLeft: 6 }}
                      buttonStyle={{ marginTop: 10 }}
                    />
                  </View>
                )}
              </View>
              <Divider />
              <Button
                onPress={handleSubmit}
                loading={isLoading}
                title="Crear Tarea"
                type="solid"
                disabled={isLoading}
                style={{ marginTop: 30 }}
              />
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  imageInput: {
    width: "100%",
    gap: 10,
  },

  previewContainer: {
    marginTop: 10,
    alignItems: "center",
  },
  removeImageButton: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
  },
  removeImageText: {
    color: "#ff4444",
    marginLeft: 6,
    fontSize: 14,
    fontWeight: "bold",
  },

  inputGroup: {
    gap: 0,
  },
  inputIcon: {
    marginRight: 10,
  },
  container: {
    flexGrow: 1,
    padding: 20,
    alignContent: "center",
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
    marginBottom: 40,
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
    gap: 15,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingLeft: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 5,
  },
  input: {
    flex: 1,
    height: 40,
  },
  ratingContainer: {
    flexDirection: "row",
    justifyContent: "center",
  },
  button: {
    marginTop: 10,
    width: 200,
    borderRadius: 10,
  },
  stars: {
    alignItems: "center",
    padding: 15,
  },
  previewImage: {
    width: "100%",
    height: 200,
    borderRadius: 8,
    marginTop: 10,
  },
});
