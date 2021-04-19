import { EventBus } from "../../../../../src/contexts/shared/domain/EventBus";
import { EventHandler } from "../../../../../src/contexts/shared/domain/EventHandler";
import Event from "../../../../../src/contexts/shared/domain/Event";

export class EventBusMock implements EventBus {
  private publishMock = jest.fn();
  private addEventHandlerMock = jest.fn();

  async publish(event: Event): Promise<void> {
    return this.publishMock(event);
  }

  addEventHandler(name: string, handler: EventHandler): void {
    this.addEventHandlerMock(name, handler);
  }

  assertPublishCalled(): void {
    expect(this.publishMock).toHaveBeenCalled();
  }
}