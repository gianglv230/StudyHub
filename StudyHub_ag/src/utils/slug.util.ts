export function toSlug(input: string): string {
  return input
    .toLowerCase()                     // Chuyển hết thành chữ thường trước
    .replace(/đ/g, 'd')                // Lúc này chỉ cần đổi đ thành d
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}