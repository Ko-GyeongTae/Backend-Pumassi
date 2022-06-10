import {
  CreateDateColumn,
  Entity,
  ManyToOne,
  JoinColumn,
  PrimaryColumn,
  Column,
} from 'typeorm';
import { Room } from './room.entity';
import { User } from './user.entity';

@Entity()
export class UserRoom {
  @PrimaryColumn({ type: 'varchar', length: 30 })
  uid: string;

  @PrimaryColumn({ type: 'varchar', length: 30 })
  rid: string;

  @ManyToOne(() => User, (user) => user.id)
  @JoinColumn({ name: 'uid' })
  user!: User;

  @ManyToOne(() => Room, (room) => room.id)
  @JoinColumn({ name: 'rid' })
  room!: Room;

  @CreateDateColumn()
  createdAt: Date;

  @Column({
    type: 'timestamp',
    nullable: true,
  })
  deletedAt: Date;
}
