import { Routes } from '@angular/router';
import { ROLE } from '../../../utils/const/role.const';
import { getTitle } from '../../../utils/title.utils';
import { LayoutAdmin } from './layout-admin/layout-admin';
import { Dashboard } from './pages/dashboard/dashboard';
import { ADMIN_PAGE } from '../../../utils/const/page-name.const';
import { InvoiceManagement } from './pages/invoice-management/invoice-management';
import { StudentManagement } from './pages/student-management/student-management';
import { CourseManagement } from './pages/course-management/course-management';
import { ClassManagement } from './pages/class-management/class-management';
import { CourseForm } from './pages/course-form/course-form';
import { ClassForm } from './pages/class-form/class-form';
import { ClassDetailManagement } from './pages/class-detail-management/class-detail-management';
import { AdminAccountManagement } from './pages/admin-account-management/admin-account-management';

export const ADMIN_ROUTES: Routes = [
  {
    path: '',
    component: LayoutAdmin,
    children: [
      {
        path: '',
        redirectTo: 'trang-chu',
        pathMatch: 'full',
      },
      {
        path: 'trang-chu',
        component: Dashboard,
        title: getTitle(ADMIN_PAGE.DASHBOARD, ROLE.ADMIN),
      },
      {
        path: 'quan-ly-hoa-don',
        component: InvoiceManagement,
        title: getTitle(ADMIN_PAGE.INVOICE, ROLE.ADMIN),
      },
      {
        path: 'quan-ly-hoc-vien',
        component: StudentManagement,
        title: getTitle(ADMIN_PAGE.STUDENT_MANAGEMENT, ROLE.ADMIN),
      },
      {
        path: 'quan-ly-khoa-hoc',
        component: CourseManagement,
        title: getTitle(ADMIN_PAGE.COURSE_MANAGEMENT, ROLE.ADMIN),
      },
      {
        path: 'quan-ly-khoa-hoc/bieu-mau',
        component: CourseForm,
        title: getTitle(ADMIN_PAGE.COURSE_FORM, ROLE.ADMIN),
      },
      {
        path: 'quan-ly-lop-hoc',
        component: ClassManagement,
        title: getTitle(ADMIN_PAGE.CLASS_MANAGEMENT, ROLE.ADMIN),
      },
      {
        path: 'quan-ly-lop-hoc/bieu-mau',
        component: ClassForm,
        title: getTitle(ADMIN_PAGE.CLASS_FORM, ROLE.ADMIN),
      },
      {
        path: 'quan-ly-lop-hoc/:lop-hoc/chi-tiet',
        component: ClassDetailManagement,
        title: getTitle(ADMIN_PAGE.CLASS_DETAIL_MANAGEMENT, ROLE.ADMIN),
      },
      {
        path: 'thong-tin-ca-nhan',
        component: AdminAccountManagement,
        title: getTitle(ADMIN_PAGE.ADMIN_ACCOUNT_MANAGEMENT, ROLE.ADMIN),
      },
      // {
      //   path: 'lop-hoc/:class-slug/quan-ly-bai-hoc',
      //   component: LessonManagement,
      //   title: getTitle(TEACHER_PAGE.LESSON_MANAGEMENT, ROLE.TEACHER),
      // },
      // {
      //   path: 'lop-hoc/:class-slug/thong-tin-diem-danh',
      //   component: TeacherAttendance,
      //   title: getTitle(TEACHER_PAGE.ATTENDANCE, ROLE.TEACHER),
      // },
      // {
      //   path: 'quan-ly-tai-nguyen',
      //   component: TeacherResourceManagement,
      //   title: getTitle(TEACHER_PAGE.RESOURCE_MANAGEMENT, ROLE.TEACHER),
      // },
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
