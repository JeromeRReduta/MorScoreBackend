export default class AuthWithIdUseCase {
  #repo;

  constructor(userRepo) {
    this.#repo = userRepo;
  }

  async runAsync({ id }) {
    return await this.#repo.getByIdAsync(id);
  }
}
