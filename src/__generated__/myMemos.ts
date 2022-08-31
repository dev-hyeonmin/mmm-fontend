/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: myMemos
// ====================================================

export interface myMemos_myMemos_groups_memos {
  __typename: "Memo";
  id: number;
  content: string;
}

export interface myMemos_myMemos_groups {
  __typename: "MemoGroup";
  id: number;
  title: string;
  memos: myMemos_myMemos_groups_memos[] | null;
}

export interface myMemos_myMemos {
  __typename: "MyMemosOutput";
  ok: boolean;
  error: string | null;
  groups: myMemos_myMemos_groups[] | null;
}

export interface myMemos {
  myMemos: myMemos_myMemos;
}
