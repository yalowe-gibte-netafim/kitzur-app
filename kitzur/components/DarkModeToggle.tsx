import { useColorScheme } from "react-native";
import { useEffect, useState } from "react";
import { getTheme, setTheme, ThemeMode } from "../utils/storage";
import { Pressable, Text } from "react-native";

export default function DarkModeToggle() {
  const system = useColorScheme();
  const [mode, setMode] = useState<ThemeMode>(getTheme());

  useEffect(() => {
    setTheme(mode);
    if (typeof document !== "undefined") {
      const isDark = mode === "dark" || (mode === "system" && system === "dark");
      document.documentElement.dataset.theme = isDark ? "dark" : "light";
      document.documentElement.dir = "rtl";
    }
  }, [mode, system]);

  const label = mode === "system" ? "מערכת" : mode === "dark" ? "כהה" : "בהיר";

  const nextMode: ThemeMode = mode === "system" ? "dark" : mode === "dark" ? "light" : "system";

  return (
    <Pressable onPress={() => setMode(nextMode)} style={{ padding: 10 }}>
      <Text style={{ textAlign: "right" }}>מצב תצוגה: {label} (הקש להחלפה)</Text>
    </Pressable>
  );
}
