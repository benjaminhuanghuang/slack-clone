## Reference 
    - Slack Clone Using GraphQL and React
        - https://www.youtube.com/playlist?list=PLN3n1USn4xlkdRlq3VZ1sT6SGW0-yajjL
    - https://github.com/sequelize/express-example


## Setup 
Server side
```
npm i -D nodemon babel-cli babel-preset-env babel-preset-stage-3
npm i -S apollo-server-express express body-parser graphql graphql-tools

```

Eslint
```
npm i -g eslint
eslint --init
```

Database and ORM
```
npm i -S sequelize
```
brew install postgres
postgres -D /usr/local/var/postgres
psql
create database myslack;
\q
\c myslack   # connect to database
\d           # show all tables
