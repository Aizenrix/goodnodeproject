function parseGrades(values) {
  const prepared = values
    .flatMap((value) => String(value).split(","))
    .map((value) => value.trim())
    .filter(Boolean);

  if (prepared.length === 0) {
    throw new Error("Нужен хотя бы один балл");
  }

  const grades = prepared.map((value) => Number(value));
  if (grades.some((value) => Number.isNaN(value))) {
    throw new Error("Передавайте только числа");
  }

  return grades;
}

module.exports = {
  parseGrades
};
