export class Reminder {
  id: string;
  start: Date;
  city: string;
  title: string;
  color: string;
  textColor: string;
  editable: boolean;

  constructor() {
    this.id = this.generateId();
    this.textColor = "white";
  }
  private generateId = () => {
    // Math.random should be unique because of its seeding algorithm.
    // Convert it to base 36 (numbers + letters), and grab the first 9 characters
    // after the decimal.
    return (
      "_" +
      Math.random()
        .toString(36)
        .substr(2, 9)
    );
  };
}
