import { View, Text, TouchableOpacity } from "react-native"
import { useFonts } from "expo-font"
import { MaterialCommunityIcons } from "@expo/vector-icons"

import styles from "./styles"

function Card({ onPress, item, toggleDelivery }) {
  const [loaded] = useFonts({
    RalewayBold: require("../../fonts/Raleway-Bold.ttf"),
    Montserrat: require("../../fonts/Montserrat-Regular.ttf"),
  })

  if (!loaded) {
    return null
  }

  const {
    clientName,
    selectedItems,
    selectedDate,
    localName,
    isDelivered,
    id,
    finalValue,
  } = item

  const value = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(finalValue)

  return (
    <View
      style={[styles.container, isDelivered && { backgroundColor: "#D7EBE9" }]}
    >
      <TouchableOpacity onPress={onPress} style={styles.touchable}>
        <Text style={{ fontFamily: "RalewayBold", fontSize: 16 }}>
          {clientName}
        </Text>
        <Text style={{ fontFamily: "Montserrat", fontSize: 12 }}>
          {localName}
        </Text>
        <Text style={{ fontFamily: "Montserrat", fontSize: 12 }}>
          {selectedDate}
        </Text>
        <Text style={{ fontFamily: "Montserrat", fontSize: 12 }}>
          {selectedItems.length} {selectedItems.length > 1 ? "itens" : "item"}
        </Text>
        <Text style={{ fontFamily: "Montserrat", fontSize: 12 }}>{value}</Text>
      </TouchableOpacity>
      <View style={styles.button}>
        <TouchableOpacity onPress={() => toggleDelivery(id)}>
          <MaterialCommunityIcons
            name="truck-delivery-outline"
            size={24}
            color="green"
          />
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default Card
