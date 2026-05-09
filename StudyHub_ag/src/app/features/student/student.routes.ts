import { Routes } from '@angular/router';
import { LayoutStudent } from './layout-student/layout-student';
import { getTitle } from '../../../utils/title.utils';
import { STUDENT_PAGE } from '../../../utils/const/page-name.const';
import { ROLE } from '../../../utils/const/role.const';

export const STUDENT_ROUTES: Routes = [
  {
    path: '',
    component: LayoutStudent,
    children: [
    //   {
    //     path: '',
    //     redirectTo: 'trang-chu',
    //     pathMatch: 'full',
    //   },
      {
        path: 'trang-chu',
        component: LayoutStudent,
        title: getTitle(STUDENT_PAGE.HOME, ROLE.STUDENT),
      },
    ],
  },
];
