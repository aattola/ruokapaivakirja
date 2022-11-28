import { useNavigation } from "@react-navigation/native";
import * as React from "react";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";

export function MainScreen() {
  const navigation = useNavigation();
  const [text, setText] = React.useState("");

  function onChange(text: string) {
    setText(text);
  }

  return (
    <View style={styles.container}>
      <Text>Main screeni</Text>

      <TextInput style={styles.input} value={text} onChangeText={onChange} />

      <Button
        title="moroo"
        onPress={() => navigation.navigate("Search")}
      ></Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});
