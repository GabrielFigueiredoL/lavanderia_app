import { FlatList, Text, View } from "react-native"
import { useAsyncStorage } from "@react-native-async-storage/async-storage"
import { useCallback } from "react"

import { useFocusEffect } from "@react-navigation/native"

import Card from "../Card"

import styles from "./styles"

const ListaVazia = () => {
  return (
    <View style={styles.container}>
      <Text>Nenhuma entrega encontrada...</Text>
    </View>
  )
}

function ContactList({ navigation, route, data, setData }) {
  const { getItem, setItem, removeItem } = useAsyncStorage(
    "@lavanderia_app:clientes"
  )

  useFocusEffect(
    useCallback(() => {
      setData([])
      handleFetchData()
    }, [])
  )

  async function handleFetchData() {
    const todayDate = new Date().toLocaleDateString("pt-BR")

    const response = await getItem()

    const previousData = response ? JSON.parse(response) : []
    if (route.name == "Tela Inicial") {
      const data = previousData.filter((item) => item.selectedDate == todayDate)
      setData(data)
    } else {
      const data = response ? JSON.parse(response) : []
      setData(data)
    }
  }

  const toggleDelivery = async (itemId) => {
    const itemIndex = data.findIndex((item) => item.id === itemId)

    if (itemIndex !== -1) {
      const updatedData = [...data]
      updatedData[itemIndex] = {
        ...updatedData[itemIndex],
        isDelivered: !updatedData[itemIndex].isDelivered,
      }

      try {
        await setItem(JSON.stringify(updatedData))
        setData(updatedData)
      } catch (error) {
        console.error(
          "Erro ao atualizar a lista de registros no AsyncStorage:",
          error
        )
      }
    }
  }

  const renderOptions = ({ item, index }) => {
    return (
      <Card
        item={item}
        onPress={() => {
          navigation.navigate("Detalhes", { item, index })
        }}
        toggleDelivery={toggleDelivery}
      />
    )
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
