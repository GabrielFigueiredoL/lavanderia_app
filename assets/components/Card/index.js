import { View, Text, TouchableOpacity } from "react-native"
import { useFonts } from "expo-font"

import styles from "./styles"

function Card({ onPress, name, itens, value }) {
  const [loaded] = useFonts({
    RalewayBold: require("../../fonts/Raleway-Bold.ttf"),
    Montserrat: require("../../fonts/Montserrat-Regular.ttf"),
  })

  if (!loaded) {
    return null
  }

  return (
    <View>
      <TouchableOpacity onPress={onPress} style={styles.container}>
        <Text style={{ fontFamily: "RalewayBold", fontSize: 16 }}>{name}</Text>
        <Text style={{ fontFamily: "Montserrat", fontSize: 12 }}>{itens}</Text>
        <Text style={{ fontFamily: "Montserrat", fontSize: 12 }}>{value}</Text>
      </TouchableOpacity>
    </View>
  )
}

export default Card
