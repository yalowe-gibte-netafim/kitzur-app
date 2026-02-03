import { useState } from "react";
import { View, TextInput, StyleSheet } from "react-native";

type Props = { placeholder?: string; onChange: (q: string) => void; };

export default function SearchBar({ placeholder = "חיפוש…", onChange }: Props) {
  const [value, setValue] = useState("");
  return (
    <View style={styles.wrap}>
      <TextInput
        value={value}
        onChangeText={(t)=>{ setValue(t); onChange(t); }}
        placeholder={placeholder}
        style={styles.input}
        textAlign="right"
      />
    </View>
  );
}
const styles = StyleSheet.create({
  wrap: { padding: 12 },
  input: {
    borderWidth: 1, borderColor: "#ccc", borderRadius: 8,
    padding: 10, fontSize: 18
  }
});
