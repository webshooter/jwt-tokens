const makeNewRefreshToken = ({ decodeToken, signToken } = {}) => ({ token } = {}) => {
  const { id, email } = decodeToken({ token });

  // TODO: get better payload validation here- joi schema validation?
  if (!id || !email) {
    throw new Error("Bad token!");
  }

  return signToken({ payload: { id, email } });
};

export default makeNewRefreshToken;
