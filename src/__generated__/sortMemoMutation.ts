/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { SortMemoInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: sortMemoMutation
// ====================================================

export interface sortMemoMutation_sortMemo {
  __typename: "SortMemoOutput";
  ok: boolean;
  error: string | null;
}

export interface sortMemoMutation {
  sortMemo: sortMemoMutation_sortMemo;
}

export interface sortMemoMutationVariables {
  sortMemoInput: SortMemoInput;
}
