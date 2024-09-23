import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable
} from "react-native";
import {
  useSQLiteContext,
  type SQLiteDatabase
} from 'expo-sqlite';
import Filter from "./Categories/Filter";
import { useState, useEffect } from "react";

export default function FilterList() {
  const db = useSQLiteContext();
  const [selected, setSelected] = useState("All");
  const [categories, setCategories]: any[] = useState([]);

  useEffect(() => {
    const execute = async () => {
      try {
        const result = await db.getAllAsync(`
        SELECT name, symbol FROM categories
        LIMIT 4 OFFSET 0;
        `);
        console.log('RESULTS: ', result);
        setCategories(result);
      } catch (error) {
        console.log("error");
      }
    };
    execute();
  }, [])

  return (
    <ScrollView horizontal={true} style={{}} contentContainerStyle={{
      paddingLeft: 25,
    }}>
      <Filter text="All" symbol=""selected={selected} 
      update={setSelected} />
      { categories.map((filter: { name: string; symbol: string }, index: number) => {
          return (
            <Filter key={index} text={filter.name} symbol={filter.symbol}
              selected={selected} update={setSelected} /> 
          );
        })
      }
    </ScrollView>
  );
}

// const styles = StyleSheet.create({
//   container: {
//     // paddingHorizontal : 25,
//     // backgroundColor: "green"
//   }
// });