import { EventBus } from "../domain/EventBus";
import Event from "../domain/Event";
import { EventHandler } from "../domain/EventHandler";

export default class InMemorySyncEventBus implements EventBus {
  private handlers: Map<string, Array<EventHandler>> = new Map()
  publish(event: Event): Promise<void> {
    const handlers = this.handlers.get(event.eventName);
    if(handlers) {
      return Promise.all(handlers.map(handler => handler.handle()))
    .then(() => Promise.resolve());
    } else {
      return Promise.resolve();
    }
  }

  addEventHandler(name: string, handler: EventHandler): void {
    const handlers = this.handlers.get(name);
    if(!handlers) {
      this.handlers.set(name, [handler]);
    } else {
      handlers.push(handler);
    }
  }
}