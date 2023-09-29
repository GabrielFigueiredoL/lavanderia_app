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
          name={item.name}
          itens={item.itens}
          value={new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
          }).format(item.value)}
          onPress={onPress}
        />
      )}
      keyExtractor={(item) => item.id}
    />
  )
}

export default ContactList
