import { BaseEntity } from 'typeorm';
import { Client } from './Client';
import { Insurable } from './Insurable';
import { Policy } from './Policy';


export default [Client, Insurable, Policy];
