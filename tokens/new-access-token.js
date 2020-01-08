const makeNewAccessToken = ({ signToken } = {}) => ({ user, scope } = {}) => {
  let token = null;

  if (user) {
    token = signToken({
      payload: {
        id: user.getId(),
        email: user.getEmail(),
        scope,
      },
    });
  }

  return token;
};

export default makeNewAccessToken;
