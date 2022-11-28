import app from "../";

describe("Test the search", () => {
  it("search leipä should work", async () => {
    const res = await app.request("http://localhost/search/leipä");
    expect(res.status).toBe(200);
  });

  it("search åäplplå¨'¨'¨ should work", async () => {
    const res = await app.request("http://localhost/search/åäplplå¨'¨'¨");
    expect(res.status).toBe(200);
  });
});
