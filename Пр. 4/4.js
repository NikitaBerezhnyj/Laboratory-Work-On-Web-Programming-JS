function getTopStudentInSubject(students, subject) {
  return students.reduce((topStudent, student) => {
    const subjectGrade = student.grades.find((g) => g.subject === subject);

    if (!subjectGrade) return topStudent;

    if (!topStudent || subjectGrade.grade > topStudent.grade) {
      return {
        name: student.name,
        surname: student.surname,
        grade: subjectGrade.grade,
      };
    }

    return topStudent;
  }, null);
}
