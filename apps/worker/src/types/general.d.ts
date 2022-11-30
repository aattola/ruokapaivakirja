export type Bindings = {
  data: KVNamespace;
  ABLY_KEY: string;
  LOGTAIL: string;
};

interface Nutrition {
  energyKcal: number;
  fat?: number;
  saturatedFats?: number;
  carbohydrates?: number;
  protein?: number;
  salt?: number;
  fiber?: number;
}

export interface SearchProduct {
  ean: string;
  name: string;
  imageUrl: string;
  id: string;
  from: "k" | "s";
}

export interface Weight {
  weight: number;
  unit: string;
  error: boolean;
}
export interface Product extends SearchProduct {
  nutrition: Nutrition;
  weight: Weight;
}
