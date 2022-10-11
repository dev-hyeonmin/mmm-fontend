/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: MemoParts
// ====================================================

export interface MemoParts_tags_tag {
  __typename: "Tags";
  id: number;
  name: string;
}

export interface MemoParts_tags {
  __typename: "MemoTags";
  tag: MemoParts_tags_tag;
}

export interface MemoParts {
  __typename: "Memo";
  id: number;
  content: string;
  color: string | null;
  updateAt: any;
  tags: MemoParts_tags[] | null;
}
