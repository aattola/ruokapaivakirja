import { Hono } from "hono";
import { getKProductByEan, getSProductByEan } from "./products/getProduct";
import { searchUnique } from "./search/search";
import { searchKKauppa, searchSKauppa } from "./search/searchProduct";
import { Bindings } from "./types/general";

const app = new Hono<{ Bindings: Bindings }>();
// app.get(
//   "/peli/*",
//   cache({ cacheName: "peli-cache", cacheControl: "max-age=900" }) // 15min cache
// );

app.get("/", async (c) => {
  return c.html("moikka moi turbo");
});

app.get("/search/:query", async (c) => {
  const query = c.req.param("query");
  const res = await searchUnique(query);

  return c.json(res);
});

app.get("/ean/:ean/:from?", async (c) => {
  const ean = c.req.param("ean");
  const from = c.req.param("from?");

  if (from === "k") {
    const kproducts = getKProductByEan(ean);
    return c.json(kproducts);
  }

  if (from === "s") {
    const sproducts = getSProductByEan(ean);
    return c.json(sproducts);
  }

  const kproducts = getKProductByEan(ean);
  const products = getSProductByEan(ean);

  const promises = await Promise.all([kproducts, products]).catch((err) =>
    console.log(err)
  );

  return c.json(promises);
});

export default {
  fetch: app.fetch,
};
