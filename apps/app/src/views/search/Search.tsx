/* eslint-disable jsx-a11y/alt-text */
import { useNavigation } from "@react-navigation/native";
import { useQuery } from "@tanstack/react-query";
import {
  Autocomplete,
  AutocompleteItem,
  Text,
  Layout,
  Input,
} from "@ui-kitten/components";
import * as React from "react";
import { ScrollView, StyleSheet, Image, View } from "react-native";
import { SearchProduct } from "worker/src/types/general";
import { fetchSearch } from "./queries";
import { useDebounce } from "./useDebounce";

export function SearchScreen() {
  const navigation = useNavigation();
  const [search, setSearch] = React.useState("");
  const debouncedSearch = useDebounce(search, 500);

  const searchQuery = useQuery(
    ["search", debouncedSearch],
    () => fetchSearch(debouncedSearch),
    {
      enabled: debouncedSearch.length > 0,
      keepPreviousData: true,
      staleTime: 5 * 60 * 1000,
    }
  );

  const onChangeText = (query: string) => {
    setSearch(query);
  };

  return (
    <Layout style={{ flex: 1 }}>
      <ScrollView>
        <View style={{ padding: 15 }}>
          <Input
            autoFocus={true}
            placeholder="Hae tästä"
            value={search}
            onChangeText={onChangeText}
          />
        </View>

        <View style={{ paddingBottom: 15 }}>
          {searchQuery.isSuccess &&
            searchQuery.data.map((item) => (
              <AutocompleteItem
                onPress={() =>
                  navigation.navigate("Product", { ean: item.ean })
                }
                key={item.ean}
                title={item.name}
                accessoryLeft={() => (
                  <Image
                    style={{ width: 50, height: 50, resizeMode: "contain" }}
                    source={{ uri: item.imageUrl, cache: "only-if-cached" }}
                  />
                )}
              />
            ))}
        </View>
      </ScrollView>
    </Layout>
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
