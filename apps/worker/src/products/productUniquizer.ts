import { Product } from "./../types/general.d";
import { SRuokaItem } from "../types/s-kaupat";
import { KRuokaProduct } from "./../types/k-ruoka.d";
import { convertProduct } from "./convertProduct";

export function makeProductsUnique(
  sProduct: SRuokaItem,
  kProduct: KRuokaProduct
) {
  const { sRes, kRes } = convertProduct(kProduct, sProduct)!;

  let uniqueProducts: Product[] = [];

  if (kRes) {
    const is = uniqueProducts.find((n) => n.ean === kRes.ean);
    if (!is) {
      uniqueProducts.push(kRes);
    }
  }

  if (sRes) {
    const is = uniqueProducts.find((n) => n.ean === sRes.ean);
    if (!is) {
      uniqueProducts.push(sRes);
    }
  }

  return uniqueProducts[0];
}
