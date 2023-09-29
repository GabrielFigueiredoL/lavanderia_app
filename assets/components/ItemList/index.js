import * as React from "react"
import { Text, View, FlatList, TouchableOpacity } from "react-native"
import { useFonts } from "expo-font"
import { useState } from "react"

import data from "../database/itemList.json"

import styles from "./styles"

const items = data.itemList

function ItemList({
  selectedItems,
  setSelectedItems,
  totalValue,
  setTotalValue,
}) {
  const [options, setOptions] = useState(items)

  const [loaded] = useFonts({
    RalewayBold: require("../../fonts/Raleway-Bold.ttf"),
    Montserrat: require("../../fonts/Montserrat-Regular.ttf"),
  })
  if (!loaded) {
    return null
  }

  const renderOptions = ({ item, index }) => {
    const { name, id, value } = item
    const isSelected = selectedItems.filter((i) => i === id).length > 0

    return (
      <View>
        <TouchableOpacity
          onPress={() => {
            if (isSelected) {
              setSelectedItems((prev) => prev.filter((i) => i !== id))
              setTotalValue(parseFloat((totalValue -= value)))
            } else {
              setSelectedItems((prev) => [...prev, id])
              setTotalValue(parseFloat((totalValue += value)))
            }
          }}
          style={[styles.item, isSelected && { backgroundColor: "#89CCC5" }]}
        >
          <Text
            style={{
              fontSize: 16,
              fontFamily: "RalewayBold",
              color: "#272727",
            }}
          >
            {name}
          </Text>
        </TouchableOpacity>
      </View>
    )
  }

  return (
    <View>
      <FlatList
        data={options}
        renderItem={renderOptions}
        scrollEnabled={false}
      />
    </View>
  )
}

export default ItemList
