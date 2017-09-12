const config = {
  db: {
    dialect: 'postgres',
    host: 'postgres',
    port: 5432,
    database: process.env.POSTGRES_DB,
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD
  },
  redis: {
    host: 'redis',
    port: 6379
  },
  mail: {
    manager: [{address: 'inbox@mycorp.com'}],
    sender: {
      name: 'sender',
      email: 'noreply@no.mail'
    },
    auth: {
      api_key: '',
      domain: ''
    }
  },
  jwtTtl: 172800, // 2 days in seconds
  jwtSecret: 'Mo%CT<*;]u95TlgOFnZNiF7iI:l[3-/^^s',
  apiUrl: '/api',
  host: 'http://localhost'
}

module.exports = config
