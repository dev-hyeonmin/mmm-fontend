import { gql } from "@apollo/client";

export const EDITMEMO_MUTATION = gql`
    mutation editMemoMutation ($editMemoInput: EditMemoInput!) {
        editMemo (input: $editMemoInput) {
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