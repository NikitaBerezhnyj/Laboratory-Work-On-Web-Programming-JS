function getStudentsWithLowGrades(students) {
  return students
    .filter((student) => student.grades.some((grade) => grade.grade < 60))
    .map((student) => `${student.surname} ${student.name}`);
}
