/** I plead the 5th on this one. Inspired by https://x.com/hakanshehu/status/1943019056610558432
 *
 * preconditions:
 * req.checkPwUseCase exists
 * requireBody("password", (any other args)) has run and passed
 */
export default async function requireUniquePassword(req, res, next) {
  const { password } = req.body;
  const duplicate = await req.checkPwUseCase.runAsync({ password });
  if (!!duplicate) {
    return res
      .status(500)
      .send(
        `Error - ${duplicate.email} has already reserved this password. Please use a different one.`
      );
  }
  next();
}
