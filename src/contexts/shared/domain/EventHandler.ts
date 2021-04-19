export interface EventHandler {
  handle(): Promise<void>;
}