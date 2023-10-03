import { useState } from "react"
import { useAsyncStorage } from "@react-native-async-storage/async-storage"
import { Button } from "react-native-paper"
import Form from "../../components/Form"
import { ScrollView, View } from "react-native"
import uuid from "react-native-uuid"
import Toast from "react-native-toast-message"

import styles from "./styles"

function EditContactScreen({ route, navigation }) {
  const { getItem, setItem } = useAsyncStorage("@lavanderia_app:clientes")
  const contactData = route.params.item

  const [selectedDate, setSelectedDate] = useState(contactData.selectedDate)
  const [selectedItems, setSelectedItems] = useState(contactData.selectedItems)
  const [contactName, setContactName] = useState(contactData.contactName)
  const [localName, setLocalName] = useState(contactData.localName)
  const [discount, setDiscount] = useState(contactData.discount)
  const [totalValue, setTotalValue] = useState(contactData.totalValue)

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

  async function handleEdit(contactId) {
    try {
      const id = uuid.v4()
      const newData = {
        id,
        contactName,
        localName,
        selectedDate,
        selectedItems,
        totalValue,
        discount,
      }

      const response = await getItem()
      const previousData = response ? JSON.parse(response) : []

      await setItem(JSON.stringify(sortDateDescending(newData, previousData)))
      await handleRemove(contactId)
      Toast.show({
        type: "success",
        text1: "Serviço editado com sucesso",
        visibilityTime: 1500,
      })
    } catch (error) {
      console.log(error)
      Toast.show({
        type: "error",
        text1: "Não foi possivel adicionar o cliente!",
      })
    }
  }

  async function handleRemove(id) {
    try {
      const response = await getItem()
      const previousData = response ? JSON.parse(response) : []

      const data = previousData.filter((item) => item.id !== id)
      setItem(JSON.stringify(data))
      navigation.navigate("RootScreen")
      Toast.show({
        type: "success",
        text1: "Serviço excluido com sucesso",
        visibilityTime: 1500,
      })
    } catch (error) {
      console.log(error)
      Toast.show({
        type: "error",
        text1: "Não foi possivel adicionar o cliente!",
      })
    }
  }

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scroll}>
        <Form
          contactName={contactName}
          setContactName={setContactName}
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
          handleSubmit={() => handleEdit(contactData.id)}
          buttonTitle="Salvar Alterações"
        />
        <Button
          mode="contained"
          buttonColor="#cd5c5c"
          textColor="#F8F8F8"
          style={styles.button}
          onPress={() => handleRemove(contactData.id)}
        >
          Excluir Contato
        </Button>
      </ScrollView>
    </View>
  )
}

export default EditContactScreen
