function getStudentsWithGoodGrades(students) {
  return students
    .filter((student) => student.grades.every((g) => g.grade >= 75))
    .map((student) => `${student.surname} ${student.name}`);
}
