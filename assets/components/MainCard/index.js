import { Text, View } from "react-native"
import { useFonts } from "expo-font"
import { useState } from "react"
import { AnimatedCircularProgress } from "react-native-circular-progress"
import styles from "./styles"

function MainCard({ data }) {
  const [loaded] = useFonts({
    RalewayBold: require("../../fonts/Raleway-Bold.ttf"),
    Montserrat: require("../../fonts/Montserrat-Regular.ttf"),
  })

  if (!loaded) {
    return null
  }

  const finalValueSum = data.reduce(
    (acumulator, item) => acumulator + item.finalValue,
    0
  )

  const totalDaliveries = data.length
  const completedDeliveries = data.filter((item) => item.isDelivered === true)
  const fill =
    totalDaliveries >= 1
      ? (completedDeliveries.length / totalDaliveries) * 100
      : 100

  return (
    <View style={styles.MainCard}>
      <Text style={{ fontFamily: "RalewayBold", fontSize: 24 }}>
        Resumo do Dia
      </Text>
      <View style={styles.stats}>
        <AnimatedCircularProgress
          size={120}
          width={10}
          fill={fill}
          tintColor="#D7EBE9"
          backgroundColor="#E2958C"
        >
          {(fill) => (
            <Text style={{ fontFamily: "Montserrat", fontSize: 30 }}>
              {Math.round(fill)}%
            </Text>
          )}
        </AnimatedCircularProgress>
        <View style={{ alignItems: "center", paddingTop: "10%" }}>
          <Text style={{ fontFamily: "Montserrat" }}>
            {completedDeliveries.length} / {totalDaliveries} entregas completas
          </Text>
          <Text style={{ fontFamily: "Montserrat" }}>
            {new Intl.NumberFormat("pt-BR", {
              style: "currency",
              currency: "BRL",
            }).format(finalValueSum)}{" "}
            ganhos
          </Text>
        </View>
      </View>
    </View>
  )
}

export default MainCard
