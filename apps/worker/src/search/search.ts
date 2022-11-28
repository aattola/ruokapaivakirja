import { makeSearchUnique } from "../products/searchUniquizer";
import { searchKKauppa, searchSKauppa } from "./searchProduct";

export async function searchUnique(query: string) {
  const kres = await searchKKauppa(query);
  const sres = await searchSKauppa(query);

  const res = await Promise.all([kres, sres]);

  return makeSearchUnique(res[0], res[1]);
}
