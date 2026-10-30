module.exports = {
  DB: {
    Type: "SYS_POSTGRES_TYPE",
    User: "SYS_POSTGRES_USER",
    Password: "SYS_POSTGRES_PASSWORD",
    Port: "SYS_POSTGRES_PORT",
    Host: "SYS_POSTGRES_HOST",
    Database: "SYS_POSTGRES_DB"
  },
  Redis: {
    mode: "SYS_REDIS_MODE",
    ip: "SYS_REDIS_HOST",
    port: "SYS_REDIS_PORT",
    password: "SYS_REDIS_PASSWORD",
    sentinels: {
      hosts: "SYS_REDIS_SENTINEL_HOSTS",
      port: "SYS_REDIS_SENTINEL_PORT",
      name: "SYS_REDIS_SENTINEL_NAME"
    }
  },
  Security: {
    ip: "SYS_REDIS_HOST",
    port: "SYS_REDIS_PORT",
    password: "SYS_REDIS_PASSWORD",
    mode: "SYS_REDIS_MODE",
    sentinels: {
      hosts: "SYS_REDIS_SENTINEL_HOSTS",
      port: "SYS_REDIS_SENTINEL_PORT",
      name: "SYS_REDIS_SENTINEL_NAME"
    },
    common: "SYS_AUTH_COMMON_ENABLED"
  },
  Services: {
    accessToken: "HOST_TOKEN"
  },
  HealthCheck: {
    DBs: "SYS_HEALTHCHECK_DBS",
    timeout: "SYS_HEALTHCHECK_TIMEOUT"
  }
};
