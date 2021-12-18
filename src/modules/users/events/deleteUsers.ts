import cron from 'node-cron';
import { container } from 'tsyringe';
import { DeleteAllUsersUseCase } from '../useCases/DeleteAllUsersUseCase';

cron.schedule('59 59 23 * * *', async () => {
  try {
    const deleteUsersUseCase = container.resolve(DeleteAllUsersUseCase);

    await deleteUsersUseCase.execute();

    console.log('Schedule to delete users executed successfully');
  } catch (error) {
    console.log(error);
  }
});
