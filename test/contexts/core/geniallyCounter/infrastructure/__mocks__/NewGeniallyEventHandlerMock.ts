import { EventHandler } from "../../../../../../src/contexts/shared/domain/EventHandler";

export class NewGeniallyEventHandlerMock implements EventHandler {
  private handleMock = jest.fn();

  async handle(): Promise<void> {
    return this.handleMock();
  }

  assertHandleHasBeenCalled(): void {
    expect(this.handleMock).toHaveBeenCalled();
  }

  assertHandleHasNotBeenCalled(): void {
    expect(this.handleMock).not.toHaveBeenCalled();
  }
}