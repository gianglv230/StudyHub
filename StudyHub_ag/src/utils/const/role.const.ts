export const ROLE = {
  STUDENT: 'Học viên',
  TEACHER: 'Giáo viên',
  ADMIN: 'Quản lý',
};

export const ROLE_TEXT: Record<string, string> = {
  STUDENT: 'Học viên',
  TEACHER: 'Giáo viên',
  ADMIN: 'Quản lý',
};

function isRole(roleInput: string, role: string): boolean {
  return roleInput == role;
}

export function isStudent(roleInput: string): boolean {
  return isRole(roleInput, 'STUDENT');
}

export function isTeacher(roleInput: string): boolean {
  return isRole(roleInput, 'TEACHER');
}

export function isAdmin(roleInput: string): boolean {
  return isRole(roleInput, 'ADMIN');
}
