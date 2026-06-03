export function generateSecurePassword(length = 12) {
  const charset =
    'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+~`|}{[]:;?><,./-=';
  let password = '';

  // Tạo một mảng các số ngẫu nhiên bảo mật
  const randomValues = new Uint32Array(length);
  crypto.getRandomValues(randomValues);

  for (let i = 0; i < length; i++) {
    // Lấy số ngẫu nhiên chia lấy dư cho độ dài của chuỗi ký tự
    password += charset[randomValues[i] % charset.length];
  }

  return password;
}

// console?.log(generateSecurePassword(16));
// Kết quả dạng: "p$W8mQ_z[4vR!aK9"
