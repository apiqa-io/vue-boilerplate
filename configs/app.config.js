const config = {
  admin: {
    username: 'admin',
    password: '11aaAA'
  },
  db: {
    host: 'postgres',
    port: 5432,
    username: 'postgres',
    password: 'postgres',
    dbname: 'prinzip'
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
