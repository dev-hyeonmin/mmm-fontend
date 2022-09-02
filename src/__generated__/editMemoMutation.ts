/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { EditMemoInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: editMemoMutation
// ====================================================

export interface editMemoMutation_editMemo {
  __typename: "EditMemoOutput";
  ok: boolean;
  error: string | null;
}

export interface editMemoMutation {
  editMemo: editMemoMutation_editMemo;
}

export interface editMemoMutationVariables {
  editMemoInput: EditMemoInput;
}
