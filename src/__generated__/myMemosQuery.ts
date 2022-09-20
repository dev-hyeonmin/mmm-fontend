/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { MyMemosInput } from "./globalTypes";

// ====================================================
// GraphQL query operation: myMemosQuery
// ====================================================

export interface myMemosQuery_myMemos_groups_memos {
  __typename: "Memo";
  id: number;
  content: string;
  color: string | null;
}

export interface myMemosQuery_myMemos_groups_members_user {
  __typename: "User";
  name: string;
  email: string;
}

export interface myMemosQuery_myMemos_groups_members {
  __typename: "MemoGroupMembers";
  user: myMemosQuery_myMemos_groups_members_user;
}

export interface myMemosQuery_myMemos_groups {
  __typename: "MemoGroup";
  id: number;
  title: string;
  memos: myMemosQuery_myMemos_groups_memos[] | null;
  members: myMemosQuery_myMemos_groups_members[] | null;
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

export interface myMemosQueryVariables {
  myMemosInput: MyMemosInput;
}
