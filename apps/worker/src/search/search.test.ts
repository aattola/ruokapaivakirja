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

  it("should work with pommac 0,5l", async () => {
    const res = await app.request("http://localhost/search/6413600015048");
    expect(res.status).toBe(200);
  });
});
