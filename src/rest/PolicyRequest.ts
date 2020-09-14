import { PolicyType, CoverageType } from "src/models/Policy";

export class PolicyRequest {
  
  insurableId: number;
  policy: {
    type: PolicyType;

    coverage: CoverageType;
  }

}

export class CancelPolicyRequest {
  
  endDate?: Date;

}

export class PayPolicyRequest {
    
  startDate?: Date;

}

export class EndorsePolicyRequest {
  
  issuedDate?: Date;

  startDate: Date;

  endDate: Date;

}