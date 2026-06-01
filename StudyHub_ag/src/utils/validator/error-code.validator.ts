export const ERROR_CODE = {
  INVALID_USERNAME: 'Tên đăng nhập gồm 8 đến 40 ký tự chữ hoặc số.',
  INVALID_PWD: 'Mật khẩu từ 8 đến 20 ký tự.',
};

export const ERROR_CODE_RESPONSE: Record<number, string> = {
  1005: 'Sai username hoặc mật khẩu',
  1039: 'Không thể mở lớp',
  1040: 'Không thể đóng lớp',
  1052: 'Sai mật khẩu',
  1053: 'Trùng slug'
};
