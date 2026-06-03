interface UserAccountBasicResponse {
  id: number;
  username: string;
  firstName: string;
  lastName: string;
  gender: boolean;
  dateOfBirth: Date;
  email: string;
  phone: string;
  hometown: string;
  address: string;
  avatar: string;
  role: string;
  startDate: string;
  endDate: string;
  createdAt: string;
  createdBy: string;
  updateAt: string;
  updatedBy: string;
}

interface AdminUserAccountBasicResponse {
  id: number;
  username: string;
  firstName: string;
  lastName: string;
  gender: boolean;
  dateOfBirth: Date;
  email: string;
  phone: string;
  hometown: string;
  address: string;
  avatar: string;
  role: string;
  status: string;
  createdBy: string;
  updatedBy: string;
}