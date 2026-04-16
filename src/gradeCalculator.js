function validateGrades(grades) {
  if (!Array.isArray(grades) || grades.length === 0) {
    throw new Error('Нужен непустой список оценок');
  }

  for (const grade of grades) {
    if (!Number.isFinite(grade) || grade < 0 || grade > 100) {
      throw new Error('Оценки должны быть числами от 0 до 100');
    }
  }
}

function calculateAverage(grades) {
  validateGrades(grades);
  const sum = grades.reduce((acc, value) => acc + value, 0);
  return sum / grades.length;
}

function getLetterGrade(average) {
  if (average >= 90) return 'A';
  if (average >= 80) return 'B';
  if (average >= 70) return 'C';
  if (average >= 60) return 'D';
  return 'F';
}

function calculateMedian(grades) {
  const sorted = [...grades].sort((a, b) => a - b);
  const middle = Math.floor(sorted.length / 2);
  if (sorted.length % 2 === 0) {
    return (sorted[middle - 1] + sorted[middle]) / 2;
  }
  return sorted[middle];
}

function buildReport(grades) {
  const average = calculateAverage(grades);
  const min = Math.min(...grades);
  const max = Math.max(...grades);
  const median = calculateMedian(grades);
  return {
    grades,
    average: Number(average.toFixed(2)),
    letter: getLetterGrade(average),
    count: grades.length,
    min,
    max,
    median: Number(median.toFixed(2)),
    recommendation:
      grades.length < 3 ? 'Добавьте минимум 3 оценки для более точного результата' : null
  };
}

module.exports = {
  calculateAverage,
  getLetterGrade,
  buildReport
};
