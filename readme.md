Для запуска сервера необходимо из папки Server запустить команду:
node server.js

Для запуска клиета необходимо из Front/client-app запустить команду:
ng serve

Описание API:
Сервер запускается на http://localhost:3000

Получить текущий путь:
    GET http://localhost:3000/api/pwd
    Возвращает:
        currentPath: текущий путь


Получить список файлов по текущему пути
    GET http://localhost:3000/api/dirs
    Возвращает:
        string[]: коллекция файлов

Скачать файл:
    GET http://localhost:3000/api/download?file=${file}
    Параметры:
        file - название файла
    Возвращает:
        file: выбранный файл

GET http://localhost:3000/api/delete?file=${file}
    Параметры:
        message - сообщение об успешном завершении

POST http://localhost:3000/api/open?file=${file}
    Параметры:
        file - название файла
    Возвращает:
        string[]: коллекция файлов