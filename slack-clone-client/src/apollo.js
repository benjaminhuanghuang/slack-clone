import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { setContext } from 'apollo-link-context';
import { ApolloLink, split } from 'apollo-link';
import { WebSocketLink } from 'apollo-link-ws';
import { getMainDefinition } from 'apollo-utilities';

// Connect to server
const httpLink = createHttpLink({ uri: 'http://localhost:8888/graphql' });

// Running before graphQL, pass token to server
const middlewareLink = setContext(() => ({
    headers: {
        'x-token': localStorage.getItem('token'),
        'x-refresh-token': localStorage.getItem('refreshToken'),
    },
}));

// Running after graphQL, save token
const afterwareLink = new ApolloLink((operation, forward) => {
    const { headers } = operation.getContext();

    if (headers) {
        const token = headers.get('x-token');
        const refreshToken = headers.get('x-refresh-token');

        if (token) {
            localStorage.setItem('token', token);
        }

        if (refreshToken) {
            localStorage.setItem('refreshToken', refreshToken);
        }
    }

    return forward(operation);
});

const httpLinkWithMiddlware = afterwareLink.concat(middlewareLink.concat(httpLink));

// Create a WebSocket link:
const wsLink = new WebSocketLink({
    uri: `ws://localhost:8888/`,
    options: {
        reconnect: true
    }
});

// using the ability to split links, you can send data to each link
// depending on what kind of operation is being sent
const link = split(
    // split based on operation type
    ({ query }) => {
        const { kind, operation } = getMainDefinition(query);
        return kind === 'OperationDefinition' && operation === 'subscription';
    },
    wsLink,
    httpLinkWithMiddlware,
);


export default new ApolloClient({
    link,
    cache: new InMemoryCache(),
});