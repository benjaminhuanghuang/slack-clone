import express from 'express';
import bodyParser from 'body-parser';

import { graphqlExpress, graphiqlExpress } from 'apollo-server-express';
import { makeExecutableSchema } from 'graphql-tools';

const typeDefs = `
type Query {
    hi: String
}`;


const resolvers = {
  Query: {
    hi: (parent, args, context, info) => 'I am graphql',
  }
};

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

const app = express();

app.use('/graphql', bodyParser.json(), graphqlExpress({ schema }));

app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }));

app.listen(8964);

/* Usage
  {
    hi
  }
*/