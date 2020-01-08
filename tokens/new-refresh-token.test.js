import faker from "faker";
import makeNewRefreshToken from "./new-refresh-token";


describe("jwt -> refreshToken", () => {
  let id;
  let email;
  let decodeToken;
  let decodedPayload;
  let signedToken;
  let signToken;
  let newRefreshToken;

  beforeEach(() => {
    id = faker.random.uuid();
    email = faker.internet.email();
    decodedPayload = { id, email };
    decodeToken = jest.fn();
    decodeToken.mockReturnValueOnce(decodedPayload);

    signedToken = faker.random.uuid();
    signToken = jest.fn();
    signToken.mockReturnValueOnce(signedToken);

    newRefreshToken = makeNewRefreshToken({
      decodeToken,
      signToken,
    });
  });

  it("creates a valid refresh token", async () => {
    const token = newRefreshToken({ token: faker.random.uuid() });

    expect(decodeToken).toHaveBeenCalledTimes(1);
    expect(signToken).toHaveBeenCalledTimes(1);
    expect(signToken).toBeCalledWith({ payload: { id, email } });
    expect(token).toBe(signedToken);
  });
  it("throws an error if the token is missing", async () => {
    const decodeToken2 = jest.fn();
    decodeToken2.mockImplementation(() => {
      throw new Error("jwt must be provided");
    });
    const newRefreshToken2 = makeNewRefreshToken({
      decodeToken: decodeToken2,
      signToken,
    });
    expect(newRefreshToken2).toThrowError(new Error("jwt must be provided"));
  });
  it("throws an error if the token payload is invalid", async () => {
    const decodeToken2 = jest.fn();
    decodeToken2.mockReturnValueOnce({
      id: faker.random.uuid(),
    });
    const newRefreshToken2 = makeNewRefreshToken({
      decodeToken: decodeToken2,
      signToken,
    });
    expect(newRefreshToken2).toThrowError(new Error("Bad token!"));
  });
});
