import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Log {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'char', length: '20' })
  ip: string;

  @Column({ type: 'varchar', length: '40' })
  agent: string;

  @Column({ type: 'varchar', length: '10' })
  method: string;

  @Column({ type: 'varchar', length: '40' })
  originalUrl: string;

  @CreateDateColumn()
  createdAt: Date;
}
