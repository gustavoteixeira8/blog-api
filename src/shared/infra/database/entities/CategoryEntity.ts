import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { CategoryDTO } from '@modules/categories/dtos/CategoryDTO';
import { ArticleEntity } from './ArticleEntity';

@Entity({ name: 'categories' })
export class CategoryEntity implements CategoryDTO {
  @PrimaryColumn()
  readonly id?: string;

  @Column({ unique: true })
  name: string;

  @Column({ unique: true })
  slug: string;

  @ManyToMany(() => ArticleEntity)
  @JoinTable({
    name: 'articleCategories',
    joinColumn: { name: 'categoryId' },
    inverseJoinColumn: { name: 'articleId' },
  })
  articles: ArticleEntity[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
