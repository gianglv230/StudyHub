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
import { StudentAccountManagement } from './pages/student-account-management/student-account-management';
import { AdminClassOfCourse } from './pages/admin-class-of-course/admin-class-of-course';
import { TeacherResourceManagement } from '../teacher/pages/teacher-resource-management/teacher-resource-management';
import { TeacherAttendance } from '../teacher/pages/teacher-attendance/teacher-attendance';

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
        path: 'quan-ly-hoc-vien/bieu-mau',
        component: StudentAccountManagement,
        title: getTitle(ADMIN_PAGE.STUDENT_MANAGEMENT, ROLE.ADMIN),
      },
      {
        path: 'quan-ly-hoc-vien/bieu-mau/:id',
        component: StudentAccountManagement,
        title: getTitle(ADMIN_PAGE.STUDENT_MANAGEMENT, ROLE.ADMIN),
      },
      {
        path: 'quan-ly-giao-vien',
        component: StudentManagement,
        title: getTitle(ADMIN_PAGE.TEACHER_MANAGEMENT, ROLE.ADMIN),
      },
      {
        path: 'quan-ly-giao-vien/bieu-mau',
        component: StudentAccountManagement,
        title: getTitle(ADMIN_PAGE.TEACHER_MANAGEMENT, ROLE.ADMIN),
      },
      {
        path: 'quan-ly-giao-vien/bieu-mau/:id',
        component: StudentAccountManagement,
        title: getTitle(ADMIN_PAGE.TEACHER_MANAGEMENT, ROLE.ADMIN),
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
        path: 'quan-ly-khoa-hoc/bieu-mau/:course-slug',
        component: CourseForm,
        title: getTitle(ADMIN_PAGE.COURSE_FORM, ROLE.ADMIN),
      },
      {
        path: 'quan-ly-khoa-hoc/:course-slug',
        component: AdminClassOfCourse,
        title: getTitle(ADMIN_PAGE.COURSE_MANAGEMENT, ROLE.ADMIN),
      },
      {
        path: 'quan-ly-lop-hoc',
        component: ClassManagement,
        title: getTitle(ADMIN_PAGE.CLASS_MANAGEMENT, ROLE.ADMIN),
      },
      {
        path: 'quan-ly-lop-hoc/bieu-mau/:course-slug',
        component: ClassForm,
        title: getTitle(ADMIN_PAGE.CLASS_FORM, ROLE.ADMIN),
      },
      {
        path: 'quan-ly-lop-hoc/bieu-mau/:course-slug/:class-slug',
        component: ClassForm,
        title: getTitle(ADMIN_PAGE.CLASS_FORM, ROLE.ADMIN),
      },
      {
        path: 'quan-ly-lop-hoc/:class-slug/chi-tiet',
        component: ClassDetailManagement,
        title: getTitle(ADMIN_PAGE.CLASS_DETAIL_MANAGEMENT, ROLE.ADMIN),
      },
      {
        path: 'lop-hoc/:class-slug/thong-tin-diem-danh',
        component: TeacherAttendance,
        title: getTitle(ADMIN_PAGE.ATTENDANCE, ROLE.TEACHER),
      },
      {
        path: 'thong-tin-ca-nhan',
        component: AdminAccountManagement,
        title: getTitle(ADMIN_PAGE.ADMIN_ACCOUNT_MANAGEMENT, ROLE.ADMIN),
      },
      {
        path: 'quan-ly-tai-nguyen',
        component: TeacherResourceManagement,
        title: getTitle(ADMIN_PAGE.RESOURCE_MANAGEMENT, ROLE.ADMIN),
      },
    ],
  },
];
