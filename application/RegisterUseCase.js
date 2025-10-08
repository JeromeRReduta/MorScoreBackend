export default class RegisterUseCase {
  #repo;

  constructor(userRepo) {
    this.#repo = userRepo;
  }

  async runAsync({ email, name, password }) {
    return await this.#repo.createAsync({ email, name, password });
  }
}
