import { Routes } from '@angular/router';
import { authGuard, roleGuard } from './guard/auth.guard';

export const routes: Routes = [
    {
        path: '',
        loadChildren: () =>
            import('./features/guest/guest.routes')
                .then(m => m.GUEST_ROUTES)
    },
    {
        path: 'hoc-vien',
        canActivate: [authGuard, roleGuard(['STUDENT'])], // Chỉ cho phép STUDENT
        loadChildren: () =>
            import('./features/student/student.routes')
                .then(m => m.STUDENT_ROUTES)
    },
    {
        path: 'giao-vien',
        canActivate: [authGuard, roleGuard(['TEACHER'])], // Chỉ cho phép TEACHER
        loadChildren: () =>
            import('./features/teacher/teacher.routes')
                .then(m => m.TEACHER_ROUTES)
    },
    {
        path: 'admin',
        canActivate: [authGuard, roleGuard(['ADMIN'])], // Chỉ cho phép ADMIN
        loadChildren: () =>
            import('./features/admin/admin.routes')
                .then(m => m.ADMIN_ROUTES)
    },
    {
        path: "**",
        redirectTo: "trang-chu"
    }
];