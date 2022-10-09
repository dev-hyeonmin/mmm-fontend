/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { AddMemoTagInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: addMemoTags
// ====================================================

export interface addMemoTags_addMemoTags {
  __typename: "AddMemoTagOutput";
  ok: boolean;
  error: string | null;
}

export interface addMemoTags {
  addMemoTags: addMemoTags_addMemoTags;
}

export interface addMemoTagsVariables {
  addMemoTagInput: AddMemoTagInput;
}
