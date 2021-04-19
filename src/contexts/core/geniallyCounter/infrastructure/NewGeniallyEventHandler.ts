import { EventHandler } from "../../../shared/domain/EventHandler";
import IncreaseGeniallyCounterService from "../application/IncreaseGeniallyCounterService";

export default class NewGeniallyEventHandler implements EventHandler {
  constructor(private increaseGeniallyCounterService: IncreaseGeniallyCounterService) {}

  public handle = (): Promise<void> => {
    return this.increaseGeniallyCounterService.execute();
  }
}