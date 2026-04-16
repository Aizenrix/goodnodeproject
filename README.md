# Grade Calculator

Мини-проект на Node.js для расчёта среднего балла и итоговой буквенной оценки.

## Возможности

- расчёт среднего балла по списку оценок;
- определение итоговой оценки по шкале A-F;
- проверка корректности входных данных.

## Запуск веб-версии

```bash
npm install
npm start
```

После запуска открой `http://127.0.0.1:3000`.
Если порт занят, сервер автоматически подберёт следующий свободный.

## Запуск CLI

```bash
npm run start:cli -- 78 90 67 100
```

Можно передавать значения через пробелы или через запятую.

```bash
npm run start:cli -- 78,90,67,100
```

## Что показывает отчёт

- количество оценок;
- средний балл и итоговую буквенную оценку;
- минимум, максимум и медиану;
- рекомендацию, если введено меньше 3 оценок.

## Форматирование и линтер

Используемый стек качества кода:

- форматтер: `prettier`
- линтер: `eslint`
- pre-commit: `pre-commit`

Команды:

```bash
npm run format
npm run format:check
npm run lint
```

## Pre-commit hooks

Установка:

```bash
python3 -m pip install --user pre-commit
python3 -m pre_commit install
```

Ручной прогон:

```bash
python3 -m pre_commit run --all-files
```

В hooks включены:

- базовые проверки файлов (`check-yaml`, `check-json`, `end-of-file-fixer`, `trailing-whitespace`, `check-merge-conflict`);
- проверка форматирования (`npm run format:check`);
- линт (`npm run lint`).

## Пример вывода

```text
Оценок: 4
Средний балл: 83.75
Итоговая оценка: B
```

# goodnodeproject
