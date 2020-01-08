import makeNewAccessToken from "./new-access-token";
import makeNewRefreshToken from "./new-refresh-token";
import makeDecodeToken from "./decode-token";
import makeSignToken from "./sign-token";
import extractToken from "./extract-token";

const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;
const accessTokenExpiresIn = "1h";

const apiTokenSecret = process.env.API_TOKEN_SECRET;
const apiTokenExpiresIn = "1d";

const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET;
const accessTokenExpiresIn = "3d";

// makeSignToken allows us to generate token
// signing functions for tokens with different purposes
const signAccessToken = makeSignToken({
  secret: accessTokenSecret,
  expiresIn: accessTokenExpiresIn,
});

const signRefreshToken = makeSignToken({
  secret: refreshTokenSecret,
  expiresIn: refreshTokenExpiresIn,
});

const signApiToken = makeSignToken({
  secret: apiTokenSecret,
  expiresIn: apiTokenExpiresIn,
});

// general client access tokens:
const decodeAccessToken = makeDecodeToken({ secret: accessTokenSecret });
const newAccessToken = makeNewAccessToken({ signToken: signAccessToken });

// api access tokens:
const decodeApiToken = makeDecodeToken({ secret: apiTokenSecret });
const newApiToken = makeNewAccessToken({ signToken: signApiToken });

// refresh tokens:
const decodeRefreshToken = makeDecodeToken({ secret: refreshTokenSecret });
const newRefreshToken = makeNewRefreshToken({
  decodeToken: decodeAccessToken,
  signToken: signRefreshToken,
});

export {
  newAccessToken,
  decodeAccessToken,

  newApiToken,
  decodeApiToken,

  newRefreshToken,
  decodeRefreshToken,

  extractToken,
};
