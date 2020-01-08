import faker from "faker";
import jwt from "jsonwebtoken";
import makeDecodeToken from "./decode-token";

describe("decode-token", () => {
  let secret;
  let decodeToken;

  const options = { expiresIn: "1m" };

  beforeEach(() => {
    secret = faker.random.uuid();
    decodeToken = makeDecodeToken({ secret });
  });

  it("decodes the token and returns the payload", async () => {
    const payload = {
      prop1: "my-prop1",
      prop2: 6,
    };
    const token = jwt.sign(payload, secret, options);

    const decoded = decodeToken({ token });
    expect(decoded).toMatchObject(payload);
  });
  it("throws an error if token is not valid", async () => {
    expect(() => decodeToken({ token: "not a token!" })).toThrow(Error);
  });
});
