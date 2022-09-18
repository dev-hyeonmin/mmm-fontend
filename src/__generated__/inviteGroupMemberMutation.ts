/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { InviteGroupMemberInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: inviteGroupMemberMutation
// ====================================================

export interface inviteGroupMemberMutation_inviteGroupMember {
  __typename: "InviteGroupMemberOutput";
  ok: boolean;
  error: string | null;
}

export interface inviteGroupMemberMutation {
  inviteGroupMember: inviteGroupMemberMutation_inviteGroupMember;
}

export interface inviteGroupMemberMutationVariables {
  inviteGroupMemberInput: InviteGroupMemberInput;
}
