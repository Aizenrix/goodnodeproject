function validateGrades(grades) {
  if (!Array.isArray(grades) || grades.length === 0) {
    throw new Error("Нужен непустой список оценок");
  }

  for (const grade of grades) {
    if (!Number.isFinite(grade) || grade < 0 || grade > 100) {
      throw new Error("Оценки должны быть числами от 0 до 100");
    }
  }
}

function calculateAverage(grades) {
  validateGrades(grades);
  const sum = grades.reduce((acc, value) => acc + value, 0);
  return sum / grades.length;
}

function getLetterGrade(average) {
  if (average >= 90) return "A";
  if (average >= 80) return "B";
  if (average >= 70) return "C";
  if (average >= 60) return "D";
  return "F";
}

function buildReport(grades) {
  const average = calculateAverage(grades);
  return {
    grades,
    average: Number(average.toFixed(2)),
    letter: getLetterGrade(average),
    count: grades.length
  };
}

module.exports = {
  calculateAverage,
  getLetterGrade,
  buildReport
};
