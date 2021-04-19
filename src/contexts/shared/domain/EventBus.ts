import Event from "./Event";
import { EventHandler } from "./EventHandler";

export interface EventBus {
  publish(event: Event): Promise<void>;
  addEventHandler(name: string, handler: EventHandler): void;
};