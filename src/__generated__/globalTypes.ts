/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

export interface CreateAccountInput {
  name: string;
  email: string;
  password: string;
}

export interface CreateMemoGroupInput {
  title: string;
}

export interface CreateMemoInput {
  content: string;
  groupId: number;
}

export interface DeleteMemoGroupInput {
  id: number;
}

export interface DeleteMemoInput {
  id: number;
}

export interface EditMemoGroupInput {
  id: number;
  title: string;
}

export interface EditMemoInput {
  id?: number | null;
  content?: string | null;
  orderby?: number | null;
  color?: string | null;
  groupId?: number | null;
}

export interface InviteGroupMemberInput {
  groupId: number;
  inviteEmail: string;
}

export interface LoginInput {
  email: string;
  password: string;
}

export interface MemoType {
  id: number;
  content: string;
  orderby: number;
  color?: string | null;
}

export interface MyMemosInput {
  keyword?: string | null;
}

export interface SortMemoInput {
  memos?: MemoType[] | null;
}

export interface VerifyEmailInput {
  code: string;
}

//==============================================================
// END Enums and Input Objects
//==============================================================
