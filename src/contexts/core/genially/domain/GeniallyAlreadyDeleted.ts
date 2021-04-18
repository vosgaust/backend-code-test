export default class GeniallyAlreadyDeleted extends Error {
  constructor(id: string) {
    super(`genially with id ${id} is already deleted`);
  }
}
