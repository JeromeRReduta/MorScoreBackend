import { createToken } from "./jwt.js";

/** Preconditions:
 * req.user exists
 */
export default function serveToken({ isNewAccount }) {
  return async (req, res) => {
    const code = isNewAccount ? 201 : 200;
    const data = createToken({ id: req.user.id });
    return res.status(code).send(data);
  };
}
