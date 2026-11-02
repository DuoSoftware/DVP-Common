# Environment variables

DVP-Common is a shared library. It reads its settings from the config of the service that uses it, by config key (for example `config.DB.Cluster`), not by environment variable name.

- Each service that uses the library maps these config keys to the variables below in its own `config/custom-environment-variables.js`, and lists them in its own `ENVIRONMENT_VARIABLES.md`.
- `SipNetworkProfileApi/config/custom-environment-variables.js` and `config/custom-environment-variables.js` are used only for local tests and holds only the keys the library reads.
- **Default** is what the library uses when the service does not set the key. Real hosts, URLs and secrets are never written here.
- Whenever the library starts or stops reading a config key or a variable, or a value's meaning changes, update this file in the same change. See `.claude/rules/environment-variables.md`.

## Config keys read from the service

| Config key | Variable | Description | Type | Possible values | Default | Required | Secret |
| --- | --- | --- | --- | --- | --- | --- | --- |
| `DB.Cluster` | `SYS_POSTGRES_CLUSTER_ENABLED` | dvp-dbmodels: use a connection pool sized by SYS_POSTGRES_POOL_MAX and SYS_POSTGRES_POOL_MIN. | bool | true \| false | off when unset | no | no |
| `DB.Database` | `SYS_POSTGRES_DB` | Postgres database name. | string | database name | — | yes | no |
| `DB.Host` | `SYS_POSTGRES_HOST` | Postgres host. | host | host name or IP | — | yes | no |
| `DB.Password` | `SYS_POSTGRES_PASSWORD` | Postgres password. | string | password | — | yes | yes |
| `DB.PgBouncer` | `SYS_POSTGRES_PGBOUNCER_ENABLED` | dvp-dbmodels: the service connects through PgBouncer, so no statement_timeout is sent and the database role limits apply. | bool | true \| false | false (library default) | no | no |
| `DB.PoolMax` | `SYS_POSTGRES_POOL_MAX` | dvp-dbmodels: most connections in the pool. Used only when SYS_POSTGRES_CLUSTER_ENABLED is true. | int | connections, e.g. 5 | 5 (library default) | no | no |
| `DB.PoolMin` | `SYS_POSTGRES_POOL_MIN` | dvp-dbmodels: fewest connections kept in the pool. Used only when SYS_POSTGRES_CLUSTER_ENABLED is true. | int | connections, e.g. 0 | 0 (library default) | no | no |
| `DB.Port` | `SYS_POSTGRES_PORT` | Postgres port. | port | 1–65535 | — | yes | no |
| `DB.Type` | `SYS_POSTGRES_TYPE` | Sequelize dialect used by dvp-dbmodels. | enum | postgres | — | yes | no |
| `DB.User` | `SYS_POSTGRES_USER` | Postgres user. | string | user name | — | yes | no |
| `HealthCheck.DBs` | `SYS_HEALTHCHECK_DBS` | dvp-common health checker: stores to ping. Read only by the library's own test config. | list | comma-separated: pg, redis, mongo, rabbitmq | — | yes | no |
| `HealthCheck.timeout` | `SYS_HEALTHCHECK_TIMEOUT` | dvp-common health checker timeout. Read only by the library's own test config. | int | milliseconds | — | yes | no |
| `Redis.ip`, `Security.ip` | `SYS_REDIS_HOST` | Main Redis host. Also used for token checks (Security block). | host | host name or IP; comma-separated list in cluster mode | — | yes | no |
| `Redis.mode`, `Security.mode` | `SYS_REDIS_MODE` | How to connect to the main Redis. | enum | instance \| cluster \| sentinel | — | yes | no |
| `Redis.password`, `Security.password` | `SYS_REDIS_PASSWORD` | Main Redis password. | string | password | — | yes | yes |
| `Redis.port`, `Security.port` | `SYS_REDIS_PORT` | Main Redis port. | port | 1–65535 | — | yes | no |
| `Redis.sentinels.hosts`, `Security.sentinels.hosts` | `SYS_REDIS_SENTINEL_HOSTS` | Sentinel hosts, when SYS_REDIS_MODE is sentinel. | list | comma-separated host names | — | no | no |
| `Redis.sentinels.name`, `Security.sentinels.name` | `SYS_REDIS_SENTINEL_NAME` | Sentinel master name, when SYS_REDIS_MODE is sentinel. | string | sentinel master name | — | no | no |
| `Redis.sentinels.port`, `Security.sentinels.port` | `SYS_REDIS_SENTINEL_PORT` | Sentinel port, when SYS_REDIS_MODE is sentinel. | port | 1–65535 | — | no | no |
| `Security.common` | `SYS_AUTH_COMMON_ENABLED` | dvp-common token check: skip the Redis token lookup when true. Read only by the library's own test config. | bool | true \| false | — | yes | no |
| `Services.accessToken` | `HOST_TOKEN` | Access token this service sends when it calls other services. | string | JWT | — | yes | yes |

## Variables read directly

Read straight from the environment by the library code. These names are reserved and never change.

| Variable | Description | Type | Possible values | Default | Required | Secret |
| --- | --- | --- | --- | --- | --- | --- |
| `DEPLOYMENT_ENV` | docker turns off the log file, so the logger writes to the console only. | string | docker, or unset | unset: console and file | no | no |
| `HOST_NAME` | Host name of the running instance. Also written into every log line by dvp-common. | string | host name | — | yes | no |
| `LOG_LEVEL` | Lowest level the logger writes. | enum | error \| warn \| info \| verbose \| debug \| silly | debug | no | no |
| `LOG_PATH` | Folder for logger.log. Not used when DEPLOYMENT_ENV is docker. | path | folder path, e.g. /var/log/facetone | unset: logger.log in the working folder | no | no |
| `SYS_LOG_HOST` | Logstash host that receives the logs over UDP. Logs are sent only when SYS_LOG_HOST and SYS_LOG_PORT are both set. | host | host name or IP, e.g. logstash.internal | unset: not sent | no | no |
| `SYS_LOG_PORT` | Logstash UDP port. Used with SYS_LOG_HOST. | port | 1–65535 | unset: not sent | no | no |
