import { Text, View, ScrollView } from "react-native"
import { useFonts } from "expo-font"
import { useState } from "react"

import MainCard from "../../components/MainCard"
import ContactList from "../../components/ContactList"

import styles from "./styles"

function Home({ navigation, route }) {
  const [data, setData] = useState([])
  const [loaded] = useFonts({
    RalewayBold: require("../../fonts/Raleway-Bold.ttf"),
    Montserrat: require("../../fonts/Montserrat-Regular.ttf"),
  })

  if (!loaded) {
    return null
  }

  return (
    <View style={styles.homescreen}>
      <MainCard data={data} />
      <View>
        <Text style={{ fontFamily: "RalewayBold", fontSize: 24 }}>
          Entregas do Dia
        </Text>
      </View>
      <ScrollView style={styles.clientes}>
        <View>
          <ContactList
            navigation={navigation}
            route={route}
            data={data}
            setData={setData}
          />
        </View>
      </ScrollView>
    </View>
  )
}

export default Home
