import Genially from "../domain/Genially";
import GeniallyRepository from "../domain/GeniallyRepository";

type DeleteGeniallyServiceRequest = {
  id: string;
}

export default class DeleteGeniallyService {
  constructor(private repository: GeniallyRepository) {}

  public async execute(req: DeleteGeniallyServiceRequest): Promise<Genially> {
    const genially = await this.repository.find(req.id);
    if (!genially) {
      throw new Error(`genially with id ${req.id} not found`);
    }
    genially.updateDeletedAt();
    await this.repository.delete(req.id);
    await this.repository.save(genially);
    return genially;
  }
}
