import React, { useMemo } from "react";
import {
  Alert,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Dimensions,
} from "react-native";
import { Button, Divider, Image } from "react-native-elements";
import { LineChart } from "react-native-chart-kit";

import { useAuthStore } from "../../store/authStore";
import { useTaskStore } from "../../store/taskStore";
import { Task } from "../../interfaces/interfaces";

// Función para agrupar puntos por día
type DailyPoints = Record<string, number>;

function getDailyPoints(tasks: Task[]): DailyPoints {
  return tasks
    .filter((t) => t.completed)
    .filter(
      (t) => new Date(t.updatedAt).getTime() !== new Date(t.createdAt).getTime()
    )
    .reduce<DailyPoints>((acc, task) => {
      const date = new Date(task.updatedAt).toLocaleDateString("es-ES", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      });
      acc[date] = (acc[date] || 0) + task.score;
      return acc;
    }, {});
}

export default function ProfileScreen() {
  const { user, logout } = useAuthStore();
  const { completedTasks } = useTaskStore();

  const totalPoints = useMemo(() => {
    return completedTasks.reduce((acc, task) => acc + task.score, 0);
  }, [completedTasks]);

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

  const dailyPointsMap = useMemo(
    () => getDailyPoints(completedTasks || []),
    [completedTasks]
  );

  const labels = Object.keys(dailyPointsMap).sort(
    (a, b) =>
      new Date(a.split("/").reverse().join("-")).getTime() -
      new Date(b.split("/").reverse().join("-")).getTime()
  );
  const data = labels.map((label) => dailyPointsMap[label]);

  const screenWidth = Dimensions.get("window").width;

  const chartConfig = {
    backgroundGradientFrom: "#ffff",
    backgroundGradientTo: "#ffff",
    color: (opacity = 1) => `rgba(33, 150, 243, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    decimalPlaces: 0,
    propsForDots: {
      r: "5",
      strokeWidth: "2",
      stroke: "#1976D2",
    },
    propsForLabels: {
      fontSize: 10,
    },
    style: {
      borderRadius: 10,
    },
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
        <View style={styles.resultsContainer}>
          <Text style={styles.taskCompleted}>
            Total de tareas completadas: {completedTasks.length}
          </Text>
          <Divider />
          <Text style={styles.taskCompleted}>
            Total de puntos acumulados: {totalPoints}
          </Text>
        </View>
        <View style={{ width: "100%", marginBottom: 20 }}>
          <Text style={styles.taskTitle}>Puntos por día</Text>
          {labels.length === 0 ? (
            <Text style={{ fontStyle: "italic" }}>
              Aún no has completado ninguna tarea.
            </Text>
          ) : (
            <View style={styles.chartContainer}>
              <LineChart
                data={{
                  labels,
                  datasets: [{ data }],
                }}
                width={screenWidth - 64}
                height={250}
                chartConfig={chartConfig}
                fromZero
                withInnerLines
                withOuterLines
                bezier
                style={{
                  borderRadius: 12,
                }}
              />
            </View>
          )}
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
  taskCompleted: {
    fontWeight: 500,
    fontSize: 16,
    color: "#1E90FF",
  },
  resultsContainer: {
    width: "100%",
    padding: 20,
    flexDirection: "column",
    alignItems: "center",
    gap: 10,
    marginBottom: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    backgroundColor: "#ffff",
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
    backgroundColor: "#f9f9f9",
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
    borderColor: "#ccc",
    backgroundColor: "#fff",
  },
  buttonContainer: {
    width: "100%",
  },
  buttonLogout: {
    borderColor: "red",
    borderWidth: 2,
    borderRadius: 10,
    width: "100%",
    backgroundColor: "#fff"
  },
  buttonTitle: {
    color: "red",
    fontWeight: "bold",
  },
  chartContainer: {
  borderWidth: 1,
  borderColor: "#ccc",
  borderRadius: 12,
  backgroundColor: "#fff",
},
});
