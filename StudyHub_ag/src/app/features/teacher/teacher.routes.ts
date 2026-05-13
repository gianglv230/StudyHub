import { Routes } from '@angular/router';
import { LayoutTeacher } from './layout-teacher/layout-teacher';
import { HomeTeacher } from './pages/home-teacher/home-teacher';
import { ROLE } from '../../../utils/const/role.const';
import { getTitle } from '../../../utils/title.utils';
import { TEACHER_PAGE } from '../../../utils/const/page-name.const';
import { LessonManagement } from './pages/lesson-management/lesson-management';
import { TeacherAttendance } from './pages/teacher-attendance/teacher-attendance';
import { TeacherResourceManagement } from './pages/teacher-resource-management/teacher-resource-management';

export const TEACHER_ROUTES: Routes = [
  {
    path: '',
    component: LayoutTeacher,
    children: [
      {
        path: '',
        redirectTo: 'trang-chu',
        pathMatch: 'full',
      },
      {
        path: 'trang-chu',
        component: HomeTeacher,
        title: getTitle(TEACHER_PAGE.HOME, ROLE.TEACHER),
      },
      {
        path: 'lop-hoc/:class-slug/quan-ly-bai-hoc',
        component: LessonManagement,
        title: getTitle(TEACHER_PAGE.LESSON_MANAGEMENT, ROLE.TEACHER),
      },
      {
        path: 'lop-hoc/:class-slug/thong-tin-diem-danh',
        component: TeacherAttendance,
        title: getTitle(TEACHER_PAGE.ATTENDANCE, ROLE.TEACHER),
      },
      {
        path: 'quan-ly-tai-nguyen',
        component: TeacherResourceManagement,
        title: getTitle(TEACHER_PAGE.RESOURCE_MANAGEMENT, ROLE.TEACHER),
      },
      //   {
      //     path: 'thong-tin-ca-nhan',
      //     component: StudentAccountManagement,
      //     title: getTitle(STUDENT_PAGE.STUDENT_ACCOUNT_MANAGEMENT, ROLE.STUDENT),
      //   },
      //   {
      //     path: 'thanh-toan-hoc-phi',
      //     component: StudentInvoice,
      //     title: getTitle(STUDENT_PAGE.STUDENT_INVOICE, ROLE.STUDENT)
      //   },
      //   {
      //     path: 'lop-hoc/:class-slug',
      //     component: StudentClassDetail,
      //     title: getTitle(STUDENT_PAGE.STUDENT_CLASS_DETAIL, ROLE.STUDENT)
      //   },
      //   {
      //     path: 'lop-hoc/:class-slug/thong-tin-diem-danh',
      //     component: StudentAttendance,
      //     title: getTitle(STUDENT_PAGE.ATTENDANCE, ROLE.STUDENT)
      //   },
      //   {
      //     path: 'lop-hoc/:class-slug/:lesson-slug',
      //     component: StudentLessonDetail,
      //     title: getTitle(STUDENT_PAGE.LESSON, ROLE.STUDENT)
      //   }
    ],
  },
];
