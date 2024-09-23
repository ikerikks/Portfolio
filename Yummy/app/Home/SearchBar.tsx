import { View, TextInput, StyleSheet,TouchableOpacity } from "react-native";
import { useState } from "react";
import { Ionicons } from "@expo/vector-icons";

export default function SearchBar() {
  const [note, setNote] = useState("");
  
  return (
    <View style={styles.container}>
      <View style={styles.searchBox}>
        <Ionicons style={{ alignSelf: "center" }} name="search-outline" size={25} />
        <TextInput style={styles.input}
          placeholder="Search any recipes"
          onChangeText={setNote}
          value={note}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 25,
    height: 50,
    marginBottom: 25
  },
  searchBox: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "#fff",
    paddingLeft: 10,
    borderRadius: 15
  },
  input: {
    flex: 1,
    paddingLeft: 15,
    fontWeight: "bold",
    fontSize: 16,
  },
})