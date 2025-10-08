export default class LoginUseCase {
  #repo;

  constructor(userRepo) {
    this.#repo = userRepo;
  }

  async runAsync({ loginInfo: { email, password } }) {
    return await this.#repo.getByLoginInfoAsync({
      loginInfo: { email, password },
    });
  }
}
