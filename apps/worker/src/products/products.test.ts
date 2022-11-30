import app from "../";

const testConversion = [
  {
    ean: "6408430000258",
    weight: 1000,
    unit: "ml",
  },
  {
    ean: "5410316965583",
    weight: 275,
    unit: "ml",
  },
  {
    ean: "6410405041548",
    weight: 1000,
    unit: "g",
  },
  {
    ean: "6411402131508",
    weight: 320,
    unit: "g",
  },
  {
    ean: "6410405243607",
    weight: 227,
    unit: "g",
  },
  {
    ean: "6415600566667",
    weight: 500,
    unit: "ml",
  },
  // s-mafia seur
  {
    ean: "6410381090592",
    weight: 325,
    unit: "g",
  },
  {
    ean: "6415712000431",
    weight: 500,
    unit: "g",
  },
  {
    ean: "6415712000011",
    weight: 300,
    unit: "g",
  },
  {
    ean: "7310532131985",
    weight: 16,
    unit: "g",
  },
  {
    ean: "6418654002075",
    weight: 330,
    unit: "ml",
  },
  {
    ean: "6437002001454",
    weight: 660,
    unit: "g",
  },
  {
    ean: "2004268600000",
    weight: 65,
    unit: "g",
  },
  {
    ean: "6411200113317",
    weight: 180,
    unit: "g",
  },
];

describe("Products work", () => {
  it("should work with only pirkka", async () => {
    const res = await app.request("http://localhost/ean/6410405145567");
    expect(res.status).toBe(200);
  });

  it("should work with only rainbow", async () => {
    const res = await app.request("http://localhost/ean/7340011484721");
    expect(res.status).toBe(200);
  });

  it("should NOT work with iso omenan porvariliha", async () => {
    const res = await app.request("http://localhost/ean/2000138800006");
    expect(res.status).toBe(500);
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

  it("should work with pommac 0,5l", async () => {
    const res = await app.request("http://localhost/ean/6413600015048");
    expect(res.status).toBe(200);
  });

  testConversion.forEach((t) => {
    it(`should work with AUTOMATED ${t.ean}`, async () => {
      const res = await app.request(`http://localhost/ean/${t.ean}`);
      const json = await res.json();

      expect(res.status).toBe(200);

      expect(json).toMatchObject({
        weight: {
          weight: t.weight,
          unit: t.unit,
        },
      });
    });
  });
});
