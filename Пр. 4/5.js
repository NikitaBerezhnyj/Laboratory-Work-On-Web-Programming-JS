function getUniqueSubjects(students) {
  const subjects = students.flatMap((student) =>
    student.grades.map((grade) => grade.subject),
  );

  return [...new Set(subjects)];
}
