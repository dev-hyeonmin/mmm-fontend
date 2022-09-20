/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { DeleteGroupMemberInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: deleteGroupMember
// ====================================================

export interface deleteGroupMember_deleteGroupMember {
  __typename: "DeleteGroupMemberOutput";
  ok: boolean;
  error: string | null;
}

export interface deleteGroupMember {
  deleteGroupMember: deleteGroupMember_deleteGroupMember;
}

export interface deleteGroupMemberVariables {
  deleteGroupMemberInput: DeleteGroupMemberInput;
}
