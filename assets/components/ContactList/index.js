import { FlatList, Text, View } from "react-native"
import { useAsyncStorage } from "@react-native-async-storage/async-storage"
import Card from "../Card"
import styles from "./styles"

const ListaVazia = () => {
  return (
    <View style={styles.container}>
      <Text>Nenhuma entrega encontrada...</Text>
    </View>
  )
}

function ContactList({ navigation, data, setData, route }) {
  const { setItem } = useAsyncStorage("@lavanderia_app:clientes")
  const currentDate = new Date().toLocaleDateString("en-GB")
  const toggleDelivery = async (itemId) => {
    const itemIndex = data.findIndex((item) => item.id === itemId)

    if (itemIndex !== -1) {
      const updatedData = [...data]
      updatedData[itemIndex] = {
        ...updatedData[itemIndex],
        isDelivered: !updatedData[itemIndex].isDelivered,
      }
      try {
        setData(updatedData)
        await setItem(JSON.stringify(updatedData))
      } catch (error) {
        console.error(
          "Erro ao atualizar a lista de registros no AsyncStorage:",
          error
        )
      }
    }
  }

  const renderOptions = ({ item, index }) => {
    if (route.name == "Tela Inicial" && item.selectedDate == currentDate) {
      return (
        <Card
          item={item}
          onPress={() => {
            navigation.navigate("Detalhes", { item, index })
          }}
          toggleDelivery={toggleDelivery}
        />
      )
    } else if (route.name == "Serviços") {
      return (
        <Card
          item={item}
          onPress={() => {
            navigation.navigate("Detalhes", { item, index })
          }}
          toggleDelivery={toggleDelivery}
        />
      )
    } else {
      return ""
    }
  }
  return (
    <FlatList
      data={data}
      numColumns={2}
      scrollEnabled={false}
      columnWrapperStyle={{
        justifyContent: "space-between",
      }}
      ListEmptyComponent={ListaVazia}
      renderItem={renderOptions}
      keyExtractor={(item, index) => index.toString()}
    />
  )
}

export default ContactList
