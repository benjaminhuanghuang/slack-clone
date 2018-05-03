import express from 'express';
import bodyParser from 'body-parser';
import { graphqlExpress, graphiqlExpress} from 'apollo-server-express';

import typeDefs from './schema';
import resolvers from './resolvers';
import models from './models';

import { makeExecutableSchema } from 'graphql-tools';

const schema = makeExecutableSchema({
    typeDefs,
    resolvers
})

const PORT = 3838;
const GraphqlEndpoint='/graphql';

const app = express();
app.use(GraphqlEndpoint, bodyParser.json(), graphqlExpress({schema}));
app.use('/graphiql', graphiqlExpress({ endpointURL: GraphqlEndpoint}));

app.listen(PORT);

