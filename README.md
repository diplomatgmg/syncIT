<div align="center">
    <a href="https://codeclimate.com/github/diplomatgmg/syncIT/maintainability"><img src="https://api.codeclimate.com/v1/badges/ba7e9ae9f4e9079c7b77/maintainability" /></a>
    <a href="https://codecov.io/github/diplomatgmg/syncIT"><img src="https://codecov.io/github/diplomatgmg/syncIT/graph/badge.svg?token=U3Z5D4VE22"/></a>
    <a href="https://wakatime.com/badge/user/018edcf0-2b06-4a99-805c-3bc4df0185a4/project/76b30482-0cc2-4f62-b778-243ae5df0f3e"><img src="https://wakatime.com/badge/user/018edcf0-2b06-4a99-805c-3bc4df0185a4/project/76b30482-0cc2-4f62-b778-243ae5df0f3e.svg" alt="wakatime"></a>
</div>


# Агрегатор it вакансий

Сайт для анализа всех вакансий и приведения к одному общему стилю.  
Релевантная выдача вакансий

## Принцип работы:
Пользователь в своем профиле указывает:
- **Хардскиллы** (python, typescript, react, etc.)
- **Грейд** (junior, middle/senior, etc.)
- **Формат работы** (Удаленка, Гибрид, офис)
- **Профессию** (frontend-разработчик, fullstack-разработчик, DevOps, etc.)

Далее воркер получает последние вакансии с api.hh.ru,
через промпт для ChatGPT получает необходимую информацию о вакансии: хардскиллы, грейд... и сохраняет вакансию в БД

Далее воркер анализирует профиль каждого пользователя и ищет вакансии подходящие под его стек как минимум на 60%

После чего пользователь может зайти на главную страницу и увидеть актуальные вакансии именно под его стек

[![photo_5264950029209166238_y.jpg](https://iimg.su/s/28/fIZuAhjLzaesJS2po3fjh4Gv4nahq7uAWHFL5TNi.jpg)](https://iimg.su/i/DUL0Y)
