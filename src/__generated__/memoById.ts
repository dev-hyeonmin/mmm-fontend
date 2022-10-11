/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { MemoInput } from "./globalTypes";

// ====================================================
// GraphQL query operation: memoById
// ====================================================

export interface memoById_memoById_memo_tags_tag {
  __typename: "Tags";
  id: number;
  name: string;
}

export interface memoById_memoById_memo_tags {
  __typename: "MemoTags";
  tag: memoById_memoById_memo_tags_tag;
}

export interface memoById_memoById_memo {
  __typename: "Memo";
  id: number;
  content: string;
  color: string | null;
  updateAt: any;
  tags: memoById_memoById_memo_tags[] | null;
}

export interface memoById_memoById {
  __typename: "MemoOutput";
  ok: boolean;
  error: string | null;
  memo: memoById_memoById_memo | null;
}

export interface memoById {
  memoById: memoById_memoById;
}

export interface memoByIdVariables {
  memoInput: MemoInput;
}
