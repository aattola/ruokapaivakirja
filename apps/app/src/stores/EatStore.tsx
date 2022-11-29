import { Nutrition } from "worker/src/types/general";
import create from "zustand";

export interface ProductAte {
  ean: string;
  name: string;
  imageUrl: string;
  amount: number;
  date: Date;
  nutrition: Nutrition;
}

interface EatStoreState {
  productsAte: ProductAte[];
}

const useEatStore = create<EatStoreState>()((set) => ({
  productsAte: [],
}));

export { useEatStore };
