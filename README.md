!!! Для Ajax запросов и работы с API ! Т.к. логинизация организована с помощью cookie нужно залогинится на ресурсе https://social-network.samuraijs.com/

Email: free@samuraijs.com Password: free

homepage": "https://alx8437.github.io/todoList



Проект по добавлению задач. TodoList. SPA

Здесь реализованы следующие подходы к реализации стейт менеджмента и отображения UI:

1) Классовые компоненты React, для хранения локального стейта и коллбек функций, т.к. функциональная компонента
должна быть читая и не подразумевает хранение в себе какогото изменения входящих данных (по крайней мере напрямую)

2) Библиотека Redux: 

3) Reducer, функция для работы сo стейтом.

4) Функция dispatch и actionCreators для диспатча экшенов в Reduser 

5) ThunkCreator организовывает общение BLL c DAL, т.к. UI не должен этим заниматься.
Выполняет асинхронные запросы и диспатчит action через Middleware в reduser

6) Работа с Rest API идет посредством библиотеки axios.

p.s. Оформление делал на коленке за 30 минут, поэтому не очень презентабельно выглядит
