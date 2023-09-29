import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"

import Ionicons from "@expo/vector-icons/Ionicons"
import React from "react"

import FinancesScreen from "../../screens/FinancesScreen"
import ContactsScreen from "../../screens/ContactsScreen"
import SettingsScreen from "../../screens/SettingsScreen"
import AddContactScreen from "../../screens/AddContactScreen"
import Home from "../../screens/HomeScreen"

const Tab = createBottomTabNavigator()

function Navbar() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarActiveTintColor: "#89CCC5",
        tabBarInactiveTintColor: "black",
        tabBarShowLabel: false,
        tabBarStyle: { borderTopColor: "#D7EBE9", borderTopWidth: 3 },
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName

          if (route.name === "Home") {
            iconName = focused ? "home" : "home-outline"
          } else if (route.name === "Contacts") {
            iconName = focused ? "book" : "book-outline"
          } else if (route.name === "AddContact") {
            iconName = focused ? "add-circle" : "add-circle-outline"
            size = 40
          } else if (route.name === "Finances") {
            iconName = focused ? "wallet" : "wallet-outline"
          } else if (route.name === "Settings") {
            iconName = focused ? "settings" : "settings-outline"
          }

          return <Ionicons name={iconName} size={size} color={color} />
        },
      })}
    >
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Contacts" component={ContactsScreen} />
      <Tab.Screen name="AddContact" component={AddContactScreen} />
      <Tab.Screen name="Finances" component={FinancesScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  )
}

export default Navbar
