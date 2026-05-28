interface ClassLessonTeacherRequest {
  id: number | null;
  slug: string;
  titleOverride: string;
  isDeleted: boolean = false;
  sections: SectionTeacherRequest[];
}

interface SectionTeacherRequest {
  id: number | null;
  sectionName: string;
  orderIndex: number;
  contents: ContentTeacherRequest[];
}

// Bạn có thể định nghĩa enum này nếu 'type' cố định các giá trị,
// hoặc đổi thành 'type: string;' nếu là chuỗi tự do.
type ContentType = 'VIDEO_MAIN' | 'TEXT_MAIN';

interface ContentTeacherRequest {
  id: number | null;
  contentName: string;
  description: string;

  // Dùng dấu '?' nếu các trường này có thể mang giá trị null/undefined
  // khi chuyển đổi từ backend sang frontend
  videoContentId?: number;
  textContent?: string;

  orderIndex: number;
  type: ContentType;
  materials: number[]; // Tương đương với List<Integer>
}
