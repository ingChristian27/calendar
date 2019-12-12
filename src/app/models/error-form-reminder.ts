import { nameError } from "./nameError";

export class ErrorFormReminder {
  name: nameError;
  constructor() {
    this.name = new nameError();
  }
}
