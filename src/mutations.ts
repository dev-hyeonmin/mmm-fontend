import { gql } from "@apollo/client";

export const CREATEMEMOGROUP_MUTATION = gql`
    mutation createMemoGroupMutation ($createMemoGroupInput: CreateMemoGroupInput!) {
        createMemoGroup (input: $createMemoGroupInput) {
            ok
            error
        }
    }
`;

export const DELETEMEMOGROUP_MUTATION = gql`
    mutation deleteMemoGroupMutation ($deleteMemoGroupInput: DeleteMemoGroupInput!) {
        deleteMemoGroup (input: $deleteMemoGroupInput) {
            ok
            error
        }
    }
`;

export const CREATEMEMO_MUTATION = gql`
    mutation createMemoMutation ($createMemoInput: CreateMemoInput!) {
        createMemo (input: $createMemoInput) {
            ok
            error
            id
        }
    }
`;

export const EDITMEMO_MUTATION = gql`
    mutation editMemoMutation ($editMemoInput: EditMemoInput!) {
        editMemo (input: $editMemoInput) {
            ok
            error
        }
    }
`;

export const DELETEMEMO_MUTATION = gql`
    mutation deleteMemoMutation ($deleteMemoInput: DeleteMemoInput!) {
        deleteMemo (input: $deleteMemoInput) {
            ok
            error
        }
    }
`;

export const SORTEMEMO_MUTATION = gql`
    mutation sortMemoMutation ($sortMemoInput: SortMemoInput!) {
        sortMemo (input: $sortMemoInput) {
            ok
            error
        }
    }
`;

export const ACCEPTGROUPMEMBER_MUTATION = gql`
    mutation acceptGroupMemberMutation ($acceptGroupMemberInput: AcceptGroupMemberInput!) {
        acceptGroupMember (input: $acceptGroupMemberInput) {
            ok
            error
        }
    }
`;