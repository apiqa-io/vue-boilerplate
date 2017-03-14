const config = {
  roles: ['manager', 'admin', 'superadmin'],
  db: {
    host: 'postgres',
    port: 5432,
    username: 'postgres',
    password: 'postgres',
    dbname: 'boilerplate'
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
