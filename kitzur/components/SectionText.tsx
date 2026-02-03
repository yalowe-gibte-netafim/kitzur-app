import { View, Text } from "react-native";

export default function SectionText({ text }: { text: string }) {
  return (
    <View style={{ padding: 16 }}>
      <Text style={{ fontSize: 20, lineHeight: 30, textAlign: "right" }}>
        {text}
      </Text>
    </View>
  );
}
