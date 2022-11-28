export interface SKaupatResponse {
  data: Data;
}

export interface Data {
  product: SKaupatProduct;
}

export interface SKaupatProduct {
  id: string;
  ean: string;
  name: string;
  brandName: string;
  price: number;
  description: string;
  ingredientStatement: string;
  nutrients: Nutrient[];
  depositPrice: number;
  basicQuantityUnit: string;
  consumerPackageSize: null;
  consumerPackageUnit: null;
  priceUnit: string;
  quantityMultiplier: number;
  comparisonUnit: string;
  comparisonPrice: number;
  approxPrice: boolean;
  frozen: boolean;
  nutrientClaims: null;
  hierarchyPath: HierarchyPath[];
  supplierName: string;
  countryName: CountryName;
  allergens: Allergen[];
  productType: string;
  isAgeLimitedByAlcohol: boolean;
  location: Location;
  isGlobalFallback: null;
  localized: Localized;
  __typename: string;
}

export interface Allergen {
  allergenTypeCode: string;
  levelOfContainmentCode: LevelOfContainmentCode;
  __typename: Typename;
}

export enum Typename {
  Allergen = "Allergen",
}

export enum LevelOfContainmentCode {
  FreeFrom = "FREE_FROM",
}

export interface CountryName {
  fi: string;
  __typename: string;
}

export interface HierarchyPath {
  name: string;
  id: string;
  slug: string;
  __typename: string;
}

export interface Localized {
  fi: En;
  en: En;
  __typename: string;
}

export interface En {
  name: string;
  description: string;
  ingredientStatement: string;
  allergens: any[];
  __typename: string;
}

export interface Location {
  aisle: string;
  floor: number;
  __typename: string;
}

export interface Nutrient {
  name: string;
  ri: string;
  value: string;
  __typename: string;
}

export interface SKaupatSearchResponse {
  data: Data;
}

export interface Data {
  store: Store;
}

export interface Store {
  id: string;
  products: Products;
  __typename: string;
}

export interface Products {
  total: number;
  from: null;
  limit: number;
  items: Item[];
  structuredFacets: StructuredFacet[];
  __typename: string;
}

export interface Item {
  id: string;
  ean: string;
  name: string;
  brandName: string;
  price: number;
  basicQuantityUnit: Unit;
  consumerPackageSize: null;
  consumerPackageUnit: null;
  priceUnit: Unit;
  quantityMultiplier: number;
  comparisonUnit: ComparisonUnit;
  comparisonPrice: number;
  approxPrice: boolean;
  frozen: boolean;
  nutrientClaims: null;
  hierarchyPath: HierarchyPath[];
  productType: ProductType;
  isAgeLimitedByAlcohol: boolean;
  isGlobalFallback: null;
  localized: Localized;
  __typename: ItemTypename;
}

export enum ItemTypename {
  Product = "Product",
}

export enum Unit {
  Kpl = "KPL",
}

export enum ComparisonUnit {
  Kgm = "KGM",
  LTR = "LTR",
}

export interface HierarchyPath {
  name: Name;
  id: ID;
  slug: Slug;
  __typename: HierarchyPathTypename;
}

export enum HierarchyPathTypename {
  HierarchyPathItem = "HierarchyPathItem",
}

export enum ID {
  Herkku00000012 = "Herkku_00000012",
  Herkku00000094 = "Herkku_00000094",
  Herkku00000101 = "Herkku_00000101",
  Herkku00000533 = "Herkku_00000533",
  Herkku00000534 = "Herkku_00000534",
}

export enum Name {
  KissanKosteaRuoka = "Kissan kostea ruoka",
  KissanMakupalat = "Kissan makupalat",
  Kissanhiekka = "Kissanhiekka",
  Kissanruoat = "Kissanruoat",
  Lemmikit = "Lemmikit",
}

export enum Slug {
  Lemmikit1 = "lemmikit-1",
  Lemmikit1Kissanhiekka = "lemmikit-1/kissanhiekka",
  Lemmikit1Kissanruoat = "lemmikit-1/kissanruoat",
  Lemmikit1KissanruoatKissanKosteaRuoka = "lemmikit-1/kissanruoat/kissan-kostea-ruoka",
  Lemmikit1KissanruoatKissanMakupalat = "lemmikit-1/kissanruoat/kissan-makupalat",
}

export interface Localized {
  fi: En;
  en: En;
  __typename: LocalizedTypename;
}

export enum LocalizedTypename {
  LocalizedProductInfo = "LocalizedProductInfo",
}

export interface En {
  name: string;
  description: string;
  ingredientStatement: string;
  allergens: any[];
  __typename: EnTypename;
}

export enum EnTypename {
  LocalizedProductInfoFields = "LocalizedProductInfoFields",
}

export enum ProductType {
  Product = "PRODUCT",
}

export interface StructuredFacet {
  key: string;
  stringValue: string[];
  __typename: string;
}
