import extractToken from "./extract-token";

describe("extract-token", () => {
  describe("when the token is in a header", () => {
    it("extracts and returns the token from the x-access-token header", async () => {
      const req = {
        headers: {
          "x-access-token": "good-token",
        },
      };
      expect(extractToken({ req })).toBe("good-token");
    });
    it("extracts and returns the token from the bearer-auth header", async () => {
      const req = {
        headers: {
          authorization: "Bearer good-token",
        },
      };
      expect(extractToken({ req })).toBe("good-token");
    });
    it("prioritizes x-access-token over authorization", async () => {
      const req = {
        headers: {
          authorization: "Bearer bad-token",
          "x-access-token": "good-token",
        },
      };
      expect(extractToken({ req })).toBe("good-token");
    });
    it("does not look for the cookie by default", async () => {
      const req = { cookies: { token: "good-token" } };
      expect(extractToken({ req })).toBeNull();
    });
  });
  describe("when the token is in a cookie", () => {
    it("extracts and returns the token from the cookie", async () => {
      const req = { cookies: { token: "good-token" } };
      expect(extractToken({ req, checkCookie: true })).toBe("good-token");
    });
  });
});
