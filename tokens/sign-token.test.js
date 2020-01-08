import faker from "faker";
import jwt from "jsonwebtoken";
import makeSignToken from "./sign-token";

const thisSecond = ({ now = Date.now() } = {}) => Math.floor(now / 1000);

describe("sign-token", () => {
  let secret;
  let payload;

  beforeEach(() => {
    secret = faker.random.uuid();
    payload = {
      user: faker.random.uuid(),
      email: faker.internet.email(),
    };
  });

  it("returns a valid signed token", async () => {
    const signToken = makeSignToken({ secret, expiresIn: "10m" });
    const token = signToken({ payload });
    const { user, email, iat, exp } = jwt.verify(token, secret);
    expect(user).toBe(payload.user);
    expect(email).toBe(payload.email);
    expect(iat).toBeGreaterThan(thisSecond() - 1);
    expect(iat).toBeLessThanOrEqual(thisSecond());
    expect(exp).toBeGreaterThan(thisSecond() + 1);
    expect(exp).toBeLessThanOrEqual(thisSecond() + 10 * 60);
  });

  it("sets other options if passed", async () => {
    const options = { jwtid: faker.random.uuid() };
    const signToken = makeSignToken({ secret, expiresIn: "10m", options });
    const token = signToken({ payload });
    const { jti } = jwt.verify(token, secret);
    expect(jti).toBe(options.jwtid);
  });
});
