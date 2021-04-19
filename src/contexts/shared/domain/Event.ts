export default class Event {
  readonly eventName: string
  readonly date: Date

  constructor(eventName: string, date: Date) {
    this.eventName = eventName;
    this.date = date;
  }
}