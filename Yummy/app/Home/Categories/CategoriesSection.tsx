import React, { useCallback, useMemo, useRef } from "react";
import { View, Text, StyleSheet, ScrollView, Pressable } from "react-native";
import { useWindowDimensions } from 'react-native';
import { useSQLiteContext, type SQLiteDatabase } from 'expo-sqlite';
import { useState, useEffect } from "react";
import Filter from "./Filter";
import {
  BottomSheetModal,
  BottomSheetView,
  BottomSheetModalProvider,
} from "@gorhom/bottom-sheet";


export default function CategoriesSection(props: any) {
  const db = useSQLiteContext();
  const { height, width } = useWindowDimensions();
  const { display } = props;
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const snapPoints: any = useMemo(() => ["50%", "85%"], []);
  const handlePresentModal = () => {
    bottomSheetModalRef.current?.present();
  };
  const handleCloseModal = () => {
    bottomSheetModalRef.current?.close();
  };

  const [selected, setSelected] = useState("All");
  const [frontFilters, setFrontFilters]: any[] = useState([]);
  const [backFilters, setBackFilters]: any[] = useState([]);
  const [coutryFilters, setCountryFilters]: any[] = useState([]);

  display(selected);

  useEffect(() => {
    const execute = async () => {
      try {
        const mainFilters = await db.getAllAsync(`
        SELECT * FROM categories
        LIMIT 4 OFFSET 0;
        `);
        const allFilters = await db.getAllAsync(`
        SELECT * FROM categories;
        `);
        const cuisine = await db.getAllAsync(`
        SELECT * FROM world_food;
        `);
        setFrontFilters(mainFilters);
        setBackFilters(allFilters);
        setCountryFilters(cuisine);
      } catch (error) {
        console.log(error);
      }
    };
    execute();
  }, [])

  return (
    <BottomSheetModalProvider>
      <View style={styles.container}>
        <View style={{
          flexDirection: "row",
          justifyContent: "space-between",
          paddingHorizontal: 25
        }}>
          <Text style={{
            fontSize: 18,
            fontWeight: "bold",
            color: "#21412f"
          }}>Categories</Text>

          <Pressable style={{ justifyContent: "flex-end" }}
            onPress={handlePresentModal}>
            <Text style={{
              fontSize: 16,
              fontWeight: "bold",
              color: "#0c9a61"
            }}>See all</Text>
          </Pressable>
        </View>
        <ScrollView horizontal={true} style={{}}
          contentContainerStyle={{ paddingLeft: 25 }}
          showsHorizontalScrollIndicator={false}>
          {frontFilters.map((filter: { id: number, name: string; symbol: string }) => {
            return (
              <Filter key={filter.id} text={filter.name} symbol={filter.symbol}
                selected={selected} update={setSelected} />
            );
          })}
        </ScrollView>

        <BottomSheetModal
          ref={bottomSheetModalRef}
          snapPoints={snapPoints}
          backgroundStyle={{ borderRadius: 25 }}
        >
          <View style={{
            paddingLeft: 10,
            paddingRight: 30,
            flexDirection: "row",
            justifyContent: "space-between",
          }}>
            <View>
              <Text style={{
                fontSize: 16,
                fontWeight: "bold",
                color: '#21412f',
              }}>General</Text>
              <View style={{
                height: 4, width: 15,
                borderRadius: 25, backgroundColor: "#21412f"
              }}></View>
            </View>
            <Pressable onPress={handleCloseModal}>
              <Text style={{
                color: "#21412f",
                fontWeight: "bold",
                fontSize: 20
              }}>OK</Text>
            </Pressable>
          </View>
          <View style={{
            flexDirection: "row",
            justifyContent: "space-evenly",
            flexWrap: "wrap",
          }}>
            {backFilters.map((filter: { id: number, name: string; symbol: string }) => {
              if (filter.name !== "All") {
                return (
                  <Filter key={filter.id} text={filter.name} symbol={filter.symbol}
                    selected={selected} update={setSelected} />
                );
              }
            })}
          </View>
          <View style={{ paddingHorizontal: 10 }}>
            <Text style={{
              fontSize: 16,
              fontWeight: "bold",
              color: '#21412f',
            }}>Cuisine</Text>
            <View style={{
              height: 4, width: 15,
              borderRadius: 25, backgroundColor: "#21412f"
            }}></View>
          </View>
          <View style={{
            flexDirection: "row",
            justifyContent: "space-evenly",
            flexWrap: "wrap",
          }}>
            {coutryFilters.map((filter: { id: number, origin: string; symbol: string }) => {
              return (
                <Filter key={filter.id} text={filter.origin} symbol={filter.symbol}
                  selected={selected} update={setSelected} />
              );
            })}
          </View>


        </BottomSheetModal>

      </View>
    </BottomSheetModalProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    
    // padding: 24,
    // justifyContent: 'center',
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
  },
});
