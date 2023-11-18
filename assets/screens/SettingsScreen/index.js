import { FlatList, ScrollView, Text, View } from "react-native"
import { useAsyncStorage } from "@react-native-async-storage/async-storage"
import { useCallback, useState } from "react"
import { useFocusEffect } from "@react-navigation/native"
import { Button, TextInput } from "react-native-paper"
import Toast from "react-native-toast-message"

import styles from "./styles"

function SettignsScreen() {
  const [itemData, setItemData] = useState([])
  const [isNumber, setIsNumber] = useState(true)
  const { getItem, setItem } = useAsyncStorage("@lavanderia_app:items")

  useFocusEffect(
    useCallback(() => {
      setItemData([])
      handleFetchData()
      setIsNumber(true)
    }, [])
  )
  async function updateItemList() {
    try {
      await setItem(JSON.stringify(itemData))
      Toast.show({
        type: "success",
        text1: "Serviço atualizado com sucesso",
        visibilityTime: 1500,
      })
    } catch (error) {
      console.log(error)
      Toast.show({
        type: "error",
        text1: "Não foi possivel adicionar o serviço!",
      })
    }
  }

  async function handleFetchData() {
    const response = await getItem()
    const previousData = response ? JSON.parse(response) : []
    setItemData(previousData)
  }

  function handleChange(id, text) {
    if (isNaN(text)) {
      setIsNumber(false)
    } else {
      setIsNumber(true)
    }
    setItemData((prevItens) =>
      prevItens.map((item) =>
        item.id === id ? { ...item, value: text } : item
      )
    )
  }

  const renderOptions = ({ item }) => {
    return (
      <View style={styles.item}>
        <TextInput
          placeholder={item.name}
          mode="outlined"
          label={item.name}
          outlineColor="#89CCC5"
          activeOutlineColor="#272727"
          value={item.value.toString()}
          onChangeText={(text) => handleChange(item.id, text)}
          inputMode="decimal"
        />
      </View>
    )
  }
  return (
    <ScrollView style={styles.container}>
      <View style={styles.settings}>
        <FlatList
          data={itemData}
          scrollEnabled={false}
          renderItem={renderOptions}
          keyExtractor={(item) => item.id}
        />
        {isNumber && (
          <Button
            mode="contained"
            buttonColor="#89CCC5"
            textColor="#272727"
            onPress={updateItemList}
          >
            Atualizar Valores
          </Button>
        )}
        {!isNumber && (
          <Text
            style={{ color: "#e64330", fontFamily: "Montserrat", fontSize: 16 }}
          >
            Verifique se algum dos campos possui vírgula, espaço ou o sinal de
            menos
          </Text>
        )}
      </View>
    </ScrollView>
  )
}

export default SettignsScreen
