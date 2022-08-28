import { gql, useQuery } from "@apollo/client";

const ME_QUERY = gql`
    query me {
        me {
            id
            email
            verified
        }
    }
`;

export const useMe = () => {
    return useQuery(ME_QUERY);
}