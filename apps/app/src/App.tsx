import { registerRootComponent } from "expo";
import { StatusBar } from "expo-status-bar";
import * as React from "react";
import * as eva from "@eva-design/eva";
import { ApplicationProvider, Text } from "@ui-kitten/components";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { MainScreen } from "./views/main/Main";
import { SearchScreen } from "./views/search/Search";
import { EanScanScreen } from "./views/eanscan/Scan";
import { ProductViewScreen } from "./views/product/Product";
import { useAppStore } from "./stores/AppStore";

export type RootStackParamList = {
  Koti: undefined;
  Deets: undefined;
  Search: undefined;
  EanScan: undefined;
  Product: { ean: string };
};

const Stack = createNativeStackNavigator<RootStackParamList>();
const queryClient = new QueryClient();

function App() {
  const theme = useAppStore((state) => state.theme);

  return (
    <ApplicationProvider
      {...eva}
      theme={theme === "light" ? eva.light : eva.dark}
    >
      <QueryClientProvider client={queryClient}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Group>
              <Stack.Screen
                name="Koti"
                component={MainScreen}
                options={{ title: "Koti" }}
              />
              <Stack.Screen
                name="Search"
                component={SearchScreen}
                options={{ title: "Haku" }}
              />
              <Stack.Screen
                name="Product"
                component={ProductViewScreen}
                options={{ title: "Tuote" }}
              />
            </Stack.Group>

            <Stack.Group
              screenOptions={{ presentation: "modal", headerShown: false }}
            >
              <Stack.Screen name="EanScan" component={EanScanScreen} />
            </Stack.Group>
          </Stack.Navigator>
        </NavigationContainer>
      </QueryClientProvider>

      <StatusBar style="auto" />
    </ApplicationProvider>
  );
}

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

registerRootComponent(App);
