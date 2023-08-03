import { Database } from 'sqlite3'
import { join } from 'path'

const db = new Database(join(__dirname, '../../SQLite.db'), e => {
  if (e)
    console.log(e)
  else
    console.log('ok')
})

export default db
