import { gql, useQuery } from "@apollo/client";

export const ME_QUERY = gql`
    query meQuery {
        me {
            id
            name
            email
            verified
            userImage
        }
    }
`;

export const useMe = () => {
    return useQuery(ME_QUERY);
}