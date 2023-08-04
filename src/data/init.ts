import { Database } from 'sqlite3'
import { join } from 'path'

const db = new Database(join(__dirname, '../../SQLite.db'))

export default db
