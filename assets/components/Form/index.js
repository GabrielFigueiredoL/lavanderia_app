import { Text, View, ScrollView } from "react-native"
import { useFonts } from "expo-font"
import { TextInput, Button } from "react-native-paper"
import { useEffect, useState } from "react"
import Toast from "react-native-toast-message"

import styles from "./styles"
import DatePicker from "../../components/DatePicker"
import MultipleSelectionList from "../MultipleSelectionList"
import axios from "axios"

const api = axios.create({
  baseURL: "https://viacep.com.br/ws/",
})

function Form({
  clientName,
  setClientName,
  localName,
  setLocalName,
  selectedDate,
  clientContact,
  setClientContact,
  setSelectedDate,
  selectedItems,
  setSelectedItems,
  discount,
  setDiscount,
  totalValue,
  setTotalValue,
  handleSubmit,
  buttonTitle,
  setSelectedList,
  selectedList,
  setFreightage,
  freightage,
  localCep,
  setLocalCep,
  setLocalNumber,
  localNumber,
}) {
  const [isValid, setIsValid] = useState(false)
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    const checkValidity = () => {
      if (isNaN(discount) || isNaN(freightage)) {
        setIsValid(false)
      } else {
        setIsValid(true)
      }
    }

    checkValidity()
  }, [discount, freightage])

  const [loaded] = useFonts({
    RalewayBold: require("../../fonts/Raleway-Bold.ttf"),
    Montserrat: require("../../fonts/Montserrat-Regular.ttf"),
  })
  if (!loaded) {
    return null
  }

  const renderButton = () => {
    if (
      selectedDate != "" &&
      selectedItems.length != 0 &&
      clientName != "" &&
      localName != "" &&
      clientContact != "" &&
      isValid
    ) {
      return true
    } else {
      return false
    }
  }

  async function searchCep() {
    if (!localCep) {
      Toast.show({
        type: "error",
        text1: "Cep Inválido",
      })
      setLocalCep("")
    }

    try {
      setLoading(true)
      const response = await api.get(`/${localCep}/json`)
      setLocalName(`${response.data.logradouro}, ${response.data.bairro}`)
    } catch (error) {
      console.log(error)
      Toast.show({
        type: "error",
        text1: "Falha ao buscar o cep",
      })
    }
    setLoading(false)
  }
  return (
    <ScrollView>
      <View style={styles.container}>
        <TextInput
          placeholder="Insira o nome do(a) cliente"
          mode="outlined"
          label="Nome do(a) cliente"
          outlineColor="#89CCC5"
          activeOutlineColor="#272727"
          onChangeText={setClientName}
          value={clientName}
        />
        <TextInput
          placeholder="Insira o contato do(a) cliente"
          mode="outlined"
          inputMode="decimal"
          label="Contato do(a) cliente"
          outlineColor="#89CCC5"
          activeOutlineColor="#272727"
          onChangeText={setClientContact}
          value={clientContact}
        />
        <View style={styles.cepInput}>
          <TextInput
            placeholder="Insira o cep do local"
            mode="outlined"
            label="Cep do local"
            outlineColor="#89CCC5"
            activeOutlineColor="#272727"
            onChangeText={setLocalCep}
            value={localCep}
            style={{ width: "75%" }}
          />
          <Button
            mode="outlined"
            compact="true"
            style={styles.searchButton}
            onPress={searchCep}
            loading={loading}
          >
            Buscar
          </Button>
        </View>
        <TextInput
          placeholder="Insira o local de entrega"
          mode="outlined"
          label="Local da entrega"
          outlineColor="#89CCC5"
          activeOutlineColor="#272727"
          onChangeText={setLocalName}
          value={localName}
        />
        <TextInput
          placeholder="Insira o número do local"
          mode="outlined"
          label="número do local"
          outlineColor="#89CCC5"
          activeOutlineColor="#272727"
          onChangeText={setLocalNumber}
          value={localNumber}
        />
        <DatePicker
          placeholder={"Data de entrega"}
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
        />
        <Text style={{ fontFamily: "RalewayBold", fontSize: 24 }}>
          Serviços
        </Text>
        <MultipleSelectionList
          selectedItems={selectedItems}
          setSelectedItems={setSelectedItems}
          setTotalValue={setTotalValue}
          setSelectedList={setSelectedList}
          selectedList={selectedList}
        />

        <Text style={{ fontFamily: "Montserrat", fontSize: 16 }}>
          Valor Total:{" "}
          {new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
          }).format(totalValue)}
        </Text>
        <TextInput
          placeholder="Frete"
          mode="outlined"
          label="Frete"
          outlineColor="#89CCC5"
          activeOutlineColor="#272727"
          onChangeText={setFreightage}
          inputMode="decimal"
          value={freightage}
        />
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
        {!isValid ? (
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
            }).format(totalValue - discount + Number(freightage))}
          </Text>
        )}

        {renderButton() && (
          <Button
            mode="contained"
            buttonColor="#89CCC5"
            textColor="#272727"
            onPress={handleSubmit}
          >
            {buttonTitle}
          </Button>
        )}
      </View>
    </ScrollView>
  )
}

export default Form
