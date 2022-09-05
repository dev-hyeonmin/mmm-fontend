/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { DeleteMemoInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: deleteMemoMutation
// ====================================================

export interface deleteMemoMutation_deleteMemo {
  __typename: "DeleteMemoOutput";
  ok: boolean;
  error: string | null;
}

export interface deleteMemoMutation {
  deleteMemo: deleteMemoMutation_deleteMemo;
}

export interface deleteMemoMutationVariables {
  deleteMemoInput: DeleteMemoInput;
}
