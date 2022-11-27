export class InvalidPayloadExpeption extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'InvalidPayloadException';
  }
}
