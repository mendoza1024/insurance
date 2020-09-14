import { Entity, Column, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { BaseModel } from './BaseModel';
import { Insurable } from './Insurable';

export enum PolicyStatus {
  Inactive = 'Inactive',
  Active = 'Active',
  Cancelled = 'Cancelled',
}

export enum PolicyType {
  EST = 'EST', // Estándar
  RCO = 'RCO', // Responsabilidad civil obligatoria
}

export enum CoverageType {
  RT = 'RT', 
  DM = 'DM',
  DT = 'DT',
  DTO = 'DTO', 
}

const PolicyConfig = {

  [PolicyType.EST]: {
    duration: 6,
    mutable: true,
    coverages: {
      [CoverageType.RT]: {
        mandatory: false,
        mutable: true,
        deductibles: [5, 10, 15],
        amounts: []
      },
      [CoverageType.DM]: {
        mandatory: false,
        mutable: true,
        deductibles: [3, 5, 10],
        amounts: []
      } ,
      [CoverageType.DT]: {
        mandatory: true,
        mutable: false,
        deductibles: [],
        amounts: [2000000, 3000000, 4000000]
      } ,
      [CoverageType.DTO]: {
        mandatory: true,
        mutable: false,
        deductibles: [],
        amounts: [200000]
      }                  
    } 
  },
  [PolicyType.RCO] : {
    duration: 12,
    mutable: false,
    coverages: null
  }
};
export default PolicyConfig;

@Entity()
export class Policy extends BaseModel {
  
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  status?: PolicyStatus = PolicyStatus.Inactive;

  @Column()
  type?: PolicyType;

  @Column()
  coverage: CoverageType;

  @Column({ nullable:true })
  issuedDate?: Date;

  @Column({ nullable:true })
  startDate?: Date;

  @Column({ nullable:true })
  endDate?: Date;

  @ManyToOne(type => Insurable, insurable => insurable.policies)
  insurable: Insurable;

}
