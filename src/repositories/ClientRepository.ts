import { EntityRepository, Repository } from "typeorm";
import { Client } from "src/models/Client";

@EntityRepository(Client)
export class ClientRepository extends Repository<Client> {}