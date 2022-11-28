import { SKaupatSearchResponse } from "../types/s-kaupat";
import { KRuokaSearchResponse } from "../types/k-ruoka";
import { SearchProduct } from "../types/general";

export function makeSearchUnique(
  kres: KRuokaSearchResponse,
  sres: SKaupatSearchResponse
) {
  let uniqueProducts: SearchProduct[] = [];
  console.log(kres);

  kres.data.productAndAssortmentSearchV2.results.forEach((kproduct) => {
    const found = uniqueProducts.find(
      (product) => product.ean === kproduct.ean
    );

    if (!found) {
      uniqueProducts.push({
        ean: kproduct.ean,
        name: kproduct.localizedName.finnish,
        imageUrl: kproduct.imageUrl,
        id: kproduct.id,
        from: "k",
      });
    }
  });

  sres.data.store.products.items.forEach((sproduct) => {
    const found = uniqueProducts.find(
      (product) => product.ean === sproduct.ean
    );

    if (!found) {
      uniqueProducts.push({
        ean: sproduct.ean,
        name: sproduct.name,
        imageUrl: `https://cdn.s-cloud.fi/v1/w256_q75/product/ean/${sproduct.ean}_kuva1.jpg`,
        id: sproduct.id,
        from: "s",
      });
    }
  });

  return uniqueProducts;
}
