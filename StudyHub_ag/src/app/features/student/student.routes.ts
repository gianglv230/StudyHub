import { Routes } from '@angular/router';
import { LayoutStudent } from './layout-student/layout-student';
import { getTitle } from '../../../utils/title.utils';
import { STUDENT_PAGE } from '../../../utils/const/page-name.const';
import { ROLE } from '../../../utils/const/role.const';
import { HomeStudent } from './pages/home-student/home-student';
import { StudentAccountManagement } from './pages/student-account-management/student-account-management';
import { StudentInvoice } from './pages/student-invoice/student-invoice';
import { StudentClassDetail } from './pages/student-class-detail/student-class-detail';
import { StudentAttendance } from './pages/student-attendance/student-attendance';
import { StudentLessonDetail } from './pages/student-lesson-detail/student-lesson-detail';

export const STUDENT_ROUTES: Routes = [
  {
    path: '',
    component: LayoutStudent,
    children: [
      {
        path: '',
        redirectTo: 'trang-chu',
        pathMatch: 'full',
      },
      {
        path: 'trang-chu',
        component: HomeStudent,
        title: getTitle(STUDENT_PAGE.HOME, ROLE.STUDENT),
      },
      {
        path: 'thong-tin-ca-nhan',
        component: StudentAccountManagement,
        title: getTitle(STUDENT_PAGE.STUDENT_ACCOUNT_MANAGEMENT, ROLE.STUDENT),
      },
      {
        path: 'thanh-toan-hoc-phi',
        component: StudentInvoice,
        title: getTitle(STUDENT_PAGE.STUDENT_INVOICE, ROLE.STUDENT)
      },
      {
        path: 'lop-hoc/:class-slug',
        component: StudentClassDetail,
        title: getTitle(STUDENT_PAGE.STUDENT_CLASS_DETAIL, ROLE.STUDENT)
      },
      {
        path: 'lop-hoc/:class-slug/thong-tin-diem-danh',
        component: StudentAttendance,
        title: getTitle(STUDENT_PAGE.ATTENDANCE, ROLE.STUDENT)
      },
      {
        path: 'lop-hoc/:class-slug/:lesson-slug',
        component: StudentLessonDetail,
        title: getTitle(STUDENT_PAGE.LESSON, ROLE.STUDENT)
      }
    ],
  },
];
