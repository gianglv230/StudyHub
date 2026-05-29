interface ContentLiteResponse {
  contentId: number;
  contentName: string;
  orderIndex: number;
}

interface SectionResponse {
  sectionName: string;
  orderIndex: number;
  contents: ContentLiteResponse[];
}

interface LessonSectionResponse {
    classclassLessonName: string;
    sections: SectionResponse[]
}


interface ClassLessonTeacherResponse {
    id: number;
    slug: string;
    titleOverride: string | null; // Cho phép null nếu trường này không bắt buộc
    createdAt: string; // ISO string (e.g., "2026-05-28T15:30:00Z")
    updatedAt: string;
    sections: SectionTeacherResponse[];
}

interface SectionTeacherResponse {
    id: number;
    sectionName: string;
    description: string | null;

    videoContent: ChildrenResourceResponse | null; // Có thể null nếu type không phải là video
    textContent: string | null;                  // Có thể null nếu type không phải là văn bản
    orderIndex: number;
    type: ContentType; // Bạn có thể đổi thành kiểu Union nếu có các loại cố định (e.g., 'VIDEO' | 'TEXT')
    materials: ChildrenResourceResponse[];
}

// interface ContentTeacherResponse {
//     id: number;
//     contentName: string;
//     description: string | null;
//     videoContent: ResourceTeacherResponse | null; // Có thể null nếu type không phải là video
//     textContent: string | null;                  // Có thể null nếu type không phải là văn bản
//     orderIndex: number;
//     type: string; // Bạn có thể đổi thành kiểu Union nếu có các loại cố định (e.g., 'VIDEO' | 'TEXT')
//     materials: MaterialResponse[];
// }

// interface MaterialResponse {
//     id: number;
//     resource: ResourceTeacherResponse;
// }

// interface ResourceTeacherResponse {
//     id: number;
//     resourceName: string;
//     url: string;
//     path: string;
//     resourceType: string;
//     createdAt: string;
//     updatedAt: string;
// }
