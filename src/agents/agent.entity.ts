import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Agent {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  phoneNumber: string;

  @Column()
  email: string;

  @Column()
  destinationGroup: string;

  @Column()
  registrationDate: Date;

  @Column()
  callPermission: boolean;

  @Column()
  photo: string;
}
