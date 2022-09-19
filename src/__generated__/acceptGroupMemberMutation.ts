/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { AcceptGroupMemberInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: acceptGroupMemberMutation
// ====================================================

export interface acceptGroupMemberMutation_acceptGroupMember {
  __typename: "AcceptGroupMemberOutput";
  ok: boolean;
  error: string | null;
}

export interface acceptGroupMemberMutation {
  acceptGroupMember: acceptGroupMemberMutation_acceptGroupMember;
}

export interface acceptGroupMemberMutationVariables {
  acceptGroupMemberInput: AcceptGroupMemberInput;
}
