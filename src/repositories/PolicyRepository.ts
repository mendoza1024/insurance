import { Policy } from "src/models/Policy";
import { EntityRepository, Repository } from "typeorm";

@EntityRepository(Policy)
export class PolicyRepository extends Repository<Policy> {}