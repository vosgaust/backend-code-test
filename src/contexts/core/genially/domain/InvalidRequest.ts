export default class InvalidRequestError extends Error {
  constructor(name: string, message: string) {
    super(`Argument ${name} is invalid: ${message}`);
  }
}