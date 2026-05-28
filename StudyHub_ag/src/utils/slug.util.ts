export function toSlug(input: string): string {
  return input
    .normalize('NFD') // tách dấu tiếng Việt
    .replace(/[\u0300-\u036f]/g, '') // xóa dấu
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '') // bỏ ký tự đặc biệt
    .replace(/\s+/g, '-') // khoảng trắng -> dấu -
    .replace(/-+/g, '-'); // nhiều dấu - liên tiếp -> 1
}