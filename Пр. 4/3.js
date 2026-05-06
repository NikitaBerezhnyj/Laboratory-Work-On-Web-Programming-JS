function countStudentsWhoPassedAll(students) {
  return students.filter((student) =>
    student.grades.every((grade) => grade.grade >= 60),
  ).length;
}
