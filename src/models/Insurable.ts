import { Entity, Column, ManyToMany, ManyToOne, JoinTable, PrimaryGeneratedColumn } from 'typeorm';
import { BaseModel } from './BaseModel';
import { Policy } from './Policy';
import { Client } from './Client';

export enum InsurableType {
  Automobile='Automobile',
}

@Entity()
export class Insurable extends BaseModel {
  
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  type: InsurableType;

  @ManyToMany(type => Policy, policy => policy.insurable)
  @JoinTable()
  policies?: Policy[];

  @ManyToOne(type => Client, client => client.insurables)
  client?: Client;

}
