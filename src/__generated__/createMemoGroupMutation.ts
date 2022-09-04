/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { CreateMemoGroupInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: createMemoGroupMutation
// ====================================================

export interface createMemoGroupMutation_createMemoGroup {
  __typename: "CreateMemoGroupOutput";
  ok: boolean;
  error: string | null;
}

export interface createMemoGroupMutation {
  createMemoGroup: createMemoGroupMutation_createMemoGroup;
}

export interface createMemoGroupMutationVariables {
  createMemoGroupInput: CreateMemoGroupInput;
}
