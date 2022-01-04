export interface UserToHimself {
  id: string;
  fullName: string;
  email: string;
  username: string;
  isAdmin: boolean;
  isEmailVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}
