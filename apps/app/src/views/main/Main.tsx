import { useNavigation } from "@react-navigation/native";
import * as React from "react";
import { Layout, Text, Button, Input } from "@ui-kitten/components";
import { useAppStore } from "../../stores/AppStore";

export function MainScreen() {
  const navigation = useNavigation();
  const toggleTheme = useAppStore((state) => state.toggleTheme);
  const [text, setText] = React.useState("");

  function onChange(text: string) {
    setText(text);
  }

  return (
    <Layout style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Main view</Text>

      <Input placeholder="Hae" value={text} onChangeText={onChange} />

      <Button appearance="outline" onPress={toggleTheme}>
        Toggle teema
      </Button>

      <Button onPress={() => navigation.navigate("Search")}>Haku</Button>
      <Button onPress={() => navigation.navigate("EanScan")}>Scan</Button>

      <Text category="h1">HOME</Text>
    </Layout>
  );
}
