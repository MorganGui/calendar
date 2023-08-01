export default class Event {
  id: number
  from: number
  to: number
  title: string
  desc: string

  constructor(id: number, from: number, to: number, title: string, desc: string) {
    this.id = id
    this.from = from
    this.to = to
    this.title = title
    this.desc = desc
  }

  static hydrate(object: any) {
    return new Event(object.id, object.from, object.to, object.title, object.desc)
  }
}
