const bearerPrefix = "Bearer ";

const extractToken = ({ req, checkCookie = false }) => {
  const { headers = {}, cookies = {} } = req;
  let token = headers["x-access-token"] || headers.authorization;
  if (!token && checkCookie) {
    token = cookies.token;
  }

  if (!token) {
    return null;
  }

  if (token.startsWith(bearerPrefix)) {
    // Remove Bearer from string
    token = token.slice(bearerPrefix.length, token.length);
  }

  return token;
};

export default extractToken;
