import path from 'path';
import express from 'express';
import bodyParser from 'body-parser';
import { graphqlExpress, graphiqlExpress } from 'apollo-server-express';
import { fileLoader, mergeTypes, mergeResolvers } from 'merge-graphql-schemas';
import cors from 'cors';

import models from './models';
// Auth
import { refreshTokens } from './auth';
const SECRET = 'asiodfhoi1hoi23jnl1kejd';
const SECRET2 = 'asiodfhoi1hoi23jnl1kejasdjlkfasdd';

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
app.use(cors('localhost:3000'));
app.use(GraphqlEndpoint, bodyParser.json(), graphqlExpress({
    schema,
    context: {
        models,
        SECRET,
        SECRET2,
    }
}));

app.use('/graphiql', graphiqlExpress({ endpointURL: GraphqlEndpoint }));

// {force: true}
models.sequelize.sync({}).then(() => {
    app.listen(PORT);
});


