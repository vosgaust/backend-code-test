import GeniallyCounter from "../../../../../src/contexts/core/geniallyCounter/domain/GeniallyCounter";
import { GeniallyCounterRepositoryMock } from "../../geniallyCounter/infrastructure/__mocks__/GeniallyCounterRepositoryMock";
import IncreaseGeniallyCounterService from "../../../../../src/contexts/core/geniallyCounter/application/IncreaseGeniallyCounterService";

describe("IncreaseGeniallyService", () => {
  it("should increase the count properly", async () => {
    const counterInitValue = 5;
    const repositoryMock = new GeniallyCounterRepositoryMock();
    repositoryMock.onGetReturn(new GeniallyCounter(counterInitValue));
    const counterService = new IncreaseGeniallyCounterService(repositoryMock);

    await counterService.execute();
    repositoryMock.assertGetHasBeenCalled();
    repositoryMock.assertUpdateCalledWith(new GeniallyCounter(counterInitValue + 1));
  });
});