Vue-boilerplate
====================
 Install
-----
Download:
```bash
$ git clone https://github.com/SYNC-SU/vue-boilerplate.git
```
Pre-install:
1.  Change settings in **.env** file
2.  Change credentials and if you need add custom data in **install_data.js**

Install:
```bash
$ ./install
```
Scripts:
-------
* **install** - install project
* **start** - run project. If "ENVIRONMENT" variable in .env file set in "prod", run production version: build frontend and admin apps, and serve it as static minified files.
* **stop [container_name]** - stop container.  If container name not provided stop all
* **restart [container_name]** - restart container. If container name not provided restart all
* **log [container_name]** - show selected container logs or all logs if container not provided. Accept all docker-compose logs options.
* **yarn [container_name]** - start yarn scripts in container. **container_name** is required
* **psql and rdb** - CLI for postgres and redis services

Containers:
--------
### postgres
PostgreSQL. Default settings:  
  ```js
  host: 'postgres'  
  port: 5432  
  username: 'postgres'  
  password: 'postgres'  
  dbname: 'boilerplate'  
  ```
### redis
Redis. Default settings:  
  ```js
  host: 'redis'
  port: 6379
  ```
### api
API container. Can serve both admin and frontend routes.  
Default prefix: '/api'  
**express** for REST and **sequelize** for ORM

### frontend
Main interface.
* Vue 2.2.4
* Vue-router 2.2.0
* axios 0.15  

Linting with eslint by **standard** rules

### admin
Admin panel.
* Vue 2.2.4
* Vue-router 2.2.0
* axios 0.15  

Linting with eslint by **standard** rules  
In branch **master** use clean **vue**, and **vuetify** in same named branch 

## Defaults:
```js
  username: admin
  password: admin
```

## License

  [MIT](LICENSE)
