import jwt from "jsonwebtoken";

const makeDecodeToken = ({ secret }) => ({ token }) => jwt.verify(token, secret);

export default makeDecodeToken;
