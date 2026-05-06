function groupStudentsByAvgGrade(students) {
  return students.reduce((acc, student) => {
    const avg =
      student.grades.reduce((sum, g) => sum + g.grade, 0) /
      student.grades.length;

    const key = avg;

    if (!acc[key]) {
      acc[key] = [];
    }

    acc[key].push(`${student.surname} ${student.name}`);

    return acc;
  }, {});
}
