/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: VerifiedMemoGroup
// ====================================================

export interface VerifiedMemoGroup_memos {
  __typename: "Memo";
  id: number;
  content: string;
}

export interface VerifiedMemoGroup {
  __typename: "MemoGroup";
  memos: VerifiedMemoGroup_memos[] | null;
}
