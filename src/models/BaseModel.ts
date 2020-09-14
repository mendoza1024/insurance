import { Entity, Column, BaseEntity, BeforeUpdate, BeforeInsert } from 'typeorm';

@Entity()
export abstract class BaseModel extends BaseEntity {

  @Column()
  createdByID:number;

  @Column()
  createdDate:Date;

  @Column()
  lastModifiedbyID:number;

  @Column()
  lastModifiedDate:Date;


  @BeforeInsert()
  beforeInsert() {
    console.log("beforeInsert");

    this.createdByID = 1;
    this.createdDate = new Date();
  }

  @BeforeUpdate()
  beforeUpdate() {
    console.log("beforeUpdate");
    this.lastModifiedbyID = 1;
    this.lastModifiedDate = new Date();
  }
}
