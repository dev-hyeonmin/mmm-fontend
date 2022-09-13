import { ApolloClient, createHttpLink, InMemoryCache, makeVar } from "@apollo/client";
import { LOCALSTORAGE_TOKEN } from "./constants";
import { setContext } from '@apollo/client/link/context';

const token = localStorage.getItem(LOCALSTORAGE_TOKEN);
export const isLoggedInVar = makeVar(Boolean(token));
export const authTokenVar = makeVar(token);

const httpLink = createHttpLink({
    uri:
        process.env.NODE_ENV === 'production' 
            ? "https://mmm-backend.herokuapp.com/graphql"
            : 'http://localhost:4000/graphql',
});

const authLink = setContext((_, { headers }) => {
    return {
        headers: {
            ...headers,
            'x-jwt': authTokenVar() || ""
        }
    }
});

export const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache({
        typePolicies: {
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