export default class CheckPwUseCase {
  #repo;

  constructor(userRepo) {
    this.#repo = userRepo;
  }

  async runAsync({ password }) {
    return await this.#repo.getByPasswordAsync(password);
  }
}
