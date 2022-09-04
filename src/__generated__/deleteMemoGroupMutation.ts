/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { DeleteMemoGroupInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: deleteMemoGroupMutation
// ====================================================

export interface deleteMemoGroupMutation_deleteMemoGroup {
  __typename: "DeleteMemoGroupOutput";
  ok: boolean;
  error: string | null;
}

export interface deleteMemoGroupMutation {
  deleteMemoGroup: deleteMemoGroupMutation_deleteMemoGroup;
}

export interface deleteMemoGroupMutationVariables {
  deleteMemoGroupInput: DeleteMemoGroupInput;
}
