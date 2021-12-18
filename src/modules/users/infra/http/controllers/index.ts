import { AuthenticateUserController } from './AuthenticateUserController';
import { CreateUserController } from './CreateUserController';
import { SearchUsersController } from './SearchUsersController';
import { MakeUserAdminController } from './MakeUserAdminController';
import { RemoveUserAdminController } from './RemoveUserAdminController';
import { SendUpdatePasswordEmailController } from './SendUpdatePasswordEmailController';
import { SendVerificationEmailController } from './SendVerificationEmailController';
import { ShowMeController } from './ShowMeController';
import { ShowUserByIdController } from './ShowUserByIdController';
import { UpdateUserController } from './UpdateUserController';
import { UpdateUserPasswordController } from './UpdateUserPasswordController';
import { VerifyUserEmailController } from './VerifyUserEmailController';
import { SoftDeleteUserController } from './SoftDeleteUserController';

const createUserController = new CreateUserController();
const updateUserController = new UpdateUserController();
const showMeController = new ShowMeController();
const sendVerificationEmailController = new SendVerificationEmailController();
const verifyUserEmailController = new VerifyUserEmailController();
const authenticateUserController = new AuthenticateUserController();
const makeUserAdminController = new MakeUserAdminController();
const removeUserAdminController = new RemoveUserAdminController();
const sendUpdatePasswordEmailController = new SendUpdatePasswordEmailController();
const updateUserPasswordController = new UpdateUserPasswordController();
const showUserByIdController = new ShowUserByIdController();
const searchUsersController = new SearchUsersController();
const softDeleteUserController = new SoftDeleteUserController();

export {
  createUserController,
  showMeController,
  updateUserController,
  sendVerificationEmailController,
  verifyUserEmailController,
  authenticateUserController,
  makeUserAdminController,
  removeUserAdminController,
  sendUpdatePasswordEmailController,
  updateUserPasswordController,
  showUserByIdController,
  searchUsersController,
  softDeleteUserController,
};
