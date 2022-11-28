import app from ".";

describe("Test the application", () => {
  it("Should return 200 response", async () => {
    const res = await app.request("http://localhost/");
    expect(res.status).toBe(200);
  });

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

  it("search should work", async () => {
    const res = await app.request("http://localhost/search/leipä");
    expect(res.status).toBe(200);
  });
});
