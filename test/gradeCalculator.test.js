const test = require("node:test");
const assert = require("node:assert/strict");
const { calculateAverage, getLetterGrade, buildReport } = require("../src/gradeCalculator");
const { parseGrades } = require("../src/parseGrades");

test("calculateAverage считает среднее", () => {
  assert.equal(calculateAverage([80, 90, 100]), 90);
});

test("getLetterGrade возвращает букву", () => {
  assert.equal(getLetterGrade(95), "A");
  assert.equal(getLetterGrade(82), "B");
  assert.equal(getLetterGrade(74), "C");
  assert.equal(getLetterGrade(63), "D");
  assert.equal(getLetterGrade(40), "F");
});

test("buildReport формирует итог", () => {
  const report = buildReport([70, 75, 80]);
  assert.equal(report.count, 3);
  assert.equal(report.average, 75);
  assert.equal(report.letter, "C");
  assert.equal(report.min, 70);
  assert.equal(report.max, 80);
  assert.equal(report.median, 75);
  assert.equal(report.recommendation, null);
});

test("buildReport добавляет рекомендацию при малом наборе", () => {
  const report = buildReport([85, 95]);
  assert.equal(report.recommendation, "Добавьте минимум 3 оценки для более точного результата");
});

test("parseGrades поддерживает пробелы и запятые", () => {
  const grades = parseGrades(["78 90,67;100"]);
  assert.deepEqual(grades, [78, 90, 67, 100]);
});
