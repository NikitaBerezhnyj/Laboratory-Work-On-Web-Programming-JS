function getTopStudent(students) {
  return students.reduce((topStudent, student) => {
    const sum = student.grades.reduce((acc, g) => acc + g.grade, 0);
    const avg = sum / student.grades.length;

    if (!topStudent || avg > topStudent.avgGrade) {
      return {
        name: student.name,
        surname: student.surname,
        avgGrade: avg,
      };
    }

    return topStudent;
  }, null);
}
