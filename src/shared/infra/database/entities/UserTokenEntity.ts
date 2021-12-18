import { UserTokenDTO } from '@modules/users/dtos/UserTokenDTO';
import { Column, CreateDateColumn, Entity, OneToOne, PrimaryColumn } from 'typeorm';
import { UserEntity } from './UserEntity';

@Entity('userTokens')
export class UserTokenEntity implements UserTokenDTO {
  @PrimaryColumn()
  readonly id: string;

  @Column({ unique: true })
  token: string;

  @Column()
  type: string;

  @Column({ unique: true })
  @OneToOne((type) => UserEntity) // eslint-disable-line
  userId: string;

  @Column()
  expiresIn: Date;

  @CreateDateColumn()
  createdAt: Date;
}
