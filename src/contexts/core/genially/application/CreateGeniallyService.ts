import Genially from "../domain/Genially";
import GeniallyRepository from "../domain/GeniallyRepository";
import { EventBus } from "../../../../contexts/shared/domain/EventBus";
import Event from "../../../../contexts/shared/domain/Event";

type CreateGeniallyServiceRequest = {
  id: string;
  name: string;
  description: string;
};

export default class CreateGeniallyService {
  private readonly EVENT_NAME = "GENIALLY_CREATED"

  constructor(private repository: GeniallyRepository, private eventBus: EventBus) {}

  public async execute(req: CreateGeniallyServiceRequest): Promise<Genially> {
    const { id, name, description } = req;

    const genially = new Genially(id, name, description);

    await this.repository.save(genially);
    await this.eventBus.publish(new Event(this.EVENT_NAME, new Date()));

    return genially;
  }
}
