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
