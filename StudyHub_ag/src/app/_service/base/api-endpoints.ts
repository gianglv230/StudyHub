export const API_ENDPOINTS = {
  // PROMOTION: "/promotion-service",
  COURSE: '/course',
  COURSE_ENPOINTS: {
    COURSE_HOT: '/type/hot',
    COURSE_NEW: '/type/new',
    FIND: '/find',
    FILTER: '/filter',
    FILTER_OPTION: '/filter-option',
    DETAIL: '/detail',
    ADMIN: '/admin'
  },
  TEACHER: '/teacher',
  TEACHER_ENDPOINTS: {
    LIST: '/list',
  },
  CLASS: '/class',
  CLASS_ENDPOINTS: {
    FILTER: '/filter',
    CLASS_OF_COURSE: '/class-of-course',
    CLASS_OF_TEACHER: '/class-of-teacher',
    DETAIL: '/detail',
    STUDENT_LIST: '/student/list',
    CLASS_LESSON: '/class-lesson',
    TEACHER_LIST: '/teacher/list',
    ADMIN: '/admin',
    ADMIN_CLASS_INFO: '/admin/class-info',
    ADMIN_OPEN: '/admin/open',
    ADMIN_CLOSE: '/admin/close',
    ADMIN_STATUS: '/admin/status'
  },
  AUTH: '/auth',
  AUTH_ENDPOINTS: {
    TOKEN: '/token',
  },
  INVOICE: '/invoice',
  INVOICE_ENDPOINTS: {
    STUDENT_MY_INVOICE: '/student/my-invoice',
  },
  USER_ACCOUNT: '/user-account',
  USER_ACCOUNT_ENPOINT: {
    MY_INFO: '/my-info',
    CHANGE_PWD: '/change-pwd',
    UPDATE_MY_ACCOUNT: '/auth/my-account',
    ADMIN: '/admin'
  },
  ATTENDANCE: '/attendance',
  ATTENDANCE_ENDPOINTS: {
    STUDENT: '/student',
    SESSION_DATE: '/session-date',
    ROWS: '/rows',
    ENROLLMENT: '/enrollment',
    ADMIN_ADD: '/admin/add',
    ADMIN_SUSPEND: '/admin/suspend',
    ADMIN_TRANSFER: '/admin/transfer',
  },
  CLASS_LESSON: '/class-lesson',
  CLASS_LESSON_ENDPOINTS: {
    SECTIONS: '/sections',
    TEACHER: '/teacher'
  },
  RESOURCE: '/resource',
  RESOURCE_ENDPOINTS: {
    FOLDER: '/folder',
    FILE: '/file',
    URL: '/url',
  },
  STATISTICS: '/statistics',
  STATISTICS_ENDPOINTS: {
    BASIC: '/basic',
    REVENUE_YEAR: '/revenue',
  },
  ENROLLMENT: '/enrollment',
  ENROLLMENT_ENDPOINTS: {
    ADMIN: '/admin'
  },
};
