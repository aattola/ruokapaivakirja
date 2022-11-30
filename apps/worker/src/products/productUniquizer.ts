import { Product } from "./../types/general.d";
import { SKaupatProduct } from "../types/s-kaupat";
import { KRuokaProduct } from "./../types/k-ruoka.d";
import { convertProduct } from "./convertProduct";

export function makeProductsUnique({
  sProduct,
  kProduct,
}: {
  sProduct?: SKaupatProduct;
  kProduct?: KRuokaProduct;
}) {
  const convertedSProduct = convertProduct(sProduct, "skaupat");
  const convertedKProduct = convertProduct(kProduct, "kruoka");

  let uniqueProducts: Product[] = [];

  if (convertedKProduct) {
    const is = uniqueProducts.find((n) => n.ean === convertedKProduct.ean);
    if (!is) {
      uniqueProducts.push(convertedKProduct);
    }
  }

  if (convertedSProduct) {
    const is = uniqueProducts.find((n) => n.ean === convertedSProduct.ean);
    if (!is) {
      uniqueProducts.push(convertedSProduct);
    }
  }

  if (uniqueProducts.length === 0)
    throw { error: "nothing found", status: 404 };

  return uniqueProducts[0];
}
