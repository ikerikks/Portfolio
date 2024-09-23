import { View, Text, Pressable, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function Header() {
  return (
    <View style={styles.container}>
      <Text style={{
        fontSize: 25, 
        fontWeight: "bold", 
        color: "#21412f"
      }}>
        Cook Like a Pro –{"\n"}No <Text style={{ color: "#0c9a61" }}>Delivery</Text> Needed!
      </Text>
      <Pressable onPress={() => { alert('Favourites works') }}>
        <Ionicons name="heart-circle-outline" size={50} color={"#e2254d"} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 25,
    marginVertical: 30
  }
});
