import GeniallyCounter from "../../../../../../src/contexts/core/geniallyCounter/domain/GeniallyCounter";
import GeniallyCounterRepository from "../../../../../../src/contexts/core/geniallyCounter/domain/GeniallyCounterRepository";

export class GeniallyCounterRepositoryMock implements GeniallyCounterRepository {
  private getMock = jest.fn();
  private updateMock = jest.fn();

  async get(): Promise<GeniallyCounter> {
    return this.getMock();
  }

  async update(counter: GeniallyCounter): Promise<void> {
    return this.updateMock(counter);
  }

  onGetReturn(value: GeniallyCounter): void {
    this.getMock.mockResolvedValue(value);
  }

  assertGetHasBeenCalled(): void {
    expect(this.getMock).toHaveBeenCalled();
  }

  assertUpdateCalledWith(value: GeniallyCounter): void {
    expect(this.updateMock).toHaveBeenCalledWith(value);
  }
}