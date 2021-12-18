import { UserDTO } from '@modules/users/dtos/UserDTO';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ArticleEntity } from './ArticleEntity';

@Entity('users')
export class UserEntity implements UserDTO {
  @PrimaryColumn()
  readonly id: string;

  @Column()
  fullName: string;

  @Column({ unique: true })
  email: string;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @Column()
  isAdmin: boolean;

  @OneToMany(() => ArticleEntity, (a) => a.user, { cascade: ['soft-remove', 'remove', 'recover'] })
  articles: ArticleEntity[];

  @Column()
  isEmailVerified: boolean;

  @CreateDateColumn({ default: new Date() })
  createdAt: Date;

  @UpdateDateColumn({ default: new Date() })
  updatedAt: Date;

  @DeleteDateColumn({ default: null })
  deletedAt: Date | null;
}
