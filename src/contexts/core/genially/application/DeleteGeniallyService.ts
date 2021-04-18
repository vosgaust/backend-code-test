import Genially from "../domain/Genially";
import GeniallyNotExist from "../domain/GeniallyNotExist";
import GeniallyRepository from "../domain/GeniallyRepository";

type DeleteGeniallyServiceRequest = {
  id: string;
}

export default class DeleteGeniallyService {
  constructor(private repository: GeniallyRepository) {}

  public async execute(req: DeleteGeniallyServiceRequest): Promise<Genially> {
    const genially = await this.repository.find(req.id);
    if (!genially) {
      throw new GeniallyNotExist(req.id);
    }
    genially.updateDeletedAt();
    await this.repository.delete(req.id);
    await this.repository.save(genially);
    return genially;
  }
}
