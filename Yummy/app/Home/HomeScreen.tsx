import { 
  View, 
  Text, 
  ScrollView, 
  Pressable, 
  StyleSheet 
} from "react-native";
import { useWindowDimensions } from 'react-native';
import Header from "./Header";
import SearchBar from "./SearchBar";
import CategoriesSection from "./Categories/CategoriesSection";
import { useState } from "react";
// import FilterGrid from "./FilterGrid";
// import Categories from "./Categories";
// COLOR #d4d7d6


export default function HomeScreen() {
  const { height, width } = useWindowDimensions();
  const [option, setOption]: any[] = useState("");

  return (
    <View style={{
      backgroundColor: "#f3f3f3",
      height: "100%",
    }}>
      <Header />
      <SearchBar />
      <Text>{option}</Text>
      <CategoriesSection display={setOption}/>
    </View>
  );
}

const categories = StyleSheet.create({
  container: {
    marginHorizontal: 25,
    marginTop: 30,
    flexDirection: "row",
    justifyContent: "space-between"
  }
})