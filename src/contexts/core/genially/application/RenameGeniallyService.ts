import Genially from "../domain/Genially";
import GeniallyNotExist from "../domain/GeniallyNotExist";
import GeniallyRepository from "../domain/GeniallyRepository";

type RenameGeniallyServiceRequest = {
  id: string;
  name: string;
};

export default class RenameGeniallyService {
  constructor(private repository: GeniallyRepository) {}

  public async execute(req: RenameGeniallyServiceRequest): Promise<Genially> {
    const genially = await this.repository.find(req.id);
    if (!genially) {
      throw new GeniallyNotExist(req.id);
    }
    genially.updateName(req.name);
    await this.repository.delete(req.id);
    await this.repository.save(genially);
    return genially;
  }
}
