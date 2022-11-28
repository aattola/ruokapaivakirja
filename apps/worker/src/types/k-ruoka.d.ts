export interface KRuokaResponse {
  data: KRuokaGetProductsResponse;
}

export interface KRuokaGetProductsResponse {
  getProducts: KRuokaProduct[];
}

export interface KRuokaProduct {
  id: string;
  ean: string;
  brand: string;
  referenceId: null;
  storeId: string;
  localStoreId: null;
  imageUrl: string;
  productType: string;
  countryOfOrigin: CountryOfOrigin;
  recipeInstructions: CountryOfOrigin;
  storageAndUseInstructions: CountryOfOrigin;
  manufacturedFor: ManufacturedFor;
  categories: Category[];
  description: Description;
  marketingDescription: null;
  localizedName: Name;
  productAvailabilities: ProductAvailability[];
  nutritionalContent: NutritionalContent;
  localizedNutritionalAttributes: LocalizedNutritionalAttribute[] | null;
  nutrientBasisQuantity: NutrientBasisQuantity | null;
  productContents: Description;
  restriction: null;
  cautions: Cautions;
  localizedAllergens: LocalizedAllergens;
  isAvailable: boolean;
  monthlyCheapestPrice: number;
  pricing: Pricing;
}

export interface Category {
  name: Name;
  path: string;
}

export interface Name {
  finnish: string;
  swedish: string;
}

export interface Cautions {
  storageInstructions: any[];
  cautionaryInstructions: any[];
}

export interface CountryOfOrigin {
  fi: null | string;
  sv: null | string;
  en: null | string;
}

export interface Description {
  fi: string;
  sv: string;
}

export interface LocalizedAllergens {
  contains: Contains;
  freeFrom: Contains;
  mayContain: Contains;
}

export interface Contains {
  fi: string[];
  sv: string[];
}

export interface LocalizedNutritionalAttribute {
  attribute: string;
  fi: string;
  sv: string;
}

export interface ManufacturedFor {
  city: null;
  name: null;
  address: null;
  countryFi: null;
  postalCode: null;
}

export interface NutrientBasisQuantity {
  fi: string;
}

export interface NutritionalContent {
  energyKj: number | null;
  energyKcal: number | null;
  carbohydrates: Carbohydrates | null;
  carbohydratesSugar: Carbohydrates | null;
  carbohydratesStarch: null;
  carbohydratesPolyol: null;
  fat: Carbohydrates | null;
  fatSaturated: Carbohydrates | null;
  fatMonoUnsaturated: null;
  fatPolyUnsaturated: null;
  protein: Carbohydrates | null;
  nutritionalFiber: Carbohydrates | null;
  salt: Carbohydrates | null;
  lactose: Carbohydrates | null;
}

export interface Carbohydrates {
  amount: number;
}

export interface Pricing {
  normal: Normal;
  discount: null;
  batch: null;
}

export interface Normal {
  price: number;
  unit: string;
  isApproximate: boolean;
  componentPrice: null;
  unitPrice: UnitPrice;
}

export interface UnitPrice {
  value: number;
  unit: string;
}

export interface ProductAvailability {
  storeId: string;
  web: boolean;
  store: boolean;
}

export interface KRuokaSearchResponse {
  data: SearchData;
}

export interface SearchData {
  productAndAssortmentSearchV2: ProductAndAssortmentSearchV2;
}

export interface ProductAndAssortmentSearchV2 {
  results: Result[];
  queryId: string;
  totalHits: number;
  __typename: string;
}

export interface Result {
  localizedName: LocalizedName;
  localStoreId: null;
  productType: ProductType;
  imageUrl: string;
  restriction: null;
  id: string;
  ean: string;
  storeId: StoreID;
  productAvailabilities: ProductAvailability[];
  __typename: ResultTypename;
  pricing: Pricing;
}

export enum ResultTypename {
  Product = "Product",
}

export interface LocalizedName {
  finnish: string;
  __typename: LocalizedNameTypename;
}

export enum LocalizedNameTypename {
  LocalizedName = "LocalizedName",
}

export interface Pricing {
  normal: Normal;
  discount: Discount | null;
  batch: null;
  __typename: PricingTypename;
}

export enum PricingTypename {
  ProductPricing = "ProductPricing",
}

export interface Discount {
  price: number;
  unit: DiscountUnit;
  isApproximate: boolean;
  unitPrice: UnitPrice;
  startDate: Date;
  endDate: Date;
  discountType: string;
  discountPercentage: number;
  tosRestrictionText: null;
  maxItems: null;
  __typename: string;
}

export enum DiscountUnit {
  Piece = "PIECE",
}

export interface UnitPrice {
  value: number;
  unit: UnitPriceUnit;
  __typename: UnitPriceTypename;
}

export enum UnitPriceTypename {
  UnitPrice = "UnitPrice",
}

export enum UnitPriceUnit {
  Kg = "KG",
}

export interface Normal {
  price: number;
  unit: DiscountUnit;
  isApproximate: boolean;
  componentPrice: null;
  unitPrice: UnitPrice;
  __typename: NormalTypename;
}

export enum NormalTypename {
  ProductPrice = "ProductPrice",
}

export interface ProductAvailability {
  storeId: StoreID;
  web: boolean;
  store: boolean;
  __typename: ProductAvailabilityTypename;
}

export enum ProductAvailabilityTypename {
  Availability = "Availability",
}

export enum StoreID {
  N137 = "N137",
}

export enum ProductType {
  Normal = "NORMAL",
}
