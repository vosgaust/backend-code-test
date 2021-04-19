import GeniallyCounter from "./GeniallyCounter";

interface GeniallyRepository {
  get(): Promise<GeniallyCounter>;
  update(counter: GeniallyCounter): Promise<void>;
}

export default GeniallyRepository;
