import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryColumn,
} from 'typeorm';
import { Message } from './message.entity';
import { UserRoom } from './user_room.entity';

@Entity()
export class Room {
  @PrimaryColumn({ type: 'varchar', length: 30 })
  id: string;

  @Column({ type: 'varchar', length: 20 })
  title: string;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  createdAt: Date;

  @Column({
    type: 'timestamp',
    nullable: true,
  })
  deletedAt: Date;

  @OneToMany(() => UserRoom, (ur) => ur.rid)
  user_rooms: UserRoom[];

  @OneToMany(() => Message, (message) => message.user)
  messages: Message[];
}
