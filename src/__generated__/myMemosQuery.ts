/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: myMemosQuery
// ====================================================

export interface myMemosQuery_myMemos_groups_memos {
  __typename: "Memo";
  id: number;
  content: string;
}

export interface myMemosQuery_myMemos_groups {
  __typename: "MemoGroup";
  id: number;
  title: string;
  memos: myMemosQuery_myMemos_groups_memos[] | null;
}

export interface myMemosQuery_myMemos {
  __typename: "MyMemosOutput";
  ok: boolean;
  error: string | null;
  groups: myMemosQuery_myMemos_groups[] | null;
}

export interface myMemosQuery {
  myMemos: myMemosQuery_myMemos;
}
