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
2.  Change credentials and add custom data (if you need) in **api/db/migrations/seed.js**

Install:
```bash
$ ./install
```
Scripts:
-------
* **install** - install project.
* **start** - run project. If "ENVIRONMENT" variable in .env file set in "prod", run production version: build frontend and admin apps, and serve it as static minified files.
* **stop [container_name]** - stop container.  If container name not provided stop all.
* **restart [container_name]** - restart container. If container name not provided restart all.
* **log [container_name]** - show selected container logs or all logs if container not provided. Accept all docker-compose logs options.
* **yarn [container_name]** - start yarn scripts in container. **container_name** is required.
* **psql and rdb** - CLI for postgres and redis services.
* **migrate \<action>** - create or start migration. Actions: **create \<name>** and **down**. **create** make empty migration in **api/db/migrations** with **name**. **down** runs migration undo. Empty action run all migrations from folder **api/db/migrations**, ordering by filename.

Containers:
--------
### nginx
Nginx web-server. All configs in **nginx** folder.
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
Default prefix: **/api**  
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

## Defaults:
```js
  username: admin@mail.ru
  password: admin
```

## License

  [MIT](LICENSE)
