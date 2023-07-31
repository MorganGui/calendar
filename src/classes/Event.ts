export default class Event {
  id: number
  from: number
  to: number
  title: string

  constructor(id: number, from: number, to: number, title: string) {
    this.id = id
    this.from = from
    this.to = to
    this.title = title
  }
}
