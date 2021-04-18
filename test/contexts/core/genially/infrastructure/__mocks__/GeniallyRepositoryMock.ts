import Genially from "../../../../../../src/contexts/core/genially/domain/Genially";
import GeniallyRepository from "../../../../../../src/contexts/core/genially/domain/GeniallyRepository";

export class GeniallyRepositoryMock implements GeniallyRepository {
  private saveMock = jest.fn();
  private findMock = jest.fn();
  private deleteMock = jest.fn();

  async save(genially: Genially): Promise<void> {
    return this.saveMock(genially);
  }

  async find(id: string): Promise<Genially> {
    return this.findMock(id);
  }

  async delete(id: string): Promise<void> {
    return this.deleteMock(id);
  }

  onFindReturn(value: Genially): void {
    this.findMock.mockResolvedValue(value);
  }

  assertFindCalledWith(value: string): void {
    expect(this.findMock).toHaveBeenCalledWith(value);
  }

  getLastSaveCall(): Genially {
    const mock = this.saveMock.mock;
    return mock.calls[mock.calls.length - 1][0] as Genially;
  }

  assertDeleteCalledWith(value: string): void {
    expect(this.deleteMock).toHaveBeenCalledWith(value);
  }
}