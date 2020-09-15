import { Injectable } from '@nestjs/common';
import PolicyConfig, { Policy, PolicyStatus, PolicyType } from 'src/models/Policy';

import { PolicyRepository } from 'src/repositories/PolicyRepository';
import { ClientRepository } from 'src/repositories/ClientRepository';
import { Client } from 'src/models/Client';
import { Insurable } from 'src/models/Insurable';
import { InsurableRepository } from 'src/repositories/InsurableRepository';
import { PolicyRequest, EndorsePolicyRequest, PayPolicyRequest, CancelPolicyRequest } from 'src/rest/PolicyRequest';
import { BaseResponse } from 'src/rest/CommonHttpType';

@Injectable()
export class ValidationHelper {

  constructor(private policyRepository: PolicyRepository, private clientRepository: ClientRepository, private insurableRepository: InsurableRepository) {}

  validateCancelation(policy:Policy): string {
    if(!policy) {
      return 'Policy not found';
    }

    if (policy.status !== PolicyStatus.Active) {
      return 'Policy is not active';
    }

    return null;
  }

  async validateCreatePolicy(clientId: number, req: PolicyRequest): Promise<string> {

    const client = await this.clientRepository.findOne(clientId);
    
    if(!client) {
      return `ClientId ${clientId} was not found`; 
    }

    if(!req.insurableId) {
      return `No Insurable was not found`; 
    }

    const insurable:Insurable = await this.insurableRepository.findOne(req.insurableId, { relations: ["policies"]});
    if(!insurable) {
      return `InsurableId is not valid`;
    }

    return null;
  }

  validatePayPolicy(policy: Policy) {
    if(!policy) {
      return 'Policy not found';
    }

    if (policy.status !== PolicyStatus.Inactive) {
      return 'Policy is in invalid status for payment';
    }

    return null;
  }

}
