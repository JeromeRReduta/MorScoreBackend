import { verifyToken } from "./jwt.js";

/** Attaches the user to the request if a valid token is provided */
/**
 * Preconditions:
 * req.authWithIdUseCase exists
 */
export default async function getUserFromToken(req, res, next) {
  const authorization = req.get("authorization");
  if (!authorization || !authorization.startsWith("Bearer ")) return next();
  const token = authorization.split(" ")[1];
  try {
    const { id } = verifyToken(token);
    req.user = await req.authWithIdUseCase.runAsync({ id });
    next();
  } catch (e) {
    console.error(e);
    res.status(401).send("Invalid token.");
  }
}
