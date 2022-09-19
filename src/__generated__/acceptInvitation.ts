/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL subscription operation: acceptInvitation
// ====================================================

export interface acceptInvitation_acceptInvitation_invitation {
  __typename: "MemoGroupMembers";
  groupId: number;
  userId: number;
  accept: boolean;
}

export interface acceptInvitation_acceptInvitation {
  __typename: "AcceptInvitationOutput";
  invitation: acceptInvitation_acceptInvitation_invitation;
}

export interface acceptInvitation {
  acceptInvitation: acceptInvitation_acceptInvitation;
}
