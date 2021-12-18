import cron from 'node-cron';
import { container } from 'tsyringe';
import { DeleteAllArticlesUseCase } from '../useCases/DeleteAllArticlesUseCase';

cron.schedule('0 0 2 * * *', async () => {
  try {
    const deleteArticles = container.resolve(DeleteAllArticlesUseCase);

    await deleteArticles.execute();

    console.log('Schedule to delete articles executed successfully');
  } catch (error) {
    console.log(error);
  }
});
