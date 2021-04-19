import GeniallyCounterRepository from "../domain/GeniallyCounterRepository";

export default class IncreaseGeniallyCounterService {
  constructor(private repository: GeniallyCounterRepository) {}
  public async execute(): Promise<void> {
    const counter = await this.repository.get();
    counter.increase();
    return this.repository.update(counter);
  }
}