import Event from "../../../../src/contexts/shared/domain/Event";
import InMemorySyncEventBus from "../../../../src/contexts/shared/infrastructure/InMemorySyncEventBus";
import { NewGeniallyEventHandlerMock } from "../../core/geniallyCounter/infrastructure/__mocks__/NewGeniallyEventHandlerMock";

describe("InMemorySyncEventBus", () => {
  it("should call an added handler", async () => {
    const eventName = "test";
    const eventBus = new InMemorySyncEventBus();
    const handlerMock = new NewGeniallyEventHandlerMock();
    eventBus.addEventHandler(eventName, handlerMock);
    await eventBus.publish(new Event(eventName, new Date()));
    handlerMock.assertHandleHasBeenCalled();
  });

  it("should call several added handlers", async () => {
    const eventName = "test";
    const eventBus = new InMemorySyncEventBus();
    const handlerMock1 = new NewGeniallyEventHandlerMock();
    const handlerMock2 = new NewGeniallyEventHandlerMock();
    eventBus.addEventHandler(eventName, handlerMock1);
    eventBus.addEventHandler(eventName, handlerMock2);
    await eventBus.publish(new Event(eventName, new Date()));
    handlerMock1.assertHandleHasBeenCalled();
    handlerMock2.assertHandleHasBeenCalled();
  });

  it("should not call a handler with different name", async () => {
    const eventName = "test";
    const eventBus = new InMemorySyncEventBus();
    const handlerMock = new NewGeniallyEventHandlerMock();
    eventBus.addEventHandler(eventName, handlerMock);
    await eventBus.publish(new Event("other-event", new Date()));
    handlerMock.assertHandleHasNotBeenCalled();
  });
});