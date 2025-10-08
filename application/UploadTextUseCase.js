export default class UploadTextUseCase {
  #repo;

  constructor(passageRepo) {
    this.#repo = passageRepo;
  }

  async runAsync({ passage, opMorScoreResult, token }) {
    return await this.#repo.createAsync({ passage, opMorScoreResult, token });
  }
}
