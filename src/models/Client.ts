import { Entity, Column, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { BaseModel } from './BaseModel';
import { Insurable } from './Insurable';

export enum PolicyStatus {
  Inactive,
  Active,
  Cancelled,
}

@Entity()
export class Client extends BaseModel {
  
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ default: true })
  status: boolean;

  @OneToMany(type => Insurable, insurable => insurable.client)
  insurables: Insurable[];

}
