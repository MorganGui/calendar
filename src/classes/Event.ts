import db from '../data/init'

export default class Event {
  id: number | null
  from: number
  to: number
  title: string
  desc: string

  constructor(id: number | null, from: number, to: number, title: string, desc: string) {
    this.id = id
    this.from = from
    this.to = to
    this.title = title
    this.desc = desc
  }

  static hydrate(object: any) {
    return new Event(object.id, object.from, object.to, object.title, object.desc)
  }


  async save() {
    if (this.id) {

      // update
      return await db.run(
        'update event set from=?, to=?, title=?, desc=? where id=?',
        this.from, this.to, this.title, this.desc, this.id
      )

    } else {

      // add
      return await db.run(
        'insert into event (from, to, title, desc) values (?, ?, ?, ?)',
        this.from, this.to, this.title, this.desc
      )

    }
  }
}
