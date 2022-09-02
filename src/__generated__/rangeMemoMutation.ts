/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { RangeMemoInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: rangeMemoMutation
// ====================================================

export interface rangeMemoMutation_rangeMemo {
  __typename: "RangeMemoOutput";
  ok: boolean;
  error: string | null;
}

export interface rangeMemoMutation {
  rangeMemo: rangeMemoMutation_rangeMemo;
}

export interface rangeMemoMutationVariables {
  rangeMemoInput: RangeMemoInput;
}
