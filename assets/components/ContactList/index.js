import { FlatList, Text, View } from "react-native"
import Card from "../Card"

import styles from "./styles"

const ListaVazia = () => {
  return (
    <View style={styles.container}>
      <Text>Nenhuma entrega encontrada...</Text>
    </View>
  )
}

function ContactList({ data, navigation }) {
  const onPress = () => navigation.navigate("Edit")
  return (
    <FlatList
      data={data}
      scrollEnabled={false}
      ListEmptyComponent={ListaVazia}
      renderItem={({ item }) => (
        <Card
          name={item.contactName}
          itens={item.selectedItems.length}
          value={new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
          }).format(item.finalValue)}
          onPress={onPress}
        />
      )}
      keyExtractor={(item) => item.id}
    />
  )
}

export default ContactList
