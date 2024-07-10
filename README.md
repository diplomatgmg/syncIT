<div align="center">
    <a href="https://codeclimate.com/github/diplomatgmg/it_job_aggregator/maintainability"><img src="https://api.codeclimate.com/v1/badges/ba7e9ae9f4e9079c7b77/maintainability" /></a>
    <a href="https://codecov.io/github/diplomatgmg/it_job_aggregator"><img src="https://codecov.io/github/diplomatgmg/it_job_aggregator/graph/badge.svg?token=U3Z5D4VE22"/></a>
    <a href="https://wakatime.com/badge/github/diplomatgmg/it_job_aggregator"><img src="https://wakatime.com/badge/github/diplomatgmg/it_job_aggregator.svg"></a>
</div>


# Агрегатор it вакансий

Сайт для анализа всех вакансий и приведения к одному общему стилю.  
Релевантная выдача вакансий

## Доступные сайты:
- hh.ru (in progress)
- vseti.app (in progress)
- getmatch.ru (in progress)
- career.habr.com (in progress)
- hexlet.cv (in progress)



### Страницы:

###  Главная
- Список вакансий
- - название компании
- - название вакансии
- - грейд
- - вилка
- - формат
- - теги хард скиллов
- - на сколько актуальна по скиллам в %
- Бесконечный скролл

### Детали вакансии
- единый стиль форматирования для всех вакансий
- ссылка на отклик

### Профиль
- выбор хард скиллов (из предложенного)
- выбор грейда
- выбор формата (гибрид, удаленка, офис)
- выбор профессии
- выбор вилки

### Авторизация
- вход по почте / паролю



### Фичи

### Профиль
- флаг isCompleted в модели профиля пользователя,  
для указания заполненности профиля и дальнейшей работы парсера
- график популярных хард скиллов (https://github.com/kivaiko/hh-api-skills-analyst)
- Добавить выбор города для поиска вакансий в офис/гибрид
