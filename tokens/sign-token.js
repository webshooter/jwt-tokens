import jwt from "jsonwebtoken";

const makeSignToken = ({
  secret,
  expiresIn,
  options = {},
}) => ({ payload }) => jwt.sign(payload, secret, { ...options, expiresIn });

export default makeSignToken;
