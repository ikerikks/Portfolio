import { View, ScrollView, Text, Pressable, StyleSheet, Platform } from "react-native";
// "#e8eae9"
// selected option : #66a17a
export default function Filter(props: { 
  text: string, 
  symbol?: string,
  selected: string,
  update: any
}) {
  const { text, symbol, selected, update } = props;
  const handlePress = () => {
    update(text);
  };

  return (
    <Pressable style={[styles.option, {backgroundColor: selected === text 
    ? "#66a17a": "#deede1"}]} 
    onPress={handlePress}>
      <Text style={{
        fontSize: 15,
        fontWeight: "500",
        color: "#21412f",
      }}> <Text style={{ fontSize: 17 }}>{symbol}</Text> {text}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  option: {
    width: 105,
    height: 35,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 10,
    marginRight: 8
  }
})