/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { CreateMemoInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: createMemoMutation
// ====================================================

export interface createMemoMutation_createMemo {
  __typename: "CreateMemoOutput";
  ok: boolean;
  error: string | null;
  id: number | null;
}

export interface createMemoMutation {
  createMemo: createMemoMutation_createMemo;
}

export interface createMemoMutationVariables {
  createMemoInput: CreateMemoInput;
}
