import { Entity, Column, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { BaseModel } from './BaseModel';
import { Insurable } from './Insurable';


@Entity()
export class ActionHistory extends BaseModel {
  /*
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  status: PolicyStatus;

  @Column()
  type: PolicyType;

  @Column()
  coverage: CoverageType;

  @Column()
  issuedDate: Date;

  @Column()
  startDate: Date;

  @Column()
  endDate: Date;

  @ManyToMany(type => Insurable, insurable => insurable.policies)
  insurables: Insurable[];
*/
}
