import React from "react"
import { createStackNavigator } from "@react-navigation/stack"

import EditContactScreen from "../../screens/EditContactScreen"
import Navbar from "../Navbar"
import { NavigationContainer } from "@react-navigation/native"
import ContactsScreen from "../../screens/ContactsScreen"

const Stack = createStackNavigator()

const screenOptionStyle = {
  headerStyle: {
    backgroundColor: "#89CCC5",
  },
  headerTintColor: "#272727",
}

const StackNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={screenOptionStyle}>
        <Stack.Screen
          name="RootScreen"
          component={Navbar}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="Edit" component={EditContactScreen} />
        <Stack.Screen name="Contact" component={ContactsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default StackNavigator
