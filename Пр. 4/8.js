function getStudentsSortedByAvgGrade(students) {
  return students
    .map((student) => {
      const avg =
        student.grades.reduce((acc, g) => acc + g.grade, 0) /
        student.grades.length;

      return {
        name: student.name,
        surname: student.surname,
        avgGrade: avg,
      };
    })
    .sort((a, b) => b.avgGrade - a.avgGrade);
}
