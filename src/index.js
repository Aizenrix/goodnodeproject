const { buildReport } = require("./gradeCalculator");

function parseGrades(args) {
  const grades = args.map((value) => Number(value));
  if (grades.some((value) => Number.isNaN(value))) {
    throw new Error("Передавайте только числа");
  }
  return grades;
}

function printHelp() {
  console.log("Использование: npm start -- 78 90 67 100");
}

function run() {
  const args = process.argv.slice(2);
  if (args.length === 0) {
    printHelp();
    return;
  }

  try {
    const grades = parseGrades(args);
    const report = buildReport(grades);
    console.log(`Оценок: ${report.count}`);
    console.log(`Средний балл: ${report.average}`);
    console.log(`Итоговая оценка: ${report.letter}`);
  } catch (error) {
    console.error(`Ошибка: ${error.message}`);
    process.exitCode = 1;
  }
}

run();
