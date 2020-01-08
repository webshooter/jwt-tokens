import faker from "faker";
import makeNewJwtForUser from "./new-access-token";

describe("jwt -> makeForUser", () => {
  let signedToken;
  let id;
  let email;
  let user;
  let getId;
  let getEmail;
  let signToken;
  let newAccessToken;

  beforeEach(() => {
    id = faker.random.uuid();
    email = faker.internet.email();
    signedToken = faker.random.uuid();

    getId = jest.fn();
    getId.mockReturnValueOnce(id);

    getEmail = jest.fn();
    getEmail.mockReturnValueOnce(email);

    signToken = jest.fn();
    signToken.mockReturnValueOnce(signedToken);

    user = { getId, getEmail };

    newAccessToken = makeNewJwtForUser({ signToken });
  });

  it("makes an access token for the user", async () => {
    const scope = "api";
    const token = newAccessToken({ user, scope });

    expect(getId).toHaveBeenCalledTimes(1);
    expect(getEmail).toHaveBeenCalledTimes(1);
    expect(signToken).toHaveBeenCalledTimes(1);
    expect(signToken).toBeCalledWith({ payload: { id, email, scope } });
    expect(token).toBe(signedToken);
  });
  it("returns null if no user is provided", async () => {
    const token = newAccessToken();

    expect(getId).toHaveBeenCalledTimes(0);
    expect(getEmail).toHaveBeenCalledTimes(0);
    expect(signToken).toHaveBeenCalledTimes(0);
    expect(token).toBeNull();
  });
});
