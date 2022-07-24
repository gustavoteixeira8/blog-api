import { Article } from '../entities/Article';
import { ArticleDetailsDTO } from '../dtos/ArticleDetailsDTO';
import { ArticleDTO } from '../dtos/ArticleDTO';
import { UserMapper } from '@modules/users/mappers/UserMapper';
import { CategoryMapper } from '@modules/categories/mappers/CategoryMapper';
import { ArticleWithRelationsDTO } from '../dtos/ArticleWithRelationsDTO';
import { uploadConfig } from '@config/upload';

export class ArticleMapper {
  public static toPersistence(article: Article): ArticleDTO {
    return {
      id: article.id.value,
      title: article.title.value,
      text: article.text.value,
      slug: article.slug.value,
      isPublic: article.isPublic,
      thumbnail: !article.thumbnail ? null : article.thumbnail.value,
      userId: article.userId.value,
      categoriesId: article.categoriesId.map((id) => id.value),
      createdAt: article.createdAt,
      updatedAt: article.updatedAt,
      deletedAt: article.deletedAt,
    };
  }

  public static toDomain(article: ArticleDTO): Article {
    const newArticle = Article.create({
      id: article.id,
      title: article.title,
      text: article.text,
      isPublic: article.isPublic,
      slug: article.slug,
      thumbnail: article.thumbnail,
      userId: article.userId,
      categoriesId: article.categoriesId,
      createdAt: article.createdAt,
      updatedAt: article.updatedAt,
      deletedAt: article.deletedAt,
    });

    if (newArticle instanceof Error) {
      return {} as Article;
    }

    return newArticle;
  }

  public static toDetails({
    article,
    user,
    categories,
  }: ArticleWithRelationsDTO): ArticleDetailsDTO {
    const thumbnailLocation = uploadConfig.storageProvider.storageLocation;

    return {
      id: article.id.value,
      title: article.title.value,
      text: article.text.value,
      slug: article.slug.value,
      isPublic: article.isPublic,
      thumbnail: !article.thumbnail ? null : `${thumbnailLocation}/${article.thumbnail.value}`,
      createdAt: article.createdAt,
      updatedAt: article.updatedAt,
      deletedAt: article.deletedAt,
      user: UserMapper.toDetails(user),
      categories: categories.map(CategoryMapper.toDetails),
    };
  }
}
