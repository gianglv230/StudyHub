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

type Role = 'ADMIN' | 'TEACHER' | 'STUDENT';

interface AddUserAccountRequest {
  firstName: string;
  lastName: string;
  gender: boolean;
  dateOfBirth: Date;
  email: string;
  phone: string;
  hometown: string;
  address: string;
  avatar?: File;
  username: string;
  password: string;
  role: Role;
}

interface UpdateUserAccountRequest {
  firstName: string;
  lastName: string;
  gender: boolean;
  dateOfBirth: Date;
  email: string;
  phone: string;
  hometown: string;
  address: string;
  avatar?: File;
  id: number;
}

interface FilterAccountRequest {
  id?: number | null;
  fullname?: string | null;
  username?: string | null;
  status?: string | null;
  email?: string | null;
  phone?: string | null;
  role?: Role;
}
