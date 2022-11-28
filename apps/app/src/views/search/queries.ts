import { QueryFunction } from "@tanstack/react-query";
import { SearchProduct } from "worker/src/types/general";

export async function fetchSearch(query: string) {
  const resp = await fetch(`https://kirja.jeffe.co/search/${query}`);
  return resp.json() as Promise<SearchProduct[]>;
}
