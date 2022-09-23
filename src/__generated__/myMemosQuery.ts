/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { MyMemosInput, UseType } from "./globalTypes";

// ====================================================
// GraphQL query operation: myMemosQuery
// ====================================================

export interface myMemosQuery_myMemos_groups_user {
  __typename: "User";
  id: number;
}

export interface myMemosQuery_myMemos_groups_memos {
  __typename: "Memo";
  id: number;
  content: string;
  color: string | null;
}

export interface myMemosQuery_myMemos_groups_members_user {
  __typename: "User";
  id: number;
  name: string;
  email: string;
  userImage: string | null;
}

export interface myMemosQuery_myMemos_groups_members {
  __typename: "MemoGroupMembers";
  useType: UseType;
  user: myMemosQuery_myMemos_groups_members_user;
}

export interface myMemosQuery_myMemos_groups {
  __typename: "MemoGroup";
  id: number;
  title: string;
  user: myMemosQuery_myMemos_groups_user;
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
