1. Introduction

2. Server side setup
- Using appolo-server-express
- babel
- eslint
- nodemon

```
    mkdir slack-clone-server
    cd slack-clone-server
    npm init -y

    npm i -D nodemon babel-cli babel-preset-env babel-preset-stage-3
   
    create .babelrc

    create start script in package.json
```

setup eslint
```
    npm i -g eslint
    eslint --init
        Use a popular style guid
        Aribnb
        No react
        config file use JavaScript format 

    run command at https://www.npmjs.com/package/eslint-config-airbnb
```
Create graphql server with express
- Install
```
    npm i -S apollo-server-express express body-parser graphql graphql-tools
```
- Copy code from 
    - https://www.apollographql.com/docs/apollo-server/servers/express.html

Create schema 
```
    export default `
        type Query {
            hi: String
        }
    `
```
and resolver
```
    export default {
        Query: {
            hi: (parent, args, context, info) => 'hi',
        }
    }
```
Use makeExecutableSchema to create schema
  - https://www.apollographql.com/docs/graphql-tools/generate-schema.html


3. PostgreSQL with Sequelize
    - https://github.com/sequelize/express-example/tree/master/models

setup
```
    npm i -S sequelize
```
Create models

Create database
```
    $ psql
    # create database myslack;
    # \q                         # exist
```