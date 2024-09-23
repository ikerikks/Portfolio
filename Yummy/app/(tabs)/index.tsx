import {
  SQLiteProvider,
  useSQLiteContext,
  type SQLiteDatabase
} from 'expo-sqlite';
import * as SQLite from "expo-sqlite";
import { SafeAreaView } from "react-native";
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import HomeScreen from "../Home/HomeScreen"
import { useState, useEffect } from "react";

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaView style={{ flex: 1 }}>
        <SQLiteProvider databaseName="yummy" onInit={setUpDatabase}>
          <HomeScreen />
        </SQLiteProvider>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
}

const setUpDatabase = async (db: SQLiteDatabase) => {
  try {
    await db.execAsync(`
    PRAGMA journal_mode = WAL;
    CREATE TABLE IF NOT EXISTS categories (
    id INTEGER PRIMARY KEY NOT NULL, 
    name TEXT NOT NULL, 
    symbol TEXT
    );
    
    CREATE TABLE IF NOT EXISTS world_food (
    id INTEGER PRIMARY KEY NOT NULL, 
    origin TEXT NOT NULL, 
    symbol TEXT
    );
    
    CREATE TABLE IF NOT EXISTS favorites (
    id INTEGER PRIMARY KEY NOT NULL, 
    title TEXT NOT NULL, 
    img TEXT NOT NULL,
    ingredients TEXT NOT NULL,
    instructions TEXT NOT NULL
    );
  
  
    INSERT OR REPLACE INTO categories (id, name, symbol) VALUES 
    (1, "All", ""),
    (2, "Breakfast", "🥞"),
    (3, "Starter", "🍜"),
    (4, "Dessert", "🍰"),
    (5, "Side", "🧀"),
    (6, "Beef", "🥩"),
    (7, "Chicken", "🐔"),
    (8, "Pork", "🍖"),
    (9, "Lamb", ""),
    (10, "Goat", ""),
    (11, "Pasta", "🍝"),
    (12, "Seafood", "🦐"),
    (13, "Vegetarian", "🥗");
  
    INSERT OR REPLACE INTO world_food (id, origin, symbol) VALUES 
    (1, "Italian", "🍕"),
    (2, "Mexican", "🌮"),
    (3, "Japanese", "🍣"),
    (4, "Chinese", "🐉"),
    (5, "French", "🇫🇷"),
    (6, "Indian", "🌶️"),
    (7, "Spanish", "🇪🇸"),
    (8, "Greek", "🇬🇷"),
    (9, "American", "🍔");
    `);
    
    console.log('Database opened successfully:', db);
  } catch (error) {
    console.log(error);
  }
}
