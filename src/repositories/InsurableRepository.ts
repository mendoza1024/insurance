import { EntityRepository, Repository } from "typeorm";
import { Insurable } from "src/models/Insurable";

@EntityRepository(Insurable)
export class InsurableRepository extends Repository<Insurable> {}