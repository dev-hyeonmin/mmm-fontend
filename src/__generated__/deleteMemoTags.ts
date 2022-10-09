/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { DeleteMemoTagInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: deleteMemoTags
// ====================================================

export interface deleteMemoTags_deleteMemoTags {
  __typename: "DeleteMemoTagOutput";
  ok: boolean;
  error: string | null;
}

export interface deleteMemoTags {
  deleteMemoTags: deleteMemoTags_deleteMemoTags;
}

export interface deleteMemoTagsVariables {
  deleteMemoTagInput: DeleteMemoTagInput;
}
