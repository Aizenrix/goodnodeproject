const form = document.getElementById('grade-form');
const input = document.getElementById('grades');
const resultBox = document.getElementById('result');

function renderError(message) {
  resultBox.classList.remove('hidden');
  resultBox.classList.add('error');
  resultBox.innerHTML = `<strong>Ошибка:</strong> ${message}`;
}

function renderReport(report) {
  resultBox.classList.remove('hidden', 'error');
  const recommendation = report.recommendation
    ? `<div class="recommendation">${report.recommendation}</div>`
    : '';
  resultBox.innerHTML = [
    `<div>Оценок: <strong>${report.count}</strong></div>`,
    `<div>Средний балл: <strong>${report.average}</strong></div>`,
    `<div>Итоговая оценка: <strong>${report.letter}</strong></div>`,
    `<div>Минимум: <strong>${report.min}</strong></div>`,
    `<div>Максимум: <strong>${report.max}</strong></div>`,
    `<div>Медиана: <strong>${report.median}</strong></div>`,
    recommendation
  ].join('');
}

form.addEventListener('submit', async (event) => {
  event.preventDefault();
  const raw = input.value.trim();

  try {
    const response = await fetch('/api/calculate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ grades: [raw] })
    });
    const payload = await response.json();
    if (!response.ok) {
      throw new Error(payload.error || 'Не удалось выполнить расчёт');
    }
    renderReport(payload);
  } catch (error) {
    renderError(error.message);
  }
});
