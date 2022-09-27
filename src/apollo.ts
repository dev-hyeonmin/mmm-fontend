import {
    ApolloClient,
    createHttpLink,
    InMemoryCache,
    makeVar,
    split,
} from "@apollo/client";
import { LOCALSTORAGE_TOKEN, SERVER_URL, SOCKET_URL } from "./constants";
import { setContext } from "@apollo/client/link/context";

import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { createClient } from "graphql-ws";
import { getMainDefinition } from "@apollo/client/utilities";

const token = localStorage.getItem(LOCALSTORAGE_TOKEN);
export const isLoggedInVar = makeVar(Boolean(token));
export const authTokenVar = makeVar(token);

const httpLink = createHttpLink({
    uri:
        process.env.NODE_ENV === 'production' 
        ? "https://mmm-backend.herokuapp.com/graphql"
        : `${SERVER_URL}/graphql`,
});

const wsLink = new GraphQLWsLink(
    createClient({
    url:
        process.env.NODE_ENV === 'production' 
        ? "https://mmm-backend.herokuapp.com/graphql"
        : `${SOCKET_URL}/graphql`,
    connectionParams: {
        "x-jwt": authTokenVar() || "",
    },
    })
);

const authLink = setContext((_, { headers }) => {
    return {
        headers: {
            ...headers,
            "x-jwt": authTokenVar() || "",
        },
    };
});

const splitLink = split(
    ({ query }) => {
        const definition = getMainDefinition(query);
        return (
            definition.kind === "OperationDefinition" &&
            definition.operation === "subscription"
        );
    },
    wsLink,
    authLink.concat(httpLink)
);

export const client = new ApolloClient({
    link: splitLink,
    cache: new InMemoryCache({
        typePolicies: {
            Query: {
                fields: {
                    isLoggedIn: {
                        read() {
                            return isLoggedInVar();
                        },
                        },
                    token: {
                        read() {
                            return authTokenVar();
                        },
                    },
                },
            },
            MemoGroup: {
                fields: {
                    memos: {
                        merge(existing = [], incoming: any[]) {
                            return incoming;        
                        },
                    },
                },
            },
        },
    }),
});