/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { EditMemoGroupInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: editMemoGroupMutation
// ====================================================

export interface editMemoGroupMutation_editMemoGroup {
  __typename: "EditMemoGroupOutput";
  ok: boolean;
  error: string | null;
}

export interface editMemoGroupMutation {
  editMemoGroup: editMemoGroupMutation_editMemoGroup;
}

export interface editMemoGroupMutationVariables {
  editMemoGroupInput: EditMemoGroupInput;
}
