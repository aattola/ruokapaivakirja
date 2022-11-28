import app from "../";

describe("Products work", () => {
  it("Should work with ean", async () => {
    const res = await app.request("http://localhost/ean/6437005041020");
    const json = await res.json();
    expect(res.status).toBe(200);
    expect(json).toEqual({
      nutrition: {
        energyKcal: 267,
        fat: 4.1,
        saturatedFats: 0.5,
        carbohydrates: 45,
        protein: 10,
        salt: 1,
        fiber: 4.8,
      },
      ean: "6437005041020",
      name: "Vaasan Isopaahto monivilja 525g paahtoleipä",
      imageUrl: "https://public.keskofiles.com/f/k-ruoka/product/6437005041020",
      id: "6437005041020-N137-undefined",
      from: "k",
    });
  });

  it("should work with only pirkka", async () => {
    const res = await app.request("http://localhost/ean/6410405145567");
    expect(res.status).toBe(200);
  });

  it("should work with only rainbow", async () => {
    const res = await app.request("http://localhost/ean/7340011484721");
    expect(res.status).toBe(200);
  });

  it("should work with iso omenan porvariliha", async () => {
    const res = await app.request("http://localhost/ean/2000138800006");
    expect(res.status).toBe(200);
  });

  it("should NOT work with pirkka lehti nro 11", async () => {
    const res = await app.request("http://localhost/ean/6410405266378");
    expect(res.status).toBe(500);
  });

  it("should work with kotimaista vichy", async () => {
    const res = await app.request("http://localhost/ean/6415712614287");
    expect(res.status).toBe(200);
  });

  it("should work with kotimaista OK Sipuliteemakkara???", async () => {
    const res = await app.request("http://localhost/ean/6409890050760");
    expect(res.status).toBe(200);
  });
});
