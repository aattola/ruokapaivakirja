import { useRoute } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useQuery } from "@tanstack/react-query";
import {
  Text,
  Layout,
  Card,
  List,
  Divider,
  ListItem,
} from "@ui-kitten/components";
import * as React from "react";
import { ScrollView, Image, View } from "react-native";
import styled from "styled-components/native";
import { RootStackParamList } from "../../App";
import { fetchProductByEan } from "./queries";

type Props = NativeStackScreenProps<RootStackParamList, "Product">;

const InfoContainer = styled(View)`
  padding: 10px;
`;

const Container = styled(View)`
  margin: 0px 10px;
`;

const NutritionText = styled(Text)``;

const Header = (props: any) => (
  <View {...props}>
    <Text category="h6">Ravintosisältö</Text>
    <Text category="s1">100g / 100ml</Text>
  </View>
);

export function ProductViewScreen() {
  const route = useRoute<Props["route"]>();
  const ean = route.params.ean;
  const productQuery = useQuery(["productByEan", ean], () =>
    fetchProductByEan(ean)
  );

  console.log(route.params, "Product params");

  if (productQuery.isLoading) {
    return <Text>Ladataan ean {ean}...</Text>;
  }

  if (productQuery.isError) {
    return <Text>Tuotetta ei löytynyt</Text>;
  }

  if (!productQuery.isSuccess) {
    return <Text>Ei löytynyt ean {ean}</Text>;
  }

  const data = productQuery.data;

  console.log("Data", data);

  return (
    <Layout style={{ flex: 1 }}>
      <ScrollView>
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Image
            accessibilityLabel="kuva"
            style={{
              width: 300,
              height: 300,
              resizeMode: "contain",
              borderRadius: 24,
              shadowColor: "#000",
              shadowOffset: {
                width: 0,
                height: 3,
              },
              shadowOpacity: 0.27,
              shadowRadius: 4.65,
            }}
            source={{ uri: data.imageUrl, cache: "only-if-cached" }}
          />
        </View>

        <Container>
          <InfoContainer>
            <Text category="h4">{data.name}</Text>
            <Text category="p1">{data.ean}</Text>
          </InfoContainer>

          <Card
            style={{ flex: 1, margin: 0, marginVertical: 10, marginBottom: 20 }}
            header={Header}
          >
            <ListItem
              title="Energiaa"
              description={`${data.nutrition.energyKcal} kcal`}
            />
            <ListItem title="Rasvaa" description={`${data.nutrition.fat} g`} />

            <ListItem
              title="Rasvaa, josta tyydyttynyttä"
              description={`${data.nutrition.saturatedFats} g`}
            />

            <ListItem
              title="Hiilihydraatit"
              description={`${data.nutrition.carbohydrates} g`}
            />

            <ListItem
              title="Proteiini"
              description={`${data.nutrition.protein} g`}
            />

            <ListItem
              title="Suola"
              description={`${data.nutrition.protein} g`}
            />
          </Card>
        </Container>
      </ScrollView>
    </Layout>
  );
}
