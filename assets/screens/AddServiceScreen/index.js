import { ScrollView, View } from "react-native"
import { useFonts } from "expo-font"
import { useState, useCallback } from "react"
import { useFocusEffect } from "@react-navigation/native"
import { useAsyncStorage } from "@react-native-async-storage/async-storage"
import uuid from "react-native-uuid"
import Toast from "react-native-toast-message"

import Form from "../../components/Form"
import styles from "./styles"

function AddService() {
  const [clientName, setClientName] = useState()
  const [clientContact, setClientContact] = useState()
  const [localCep, setLocalCep] = useState()
  const [localName, setLocalName] = useState()
  const [localNumber, setLocalNumber] = useState()
  const [selectedDate, setSelectedDate] = useState()
  const [selectedItems, setSelectedItems] = useState([])
  const [selectedList, setSelectedList] = useState()
  const [freightage, setFreightage] = useState()
  const [discount, setDiscount] = useState()
  const [totalValue, setTotalValue] = useState(0)
  const { getItem, setItem } = useAsyncStorage("@lavanderia_app:clientes")

  useFocusEffect(
    useCallback(() => {
      setClientName("")
      setClientContact("")
      setLocalCep("")
      setLocalNumber("")
      setLocalName("")
      setSelectedDate("")
      setSelectedItems([])
      setSelectedList([])
      setDiscount("")
      setFreightage("")
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

  function changeDate(brDate) {
    const piece = brDate.split("/")
    return new Date(piece[2], piece[1] - 1, piece[0])
  }

  function sortDateDescending(newData, previousData) {
    const newDate = changeDate(newData.selectedDate)
    const data = [
      ...previousData.filter((item) => changeDate(item.selectedDate) > newDate),
      newData,
      ...previousData.filter(
        (item) => changeDate(item.selectedDate) <= newDate
      ),
    ]

    return data
  }

  async function handleNew() {
    try {
      const id = uuid.v4()
      const isDelivered = false
      const finalValue = totalValue - discount + Number(freightage)
      const todayDate = new Date().toLocaleDateString("en-GB")
      const newData = {
        id,
        clientName,
        clientContact,
        localName,
        localCep,
        selectedDate,
        selectedItems,
        totalValue,
        discount,
        freightage,
        isDelivered,
        finalValue,
        todayDate,
        localNumber,
      }

      const response = await getItem()
      const previousData = response ? JSON.parse(response) : []

      await setItem(JSON.stringify(sortDateDescending(newData, previousData)))
      Toast.show({
        type: "success",
        text1: "Serviço adicionado com sucesso",
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

  return (
    <View style={styles.container}>
      <Form
        clientName={clientName}
        setClientName={setClientName}
        clientContact={clientContact}
        setClientContact={setClientContact}
        localName={localName}
        setLocalName={setLocalName}
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
        selectedItems={selectedItems}
        setSelectedItems={setSelectedItems}
        discount={discount}
        setDiscount={setDiscount}
        totalValue={totalValue}
        setTotalValue={setTotalValue}
        handleSubmit={handleNew}
        buttonTitle="Adicionar serviço"
        setSelectedList={setSelectedList}
        selectedList={selectedList}
        freightage={freightage}
        setFreightage={setFreightage}
        localCep={localCep}
        setLocalCep={setLocalCep}
        setLocalNumber={setLocalNumber}
        localNumber={localNumber}
      />
    </View>
  )
}

export default AddService
