import { AuthenticateUserController } from './AuthenticateUserController';
import { CreateUserController } from './CreateUserController';
import { SearchUsersController } from './SearchUsersController';
import { MakeUserAdminController } from './MakeUserAdminController';
import { RemoveUserAdminController } from './RemoveUserAdminController';
import { SendUpdatePasswordEmailController } from './SendUpdatePasswordEmailController';
import { SendVerificationEmailController } from './SendVerificationEmailController';
import { ShowUserByUsernameController } from './ShowUserByUsernameController';
import { UpdateUserController } from './UpdateUserController';
import { UpdateUserPasswordController } from './UpdateUserPasswordController';
import { VerifyUserEmailController } from './VerifyUserEmailController';
import { SoftDeleteUserController } from './SoftDeleteUserController';
import { SearchArticlesForUserCreatorController } from './SearchArticlesForUserCreatorController';

const createUserController = new CreateUserController();
const updateUserController = new UpdateUserController();
const sendVerificationEmailController = new SendVerificationEmailController();
const verifyUserEmailController = new VerifyUserEmailController();
const authenticateUserController = new AuthenticateUserController();
const makeUserAdminController = new MakeUserAdminController();
const removeUserAdminController = new RemoveUserAdminController();
const sendUpdatePasswordEmailController = new SendUpdatePasswordEmailController();
const updateUserPasswordController = new UpdateUserPasswordController();
const showUserByUsernameController = new ShowUserByUsernameController();
const searchUsersController = new SearchUsersController();
const softDeleteUserController = new SoftDeleteUserController();
const searchArticlesForUserCreatorController = new SearchArticlesForUserCreatorController();

export {
  createUserController,
  updateUserController,
  sendVerificationEmailController,
  verifyUserEmailController,
  authenticateUserController,
  makeUserAdminController,
  removeUserAdminController,
  sendUpdatePasswordEmailController,
  updateUserPasswordController,
  showUserByUsernameController,
  searchUsersController,
  softDeleteUserController,
  searchArticlesForUserCreatorController,
};
