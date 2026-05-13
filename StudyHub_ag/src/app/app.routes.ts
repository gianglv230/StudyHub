import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadChildren: () =>
            import('./features/guest/guest.routes')
                .then(m => m.GUEST_ROUTES)
    },
    {
        path: 'hoc-vien',
        loadChildren: () =>
            import('./features/student/student.routes')
                .then(m => m.STUDENT_ROUTES)
    },
    {
        path: 'giao-vien',
        loadChildren: () =>
            import('./features/teacher/teacher.routes')
                .then(m => m.TEACHER_ROUTES)
    },
    {
        path: 'admin',
        loadChildren: () =>
            import('./features/admin/admin.routes')
                .then(m => m.ADMIN_ROUTES)
    },
    {
        path: "**",
        redirectTo: "trang-chu"
    }
];
