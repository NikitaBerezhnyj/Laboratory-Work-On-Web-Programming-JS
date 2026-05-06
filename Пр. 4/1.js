function getStudentsWithGoodGrades(students) {
  return students
    .filter((student) => student.grades.every((grade) => grade.grade >= 75))
    .map((student) => `${student.surname} ${student.name}`);
}
