export default {
  orm: {
    db: {
      client: 'postgresql',
      connection: {
        database: process.env.POSTGRES_DB || 'dev',
        host: process.env.POSTGRES_HOST || 'db',
        port: parseInt(process.env.POSTGRES_PORT || '5432', 10),
        user: process.env.POSTGRES_USER || 'appuser',
        password: process.env.POSTGRES_PASSWORD || 'apppass'
      },
      pool: {
        min: 2,
        max: 10
      },
      migrations: 'knex_migrations'
    },
    redis: {
      host: process.env.REDIS_HOST || 'redis',
      port: process.env.REDIS_PORT || '6379'
    }
  },

  auth: {
    lifetime: 2 * 24 * 3600 * 1000
  },

  http: {
    host: '0.0.0.0',
    port: 3000
  }
};