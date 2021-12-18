import { ArticleDTO } from '@modules/articles/dtos/ArticleDTO';
import { CategoryEntity } from '@shared/infra/database/entities/CategoryEntity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryColumn,
  RelationId,
  UpdateDateColumn,
} from 'typeorm';
import { UserEntity } from './UserEntity';

@Entity('articles')
export class ArticleEntity implements ArticleDTO {
  @PrimaryColumn()
  id?: string;

  @Column({ unique: true })
  title: string;

  @Column()
  text: string;

  @Column({ unique: true })
  slug: string;

  @Column({ default: false })
  isPublic: boolean;

  @Column()
  userId: string;

  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: 'userId', referencedColumnName: 'id' })
  user: UserEntity;

  @RelationId('categories')
  categoriesId: string[];

  @ManyToMany(() => CategoryEntity)
  @JoinTable({
    name: 'articleCategories',
    joinColumn: { name: 'articleId' },
    inverseJoinColumn: { name: 'categoryId' },
  })
  categories: CategoryEntity[];

  @Column({ type: 'varchar', nullable: true, default: null })
  thumbnail: string | null;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date | null;
}
