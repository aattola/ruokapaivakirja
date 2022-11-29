import {
  Autocomplete,
  AutocompleteItem,
  Text,
  Layout,
  Input,
  Button,
} from "@ui-kitten/components";
import { useEffect, useState } from "react";
import { ScrollView } from "react-native";
import { BarCodeScanner, BarCodeEvent } from "expo-barcode-scanner";
import { useNavigation } from "@react-navigation/native";

enum PermissionStatus {
  GRANTED = "granted",
  UNDETERMINED = "undetermined",
  DENIED = "denied",
}

export function EanScanScreen() {
  const navigator = useNavigation();
  const [hasPermission, setHasPermission] = useState<PermissionStatus>(
    PermissionStatus.UNDETERMINED
  );
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status);
    };

    getBarCodeScannerPermissions();
  }, []);

  const handleBarCodeScanned = ({ type, data }: BarCodeEvent) => {
    if (type === "org.gs1.EAN-13" || type === "org.gs1.EAN-8") {
      // org.gs1.EAN-13 on suomessa EAN standardi. EAN-8 voi olla pienissä tuotteissa
      console.log("EAN koodi", data);
      setScanned(true);

      navigator.goBack();
      navigator.navigate("Product", {
        ean: data,
      });
    }
  };

  if (hasPermission === PermissionStatus.UNDETERMINED) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === PermissionStatus.DENIED) {
    return <Text>No access to camera</Text>;
  }

  return (
    <Layout style={{ flex: 1 }}>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={{ width: "100%", height: 200 }}
      />
      {scanned && (
        <Button onPress={() => setScanned(false)}> Tap to Scan Again</Button>
      )}
    </Layout>
  );
}
