import { Text, View, ScrollView, FlatList } from "react-native"
import React from "react"
import { useFonts } from "expo-font"

import MainCard from "../../components/MainCard"
import ContactList from "../../components/ContactList"

import styles from "./styles"

const data = [
  { id: 1, name: "André", itens: "4 itens", value: 70.5 },
  { id: 2, name: "Samira", itens: "2 itens", value: 90.0 },
  { id: 3, name: "Carlos", itens: "5 itens", value: 150.0 },
  { id: 4, name: "Alan", itens: "1 itens", value: 50.0 },
  { id: 5, name: "Laura", itens: "3 itens", value: 140.0 },
  { id: 6, name: "Laura", itens: "3 itens", value: 140.0 },
  { id: 7, name: "Laura", itens: "3 itens", value: 140.0 },
  { id: 8, name: "Laura", itens: "3 itens", value: 140.0 },
  { id: 9, name: "Laura", itens: "3 itens", value: 140.0 },
  { id: 10, name: "Laura", itens: "3 itens", value: 140.0 },
]

function Home({ navigation }) {
  const [loaded] = useFonts({
    RalewayBold: require("../../fonts/Raleway-Bold.ttf"),
    Montserrat: require("../../fonts/Montserrat-Regular.ttf"),
  })

  if (!loaded) {
    return null
  }
  return (
    <View style={styles.homescreen}>
      <MainCard />
      <View>
        <Text style={{ fontFamily: "RalewayBold", fontSize: 24 }}>
          Entregas do Dia
        </Text>
      </View>
      <ScrollView style={styles.clientes}>
        <View style={styles.cards}>
          <ContactList data={data} navigation={navigation} />
        </View>
      </ScrollView>
    </View>
  )
}

export default Home
