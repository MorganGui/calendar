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

  static hydrate(object: any) {
    return new Event(object.id, object.from, object.to, object.title)
  }
}
