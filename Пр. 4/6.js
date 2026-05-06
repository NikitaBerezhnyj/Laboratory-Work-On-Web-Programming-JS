function getStudentsAverageGrades(students) {
  return students.map((student) => {
    const sum = student.grades.reduce((acc, g) => acc + g.grade, 0);
    const avg = sum / student.grades.length;

    return {
      name: student.name,
      surname: student.surname,
      avgGrade: avg,
    };
  });
}
