import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React, { ComponentProps } from "react";
import CreateTaskScreen from "../screens/homeScreens/CreateTaskScreen";
import HomeScreen from "../screens/homeScreens/Home";
import ProfileScreen from "../screens/homeScreens/ProfileScreen";

type TabRoutes = "Inicio" | "Nueva" | "Perfil";
type IconName = ComponentProps<typeof Ionicons>["name"];
const Tab = createBottomTabNavigator();

export default function UserStack() {
  return (
    <Tab.Navigator
      initialRouteName="Inicio"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName: IconName;

          switch (route.name as TabRoutes) {
            case "Inicio":
              iconName = "home-outline";
              break;
            case "Nueva":
              iconName = "add-circle-outline";
              break;
            case "Perfil":
              iconName = "person-outline";
              break;
            default:
              iconName = "ellipse";
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "#1E90FF",
        tabBarInactiveTintColor: "gray",
        headerShown: false,
      })}
    >
      <Tab.Screen name="Inicio" component={HomeScreen} />
      <Tab.Screen name="Nueva" component={CreateTaskScreen} />
      <Tab.Screen name="Perfil" component={ProfileScreen} />
    </Tab.Navigator>
  );
}
