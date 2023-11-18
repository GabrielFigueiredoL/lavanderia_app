import { Text, View, ScrollView } from "react-native"
import { useAsyncStorage } from "@react-native-async-storage/async-storage"
import { useState, useCallback, useEffect } from "react"
import { useFocusEffect } from "@react-navigation/native"

import MainCard from "../../components/MainCard"
import ContactList from "../../components/ContactList"

import styles from "./styles"

function Home({ navigation, route }) {
  const [data, setData] = useState([])
  const [filteredData, setFilteredData] = useState([])
  const { getItem, setItem } = useAsyncStorage("@lavanderia_app:clientes")
  const currentDate = new Date().toLocaleDateString("en-GB")

  useFocusEffect(
    useCallback(() => {
      setData([])
      setFilteredData([])
      handleFetchData()
    }, [])
  )

  useEffect(() => {
    const filteredData = data.filter((item) => item.selectedDate == currentDate)
    setFilteredData(filteredData)
  }, [data])

  async function handleFetchData() {
    const response = await getItem()
    const previousData = response ? await JSON.parse(response) : []
    setData(previousData)
  }

  return (
    <View style={styles.homescreen}>
      <MainCard data={filteredData} />
      <View>
        <Text style={{ fontFamily: "RalewayBold", fontSize: 24 }}>
          Entregas do Dia
        </Text>
      </View>
      <ScrollView style={styles.clientes}>
        <View>
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

export default Home
