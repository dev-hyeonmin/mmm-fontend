/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: myInvitationQuery
// ====================================================

export interface myInvitationQuery_myInvitation_invitations_group_user {
  __typename: "User";
  name: string;
}

export interface myInvitationQuery_myInvitation_invitations_group {
  __typename: "MemoGroup";
  title: string;
  user: myInvitationQuery_myInvitation_invitations_group_user;
}

export interface myInvitationQuery_myInvitation_invitations {
  __typename: "MemoGroupMembers";
  groupId: number;
  userId: number;
  group: myInvitationQuery_myInvitation_invitations_group;
}

export interface myInvitationQuery_myInvitation {
  __typename: "MyInvitationOutput";
  invitations: myInvitationQuery_myInvitation_invitations[] | null;
}

export interface myInvitationQuery {
  myInvitation: myInvitationQuery_myInvitation;
}
