import path from 'path';
import express from 'express';
import bodyParser from 'body-parser';
import { graphqlExpress, graphiqlExpress } from 'apollo-server-express';
import { fileLoader, mergeTypes, mergeResolvers} from 'merge-graphql-schemas';

import models from './models';

const typeDefs = mergeTypes(fileLoader(path.join(__dirname, './schemas')));
const resolvers = mergeResolvers(fileLoader(path.join(__dirname, './resolvers')));

import { makeExecutableSchema } from 'graphql-tools';

const schema = makeExecutableSchema({
    typeDefs,
    resolvers
})

const PORT = 3838;
const GraphqlEndpoint = '/graphql';

const app = express();
app.use(GraphqlEndpoint, bodyParser.json(), graphqlExpress({ schema }));
app.use('/graphiql', graphiqlExpress({ endpointURL: GraphqlEndpoint }));

models.sequelize.sync({force: true}).then(() => {
    app.listen(PORT);
});


 