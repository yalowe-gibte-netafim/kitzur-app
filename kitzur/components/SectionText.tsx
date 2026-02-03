import { View, Text } from "react-native";

export default function SectionText({ text }: { text: string }) {
  return (
    <View style={{ paddingHorizontal: 20, paddingVertical: 16 }}>
      <Text style={{ fontSize: 20, lineHeight: 30, textAlign: "right", paddingRight: 8 }}>
        {text}
      </Text>
    </View>
  );
}
