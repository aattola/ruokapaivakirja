import { Product } from "worker/src/types/general";

export async function fetchProductByEan(ean: string) {
  const resp = await fetch(`https://kirja.jeffe.co/ean/${ean}`);
  if (resp.status !== 200) throw resp;
  if (!resp.ok) throw resp;
  return resp.json() as Promise<Product>;
}
