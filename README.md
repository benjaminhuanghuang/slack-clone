## Reference 
    - Slack Clone Using GraphQL and React
        - https://www.youtube.com/playlist?list=PLN3n1USn4xlkdRlq3VZ1sT6SGW0-yajjL
        - https://github.com/benawad/slack-clone-server/tree/7_register_validation
        - https://github.com/benawad/slack-clone-client

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

## Database and ORM
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

Graphql
Tool for merge schema
```
    npm i -S merge-graphql-schemas
```

## React with GraphQL
```
npm i -g create-react-app
create-react-app slack-clone-client

# installing the preset package and react integration
npm install apollo-boost react-apollo graphql --save
```

```
import {ApolloClient, createNetworkInterface} from 'react-appllo';
```

## UI Component
```    
    npm i -S  semantic-ui-react semantic-ui-css
```

## Mobx
```
    npm i -S mobx mobx-react
```