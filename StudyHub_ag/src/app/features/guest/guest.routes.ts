import { Routes } from '@angular/router';
import { HomeGuest } from './pages/home-guest/home-guest';
import { LayoutGuest } from './layout-guest/layout-guest';
import { getTitle } from '../../../utils/title.utils';
import { GUEST_PAGE } from '../../../utils/const/page-name.const';
import { AboutUs } from './pages/about-us/about-us';
import { Contact } from './pages/contact/contact';
import { CourseSearch } from './pages/course-search/course-search';
import { Courses } from './pages/courses/courses';
import { Classes } from './pages/classes/classes';
import { ClassesOfTeacher } from './pages/classes-of-teacher/classes-of-teacher';
import { CourseDetail } from './pages/course-detail/course-detail';
import { ClassDetail } from './pages/class-detail/class-detail';

export const GUEST_ROUTES: Routes = [
  {
    path: '',
    component: LayoutGuest,
    children: [
      {
        path: '',
        redirectTo: 'trang-chu',
        pathMatch: 'full',
      },
      {
        path: 'trang-chu',
        component: HomeGuest,
        title: getTitle(GUEST_PAGE.HOME),
      },
      {
        path: 'gioi-thieu-trung-tam',
        component: AboutUs,
        title: getTitle(GUEST_PAGE.ABOUT_US),
      },
      {
        path: 'lien-he',
        component: Contact,
        title: getTitle(GUEST_PAGE.CONTACT),
      },
      {
        path: 'tim-kiem',
        component: CourseSearch,
        title: getTitle(GUEST_PAGE.COURSE_SEARCH),
      },
      {
        path: 'khoa-hoc',
        component: Courses,
        title: getTitle(GUEST_PAGE.COURSES),
      },
      {
        path: 'lop-hoc',
        component: Classes,
        title: getTitle(GUEST_PAGE.CLASSES),
      },
      {
        path: 'danh-sach-lop-hoc-cua-giao-vien',
        component: ClassesOfTeacher,
        title: getTitle(GUEST_PAGE.CLASSES_OF_TEACHER),
      },
      {
        path: 'khoa-hoc/:slug',
        component: CourseDetail,
        title: getTitle(GUEST_PAGE.COURSES)
      },
      {
        path: 'lop-hoc/:slug',
        component: ClassDetail,
        title: getTitle(GUEST_PAGE.CLASSES)
      },
    ],
  },
];
