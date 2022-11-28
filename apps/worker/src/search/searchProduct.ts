import { sKaupatHeaders } from "../s-kaupat";
import { KRuokaSearchResponse } from "../types/k-ruoka";
import { SKaupatSearchResponse } from "../types/s-kaupat";

export async function searchSKauppa(query: string) {
  const body = JSON.stringify({
    operationName: "GetFilteredProducts",
    variables: {
      queryString: query,
      id: "517609418",
      from: 0,
      limit: 10,
      slug: "",
      hierarchyId: "",
      includeAgeLimitedByAlcohol: true,
      structuredFacets: [
        {
          key: "brandName",
          order: "asc",
        },
        {
          key: "labels",
        },
      ],
    },
    query:
      "query GetFilteredProducts($queryString: String, $slug: String, $hierarchyId: String, $id: ID!, $limit: Int, $from: Int, $orderBy: SortKey, $order: SortOrder, $includeAgeLimitedByAlcohol: Boolean, $structuredFacets: [StructuredFacetInput!], $filters: [Filters!], $generatedSessionId: String, $useRandomId: Boolean, $searchProvider: SearchProvider) { store(id: $id) { id products( queryString: $queryString slug: $slug hierarchyId: $hierarchyId includeAgeLimitedByAlcohol: $includeAgeLimitedByAlcohol limit: $limit from: $from orderBy: $orderBy order: $order structuredFacets: $structuredFacets filters: $filters generatedSessionId: $generatedSessionId useRandomId: $useRandomId searchProvider: $searchProvider ) { total from limit items { id ean name brandName price basicQuantityUnit consumerPackageSize consumerPackageUnit priceUnit quantityMultiplier comparisonUnit comparisonPrice approxPrice frozen nutrientClaims { nutritionalClaimElement nutritionalClaimType __typename } hierarchyPath { name id slug __typename } productType isAgeLimitedByAlcohol isGlobalFallback ...ProductLocalizedFields __typename } structuredFacets { ... on StringFacet { key stringValue __typename } ... on ObjectFacet { key objectValue { name value doc_count __typename } __typename } __typename } __typename } __typename } } fragment ProductLocalizedFields on Product { localized { fi { name description ingredientStatement allergens { allergenTypeCode allergenTypeText levelOfContainmentCode __typename } __typename } en { name description ingredientStatement allergens { allergenTypeCode allergenTypeText levelOfContainmentCode __typename } __typename } __typename } __typename }",
  });

  const requestOptions = {
    method: "POST",
    headers: sKaupatHeaders,
    body,
  };

  const resp = await fetch("https://cfapi.voikukka.fi/graphql", requestOptions);
  if (!resp.ok) throw resp;
  return resp.json() as Promise<SKaupatSearchResponse>;
}

export async function searchKKauppa(query: string) {
  const body = JSON.stringify({
    operationName: "productAndAssortmentSearchV2",
    variables: {
      query: query,
      storeId: "N137",
      limit: 20,
      offset: 0,
    },
    query:
      "query productAndAssortmentSearchV2($query: String!, $storeId: String!, $limit: Float!, $offset: Float!, $categoryPath: String, $deliveryStart: String) {\n  productAndAssortmentSearchV2(\n    query: $query\n    storeId: $storeId\n    limit: $limit\n    offset: $offset\n    categoryPath: $categoryPath\n    deliveryStart: $deliveryStart\n  ) {\n    results {\n      ... on Product {\n        ...ProductSearch\n        __typename\n      }\n      ... on AssortmentSearchResult {\n        ...AssortmentSearch\n        __typename\n      }\n      __typename\n    }\n    queryId\n    totalHits\n    __typename\n  }\n}\n\nfragment ProductSearch on Product {\n  localizedName {\n    finnish\n    __typename\n  }\n  localStoreId\n  productType\n  imageUrl\n  restriction {\n    type\n    i18n {\n      fi\n      sv\n      __typename\n    }\n    __typename\n  }\n  ...ProductDeliveryRestrictions\n  ...Pricing\n  __typename\n}\n\nfragment ProductDeliveryRestrictions on Product {\n  id\n  ean\n  storeId\n  productType\n  productAvailabilities {\n    storeId\n    web\n    store\n    __typename\n  }\n  __typename\n}\n\nfragment Pricing on Product {\n  pricing {\n    normal {\n      price\n      unit\n      isApproximate\n      componentPrice\n      unitPrice {\n        value\n        unit\n        __typename\n      }\n      __typename\n    }\n    discount {\n      price\n      unit\n      isApproximate\n      unitPrice {\n        value\n        unit\n        __typename\n      }\n      startDate\n      endDate\n      discountType\n      discountPercentage\n      tosRestrictionText {\n        finnish\n        swedish\n        __typename\n      }\n      maxItems\n      __typename\n    }\n    batch {\n      price\n      unit\n      isApproximate\n      unitPrice {\n        value\n        unit\n        __typename\n      }\n      startDate\n      endDate\n      discountType\n      discountPercentage\n      amount\n      maxItems\n      __typename\n    }\n    __typename\n  }\n  __typename\n}\n\nfragment AssortmentSearch on AssortmentSearchResult {\n  id\n  eans\n  localizedName {\n    finnish\n    __typename\n  }\n  productType\n  imageUrl\n  restriction {\n    type\n    i18n {\n      fi\n      sv\n      __typename\n    }\n    __typename\n  }\n  ...AssortmentPricing\n  __typename\n}\n\nfragment AssortmentPricing on AssortmentSearchResult {\n  pricing {\n    normal {\n      price\n      unit\n      isApproximate\n      componentPrice\n      unitPrice {\n        value\n        unit\n        __typename\n      }\n      __typename\n    }\n    discount {\n      price\n      unit\n      isApproximate\n      unitPrice {\n        value\n        unit\n        __typename\n      }\n      startDate\n      endDate\n      discountType\n      discountPercentage\n      maxItems\n      __typename\n    }\n    batch {\n      price\n      unit\n      isApproximate\n      unitPrice {\n        value\n        unit\n        __typename\n      }\n      startDate\n      endDate\n      discountType\n      discountPercentage\n      amount\n      maxItems\n      __typename\n    }\n    __typename\n  }\n  __typename\n}\n",
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
  return resp.json() as Promise<KRuokaSearchResponse>;
}
