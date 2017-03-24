const config = {
  roles: ['manager', 'admin', 'superadmin'],
  db: {
    host: 'postgres',
    port: 5432,
    dbname: process.env.PG_DB_NAME,
    username: process.env.PG_DB_USER,
    password: process.env.PG_DB_PASS,
    database: process.env.PG_DB_NAME, // needed for migrations
    database: 'postgres' // needed for migrations
  },
  redis: {
    host: 'redis',
    port: 6379
  },
  session: {
    maxAge: 172800000 // 2 days
  }
}

module.exports = config
