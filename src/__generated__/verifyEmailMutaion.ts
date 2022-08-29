/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { VerifyEmailInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: verifyEmailMutaion
// ====================================================

export interface verifyEmailMutaion_verifyEmail {
  __typename: "VerifyEmailOutput";
  ok: boolean;
  error: string | null;
}

export interface verifyEmailMutaion {
  verifyEmail: verifyEmailMutaion_verifyEmail;
}

export interface verifyEmailMutaionVariables {
  verifyEmailInput: VerifyEmailInput;
}
