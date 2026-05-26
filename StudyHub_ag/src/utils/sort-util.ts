export function sortLastName(
  data: AttendanceRowResponse[],
): AttendanceRowResponse[] {
  return data
    .map((item) => ({
      ...item,
      lastName: item.studentName.trim().split(' ').pop() || '',
    }))
    .sort((a, b) => {
      const lastNameCompare = a.lastName.localeCompare(b.lastName, 'vi', {
        sensitivity: 'base',
      });

      if (lastNameCompare !== 0) {
        return lastNameCompare;
      }

      return a.studentName.localeCompare(b.studentName, 'vi', {
        sensitivity: 'base',
      });
    });
}
