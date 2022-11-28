import { registerRootComponent } from "expo";
import * as React from "react";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { MainScreen } from "./views/main/Main";
import { SearchScreen } from "./views/search/Search";

function DetailsScreen() {
  return (
    <View style={styles.container}>
      <Text>Deets</Text>
    </View>
  );
}

type RootStackParamList = {
  Koti: undefined;
  Deets: undefined;
  Search: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();
const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Koti" component={MainScreen} />
          <Stack.Screen name="Deets" component={DetailsScreen} />
          <Stack.Screen name="Search" component={SearchScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </QueryClientProvider>
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

registerRootComponent(App);
