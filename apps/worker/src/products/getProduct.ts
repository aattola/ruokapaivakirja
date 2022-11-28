import { sKaupatHeaders } from "../s-kaupat";
import { KRuokaGetProductsResponse } from "../types/k-ruoka";
import { SKaupatResponse } from "../types/s-kaupat";
import { makeProductsUnique } from "./productUniquizer";

export async function getAnyProductByEan(ean: string) {
  const kproducts = getKProductByEan(ean);
  const products = getSProductByEan(ean);
  const promises = await Promise.all([kproducts, products]);

  return makeProductsUnique(
    promises[1].data.product,
    promises[0].data.getProducts[0]
  );
}

export async function getSProductByEan(ean: string) {
  const headers = sKaupatHeaders;

  const body = JSON.stringify({
    operationName: "GetProductInfoById",
    variables: {
      storeId: "517609418",
      id: ean,
      includeAgeLimitedByAlcohol: true,
    },
    query:
      "query GetProductInfoById($id: ID!, $storeId: ID!, $includeAgeLimitedByAlcohol: Boolean) {\n  product(\n    id: $id\n    storeId: $storeId\n    includeAgeLimitedByAlcohol: $includeAgeLimitedByAlcohol\n  ) {\n    id\n    ean\n    name\n    brandName\n    price\n    description\n    ingredientStatement\n    nutrients {\n      name\n      ri\n      value\n      __typename\n    }\n    depositPrice\n    basicQuantityUnit\n    consumerPackageSize\n    consumerPackageUnit\n    priceUnit\n    quantityMultiplier\n    comparisonUnit\n    comparisonPrice\n    approxPrice\n    frozen\n    nutrientClaims {\n      nutritionalClaimElement\n      nutritionalClaimType\n      __typename\n    }\n    hierarchyPath {\n      name\n      id\n      slug\n      __typename\n    }\n    supplierName\n    countryName {\n      fi\n      __typename\n    }\n    allergens {\n      allergenTypeCode\n      levelOfContainmentCode\n      __typename\n    }\n    productType\n    isAgeLimitedByAlcohol\n    location {\n      ...ProductStoreLocation\n      __typename\n    }\n    isGlobalFallback\n    ...ProductLocalizedFields\n    __typename\n  }\n}\n\nfragment ProductStoreLocation on ProductLocation {\n  aisle\n  floor\n  __typename\n}\n\nfragment ProductLocalizedFields on Product {\n  localized {\n    fi {\n      name\n      description\n      ingredientStatement\n      allergens {\n        allergenTypeCode\n        allergenTypeText\n        levelOfContainmentCode\n        __typename\n      }\n      __typename\n    }\n    en {\n      name\n      description\n      ingredientStatement\n      allergens {\n        allergenTypeCode\n        allergenTypeText\n        levelOfContainmentCode\n        __typename\n      }\n      __typename\n    }\n    __typename\n  }\n  __typename\n}\n",
  });

  const requestOptions = {
    method: "POST",
    headers: headers,
    body,
  };

  const resp = await fetch("https://cfapi.voikukka.fi/graphql", requestOptions);
  if (!resp.ok) throw resp;
  return resp.json() as Promise<SKaupatResponse>;
}

export async function getKProductByEan(ean: string) {
  const body = JSON.stringify({
    operationName: "getProducts",
    variables: {
      eans: [ean],
      storeId: "N137",
    },
    query:
      "query getProducts($eans: [String!]!, $storeId: String!, $deliveryStart: String) {\n  getProducts(eans: $eans, storeId: $storeId, deliveryStart: $deliveryStart) {\n    ...ProductResponse\n  }\n}\n    fragment ProductResponse on Product {\n  id\n  ean\n  brand\n  referenceId\n  storeId\n  localStoreId\n  imageUrl\n  productType\n  countryOfOrigin {\n    fi\n    sv\n    en\n  }\n  recipeInstructions {\n    fi\n    sv\n    en\n  }\n  storageAndUseInstructions {\n    fi\n    sv\n    en\n  }\n  manufacturedFor {\n    city\n    name\n    address\n    countryFi\n    postalCode\n  }\n  categories {\n    name {\n      finnish\n      swedish\n    }\n    path\n  }\n  description {\n    fi\n    sv\n  }\n  marketingDescription {\n    fi\n    sv\n  }\n  localizedName {\n    finnish\n    swedish\n  }\n  productAvailabilities {\n    storeId\n    web\n    store\n  }\n  nutritionalContent {\n    energyKj\n    energyKcal\n    carbohydrates {\n      amount\n    }\n    carbohydratesSugar {\n      amount\n    }\n    carbohydratesStarch {\n      amount\n    }\n    carbohydratesPolyol {\n      amount\n    }\n    fat {\n      amount\n    }\n    fatSaturated {\n      amount\n    }\n    fatMonoUnsaturated {\n      amount\n    }\n    fatPolyUnsaturated {\n      amount\n    }\n    protein {\n      amount\n    }\n    nutritionalFiber {\n      amount\n    }\n    salt {\n      amount\n    }\n    lactose {\n      amount\n    }\n  }\n  localizedNutritionalAttributes {\n    attribute\n    fi\n    sv\n  }\n  nutrientBasisQuantity {\n    fi\n  }\n  productContents {\n    fi\n    sv\n  }\n  restriction {\n    type\n    i18n {\n      fi\n      sv\n    }\n  }\n  cautions {\n    storageInstructions {\n      code\n      instruction {\n        fi\n        sv\n      }\n    }\n    cautionaryInstructions {\n      code\n      instruction {\n        fi\n        sv\n      }\n    }\n  }\n  localizedAllergens {\n    contains {\n      fi\n      sv\n    }\n    freeFrom {\n      fi\n      sv\n    }\n    mayContain {\n      fi\n      sv\n    }\n  }\n  isAvailable\n  monthlyCheapestPrice\n  ...Pricing\n}\n   fragment Pricing on Product {\n  pricing {\n    normal {\n      price\n      unit\n      isApproximate\n      componentPrice\n      unitPrice {\n        value\n        unit\n      }\n    }\n    discount {\n      price\n      unit\n      isApproximate\n      unitPrice {\n        value\n        unit\n      }\n      startDate\n      endDate\n      discountType\n      discountPercentage\n      tosRestrictionText {\n        finnish\n        swedish\n      }\n      maxItems\n    }\n    batch {\n      price\n      unit\n      isApproximate\n      unitPrice {\n        value\n        unit\n      }\n      startDate\n      endDate\n      discountType\n      discountPercentage\n      amount\n      maxItems\n    }\n  }\n}\n   ",
  });

  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "User-Agent": "K-Ruoka/1.0.0 (iPhone; iOS 14.4.2; Scale/3.00)",
    },
    body,
  };

  const resp = await fetch("https://mobile.k-ruoka.fi/graphql", requestOptions);
  if (!resp.ok) throw resp;
  return resp.json() as Promise<{
    data: KRuokaGetProductsResponse;
  }>;
}
