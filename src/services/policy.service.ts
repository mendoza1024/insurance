import { Injectable } from '@nestjs/common';
import PolicyConfig, { Policy, PolicyStatus, PolicyType } from 'src/models/Policy';

import { PolicyRepository } from 'src/repositories/PolicyRepository';
import { ClientRepository } from 'src/repositories/ClientRepository';
import { Client } from 'src/models/Client';
import { Insurable } from 'src/models/Insurable';
import { InsurableRepository } from 'src/repositories/InsurableRepository';
import { PolicyRequest, EndorsePolicyRequest, PayPolicyRequest, CancelPolicyRequest } from 'src/rest/PolicyRequest';
import { ValidationHelper } from 'src/helpers/validation.helper';

@Injectable()
export class PolicyService {

  constructor(private validationHelper:ValidationHelper, private policyRepository: PolicyRepository, private clientRepository: ClientRepository, private insurableRepository: InsurableRepository) {}

  /**
   * TODO Add filters as needed.
   * @param policy 
   */
  async getPolicies(policy: Policy): Promise<Policy[]> {
    return await this.policyRepository.find();
  }

  /**
   * Return a Policy given a Id.
   * @param id 
   */
  async getPolicy(id: number): Promise<Policy> {
    if(!id) {
      throw new Error(`Invalid ${id} `); 
    }
    return await this.policyRepository.findOne(id);
  }

  async payPolicy(policyId: number, req:PayPolicyRequest):  Promise<Policy> {
    const now = new Date();
    if(!req.startDate) {
      req.startDate = now;
    } 
    const policy = await this.getPolicy(policyId); 

    const error = this.validationHelper.validatePayPolicy(policy);
    if(error) {
      throw new Error(error);
    }
    
    policy.issuedDate = now;
    policy.startDate = req.startDate;
    policy.status = PolicyStatus.Active;
    const endDate = new Date(now);
    endDate.setMonth( endDate.getMonth() + PolicyConfig.EST.duration );

    policy.endDate = endDate;
    
    return await this.policyRepository.save(policy);

  }
  async cancelPolicy(policyId: number, req:CancelPolicyRequest):  Promise<Policy> {
    if(!req.endDate) {
      req.endDate = new Date();
    }
    const policy = await this.getPolicy(policyId); 

    const error = this.validationHelper.validateCancelation(policy);
    if(error) {
      throw new Error(error);
    }

    policy.endDate = req.endDate;
    policy.status = PolicyStatus.Cancelled;
    
    return await this.policyRepository.save(policy);    
  }
  
  endorsePolicy(policy: EndorsePolicyRequest): Promise<Policy>  {
    throw new Error("Method not implemented.");
  }

  
  async createPolicy(clientId:number, req:PolicyRequest ): Promise<Policy> {
    const error = await this.validationHelper.validateCreatePolicy(clientId, req);
    if(error) {
      throw new Error(error);
    }

    const policy = new Policy();
    policy.coverage = req.policy.coverage;
    policy.type = req.policy.type;
    policy.createdDate = new Date();
    policy.lastModifiedDate = new Date();
    policy.createdByID = 1;
    policy.lastModifiedbyID = 1;
    policy.issuedDate = null;
    policy.status = PolicyStatus.Inactive;
    
    const result:Policy = await this.policyRepository.save(policy);

    const insurable:Insurable = await this.insurableRepository.findOne(req.insurableId, { relations: ["policies"]});
    insurable.policies.push(policy);
    await this.insurableRepository.save(insurable);

    console.info('+ createPolicy ', policy);
    return result;
  }


}
