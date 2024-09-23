import { MasonryFlashList } from "@shopify/flash-list";
import { useEffect } from "react";
import { useState } from "react";
import { useSQLiteContext } from "expo-sqlite";

export default function ImageGrid(props: {option: string}) {
  const db = useSQLiteContext();
  const { option } = props;
  // const [data, setData] = useState([]);
  useEffect(() => {
    let generalSection: any[] = [];
    let cuisineSection: any[] = [];

    const execute = async () => {
      try {
        const categories = await db.getAllAsync(`
        SELECT name FROM categories;
        `);
        const cuisine = await db.getAllAsync(`
        SELECT origin FROM world_food;
        `);
        generalSection = categories;
        cuisineSection = cuisine;
      } catch (error) {
        console.log(error);
      }
    };
    execute();

    try {
      const url = generalSection.includes(option)
      ? `www.themealdb.com/api/json/v1/1/filter.php?c=${option}`
      : `www.themealdb.com/api/json/v1/1/filter.php?a=${option}`
      fetch(url)
      .then((response) => response.json)
      .then((data) => {})
    } catch(error) {
      console.log(error);
    }

  }, [])
  return (
    <MasonryFlashList
      data={}
      numColumns={2}
      renderItem={({ item }) => <Text>{item.title}</Text>}
      estimatedItemSize={200}
    />
  );
}