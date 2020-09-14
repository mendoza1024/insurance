import { Policy } from "src/models/Policy";
import { BaseResponse } from "./CommonHttpType";

export class PolicyResponse extends BaseResponse {

  constructor(public policy: Policy) {
    super();
  }

}

export class ListPoliciesResponse extends BaseResponse {

  constructor(public policies: Array<Policy>) {
    super();
  }

}