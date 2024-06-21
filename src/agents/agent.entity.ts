import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from 'typeorm';

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

  @CreateDateColumn()
  registrationDate: Date;

  @Column()
  canMakeCalls: boolean;

  @Column({ nullable: true })
  photo: string;
}
