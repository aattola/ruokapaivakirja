import { Hono } from "hono";
import { cache } from "hono/cache";
import {
  getAnyProductByEan,
  getKProductByEan,
  getSProductByEan,
} from "./products/getProduct";
import { searchUnique } from "./search/search";
import { Bindings } from "./types/general";

const app = new Hono<{ Bindings: Bindings }>();
app.get(
  "/*",
  cache({ cacheName: "global-cache", cacheControl: "max-age=21600" }) // 6h cache
);

app.get("/", async (c) => {
  return c.html("Aattola & Co");
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

  try {
    const products = await getAnyProductByEan(ean);
    return c.json(products);
  } catch (err) {
    console.log(err, "Virhe");
    return c.json(
      {
        error: err,
        code: 500,
        turhaviesti:
          "hei tässä tuotteessa ei todennäköisesti ole ravintoarvoja",
      },
      500
    );
  }
});

export default app;
