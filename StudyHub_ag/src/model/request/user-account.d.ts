interface ChangePasswordRequest {
    id?: number;
    oldPassword?: string;
    newPassword: string;
}

interface UpdateMyUserAccountRequest {
  firstName: string;
  lastName: string;
  gender: boolean;
  dateOfBirth: Date;
  email: string;
  phone: string;
  hometown: string;
  address: string;
  avatar?: string;
}