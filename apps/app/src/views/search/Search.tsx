import { useNavigation } from "@react-navigation/native";
import { useQuery } from "@tanstack/react-query";
import * as React from "react";
import {
  Button,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { fetchSearch } from "./queries";

export function SearchScreen() {
  const navigation = useNavigation();
  const [search, setSearch] = React.useState("");
  const searchQuery = useQuery(["search", search], () => fetchSearch(search));
  console.log(searchQuery.data);
  function onChange(text: string) {
    setSearch(text);
  }

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text>Hakunäyttö</Text>

        <TextInput
          style={styles.input}
          value={search}
          onChangeText={onChange}
        />

        {searchQuery.isSuccess && (
          <View>
            {searchQuery.data.map((item) => (
              <View key={item.id}>
                <Text>{item.name}</Text>
                <Text>{item.ean}</Text>
              </View>
            ))}
          </View>
        )}
      </View>
    </ScrollView>
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
