import { Text, View, ScrollView } from "react-native"
import { Dropdown } from "react-native-element-dropdown"
import { useAsyncStorage } from "@react-native-async-storage/async-storage"
import { useState, useCallback, useEffect } from "react"
import { useFocusEffect } from "@react-navigation/native"

import styles from "./styles"
import ContactList from "../../components/ContactList"

const options = [
  { label: "Todas as Entregas", value: "1" },
  { label: "Entregas Pendentes", value: "2" },
  { label: "Entregas Concluidas", value: "3" },
]

function ContactsScreen({ navigation, route }) {
  const [value, setValue] = useState("1")
  const [data, setData] = useState([])
  const { getItem, setItem } = useAsyncStorage("@lavanderia_app:clientes")

  useFocusEffect(
    useCallback(() => {
      setData([])
      handleFetchData()
    }, [])
  )

  useEffect(() => {
    updateData()
  }, [data])

  async function updateData() {
    await setItem(JSON.stringify(data))
  }

  async function handleFetchData() {
    const response = await getItem()
    const previousData = response ? JSON.parse(response) : []
    setData(previousData)
  }

  return (
    <View style={styles.contactscreen}>
      <Dropdown
        selectedTextStyle={{ fontSize: 24, fontFamily: "RalewayBold" }}
        containerStyle={{ borderRadius: 20 }}
        data={options}
        maxHeight={300}
        labelField="label"
        valueField="value"
        value={value}
        onChange={(item) => {
          setValue(item.value)
        }}
      />
      <ScrollView style={styles.clientes}>
        <View style={styles.cards}>
          <ContactList
            navigation={navigation}
            route={route}
            data={data}
            setData={setData}
          />
        </View>
      </ScrollView>
    </View>
  )
}

export default ContactsScreen
