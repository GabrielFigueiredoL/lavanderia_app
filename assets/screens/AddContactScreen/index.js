import { Text, View, ScrollView } from "react-native"
import { useFonts } from "expo-font"
import { TextInput, Button } from "react-native-paper"
import { useState, useCallback } from "react"
import { useFocusEffect } from "@react-navigation/native"
import AsyncStorage, {
  useAsyncStorage,
} from "@react-native-async-storage/async-storage"
import uuid from "react-native-uuid"
import Toast from "react-native-toast-message"

import styles from "./styles"
import DatePicker from "../../components/DatePicker"
import ItemList from "../../components/ItemList"

function AddContact({ navigation }) {
  const [selectedDate, setSelectedDate] = useState()
  const [selectedItems, setSelectedItems] = useState([])
  const [contactName, setContactName] = useState()
  const [localName, setLocalName] = useState()
  const [discount, setDiscount] = useState()
  const [totalValue, setTotalValue] = useState(0)
  const { getItem, setItem } = useAsyncStorage("@lavanderia_app:clientes")

  useFocusEffect(
    useCallback(() => {
      setSelectedDate("")
      setSelectedItems([])
      setContactName("")
      setLocalName("")
      setDiscount("")
      setTotalValue(0)
    }, [])
  )

  const [loaded] = useFonts({
    RalewayBold: require("../../fonts/Raleway-Bold.ttf"),
    Montserrat: require("../../fonts/Montserrat-Regular.ttf"),
  })
  if (!loaded) {
    return null
  }

  let finalValue = totalValue - discount

  async function handleNew() {
    try {
      const id = uuid.v4()
      const newData = {
        id,
        contactName,
        localName,
        selectedDate,
        selectedItems,
        finalValue,
      }

      const response = await getItem()
      const previousData = response ? JSON.parse(response) : []

      const data = [...previousData, newData]

      await setItem(JSON.stringify(data))
      Toast.show({
        type: "success",
        text1: "Cliente adicionado com sucesso",
      })
    } catch (error) {
      console.log(error)
      Toast.show({
        type: "error",
        text1: "Não foi possivel adicionar o cliente!",
      })
    }
  }

  const renderButton = () => {
    if (
      selectedDate != "" &&
      selectedItems.length != 0 &&
      contactName != "" &&
      localName != ""
    ) {
      return true
    } else {
      return false
    }
  }
  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={{ fontFamily: "RalewayBold", fontSize: 24 }}>
          Adicionar Serviço
        </Text>
        <TextInput
          placeholder="Insira o nome do(a) cliente"
          mode="outlined"
          label="Nome do(a) cliente"
          outlineColor="#89CCC5"
          activeOutlineColor="#272727"
          onChangeText={setContactName}
          value={contactName}
        />
        <TextInput
          placeholder="Insira o local de entrega"
          mode="outlined"
          label="Local da entrega"
          outlineColor="#89CCC5"
          activeOutlineColor="#272727"
          onChangeText={setLocalName}
          value={localName}
        />
        <DatePicker
          placeholder={"Data de entrega"}
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
        />
        <Text style={{ fontFamily: "RalewayBold", fontSize: 24 }}>
          Serviços
        </Text>
        <ItemList
          selectedItems={selectedItems}
          setSelectedItems={setSelectedItems}
          totalValue={totalValue}
          setTotalValue={setTotalValue}
        />
        <Text style={{ fontFamily: "Montserrat", fontSize: 16 }}>
          Valor Total:{" "}
          {new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
          }).format(totalValue)}
        </Text>
        <TextInput
          placeholder="Desconto?"
          mode="outlined"
          label="Desconto"
          outlineColor="#89CCC5"
          activeOutlineColor="#272727"
          onChangeText={setDiscount}
          inputMode="decimal"
          value={discount}
        />
        {isNaN(discount) ? (
          <Text
            style={{ color: "#e64330", fontFamily: "Montserrat", fontSize: 16 }}
          >
            Verifique se o disconto possui vírgula, espaço ou o sinal de menos
          </Text>
        ) : (
          <Text style={{ fontFamily: "Montserrat", fontSize: 16 }}>
            Valor Final:{" "}
            {new Intl.NumberFormat("pt-BR", {
              style: "currency",
              currency: "BRL",
            }).format(finalValue)}
          </Text>
        )}
        {renderButton() && (
          <Button
            mode="contained"
            buttonColor="#89CCC5"
            textColor="#272727"
            onPress={handleNew}
          >
            Adicionar Serviço
          </Button>
        )}
      </View>
    </ScrollView>
  )
}

export default AddContact
