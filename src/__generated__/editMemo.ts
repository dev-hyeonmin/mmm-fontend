/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: editMemo
// ====================================================

export interface editMemo_tags_tag {
  __typename: "Tags";
  id: number;
  name: string;
}

export interface editMemo_tags {
  __typename: "MemoTags";
  tag: editMemo_tags_tag;
}

export interface editMemo {
  __typename: "Memo";
  tags: editMemo_tags[] | null;
}
