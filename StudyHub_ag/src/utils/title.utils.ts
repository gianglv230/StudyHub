const APP_NAME = 'StudyHub';

export function getTitle(title?: string, role?: string): string {
    return title
        ? `${title} ${role ? '- ' + role : ''} | ${APP_NAME}`
        : APP_NAME;
}