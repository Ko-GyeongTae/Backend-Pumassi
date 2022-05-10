import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Post } from './post.entity';

@Entity()
export class Asset {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar' })
  key: string;

  @Column({ type: 'varchar' })
  location: string;

  @ManyToOne(() => Post, (post) => post.assets)
  post: Post;

  @CreateDateColumn()
  createdAt: Date;

  @Column({ type: 'timestamp' })
  deletedAt: Date;
}
