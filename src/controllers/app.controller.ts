import { Controller, Get, Post, Put, Body, Param } from '@nestjs/common';
import { PolicyService } from 'src/services/policy.service';
import { Policy } from 'src/models/Policy';
import { PolicyResponse, ListPoliciesResponse } from 'src/rest/PolicyResponse';
import { PolicyRequest, EndorsePolicyRequest, PayPolicyRequest, CancelPolicyRequest } from 'src/rest/PolicyRequest';
import { BaseResponse } from 'src/rest/CommonHttpType';

@Controller('clients/:clientId/policy')
export class AppController {
  constructor(private readonly policyService: PolicyService) {}

  @Get()
  async getPolicies(): Promise<ListPoliciesResponse> {
    const policies: Array<Policy> = await this.policyService.getPolicies(new Policy());
    const response: ListPoliciesResponse = new ListPoliciesResponse(policies);
    return response;
  }

  @Get(':id')
  async getPolicy(@Param('id') id: number): Promise<PolicyResponse> {
    console.log(id);
    const policy: Policy = await this.policyService.getPolicy(id);
    const response: PolicyResponse = new PolicyResponse(policy);
    return response;
  }

  @Post()
  async createPolicy(
    @Param('clientId') clientId: number,
    @Body() req: PolicyRequest): Promise<BaseResponse> {
    const policy: Policy = await this.policyService.createPolicy(clientId, req);
    const response: PolicyResponse = new PolicyResponse(policy);
    return response;
  }

  @Post(':id/pay')
  async payPolicy(
    @Param('id') id: number,
    @Body() req: PayPolicyRequest,
  ): Promise<BaseResponse> {
    const policy: Policy = await this.policyService.payPolicy(id, req);
    const response: PolicyResponse = new PolicyResponse(policy);
    return response;
  }

  @Put(':id/endorse')
  async endorsePolicy (
    @Param('id') id: number,
    @Body() req: EndorsePolicyRequest,
  ): Promise<BaseResponse> {
    const policy: Policy = await this.policyService.endorsePolicy(req);
    const response: PolicyResponse = new PolicyResponse(policy);
    return response;
  }

  @Post(':id/cancel')
  async cancelPolicy (
    @Param('id') id: number,
    @Body() req: CancelPolicyRequest,
  ): Promise<BaseResponse> {
    const policy: Policy = await this.policyService.cancelPolicy(id, req);
    const response: PolicyResponse = new PolicyResponse(policy);
    return response;
  }  

}
