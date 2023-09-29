import { Text, View, ScrollView } from "react-native"
import { useState } from "react"
import { useFonts } from "expo-font"
import { Dropdown } from "react-native-element-dropdown"

import Card from "../../components/Card"

import styles from "./styles"
import ContactList from "../../components/ContactList"

const options = [
  { label: "Todas as Entregas", value: "1" },
  { label: "Entregas Pendentes", value: "2" },
  { label: "Entregas Concluidas", value: "3" },
]

function ContactsScreen({ navigation }) {
  const [value, setValue] = useState("1")

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
          <ContactList />
        </View>
      </ScrollView>
    </View>
  )
}

export default ContactsScreen
