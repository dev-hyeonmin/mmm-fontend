/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

export enum UseType {
  Editor = "Editor",
  Viewer = "Viewer",
}

export interface AcceptGroupMemberInput {
  userId: number;
  groupId: number;
  accept: boolean;
}

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

export interface DeleteGroupMemberInput {
  userId: number;
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

export interface EditProfileInput {
  name?: string | null;
  email?: string | null;
  password?: string | null;
}

export interface InviteGroupMemberInput {
  groupId: number;
  useType: UseType;
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
