# Tech-support-extensions
Расширения для автоматизации работы в технической поддержке 

---
Основыные правила работы с репозиторием

- Прежде чем пушить что-то, проверяем локально как работает, ничего не должно сломать существующие функции
- Не использовать циклы for и не делать многоуровневый if, использовать forEach, map, filter 
- Стараться использовать чистые функции (одна функция делает что-то одно)
- Чем больше комментариев что и где делаете тем лучше это читается

---

Как начать пользоваться гитом?

- Устанавливаете что удобнее всего Atom, GitHub desktop, Visual studio code 
- Авторизоваться под своей учеткой гита
- Клонировать репозиторий
- `git checkout -b имя_ветки` - Создаем новую ветку (это важно, изменения делаем только там и пушить нужно только туда)
- В папке где лежат скрипты добавить свой файл скрипта и подклчить свой манифест (с манифестом потом будет .gitignore)

---
Комнады для отправки изменений 

- `git add .`  - запомнить измненеия 
- `git commit -m 'Комментарий к ветке имя_ветки'` - комментируем что именно поменяли и пишем в начале комментария что-то типа номера таски "TEST-0001 сделал что-то"
- `git push origin имя_ветки` - отправляем изменения в нашу ветку

---

После того все сделано, создаем свой пулл и туда отправляем нашу ветку с изменения чтобы её смержили в мастер (проще говоря объединили и в оригинашльной версии были ваши изменения, но пока только на гите)

### `yarn install`
Устанока всех зависимостей
### `yarn start`

Запускается приложение по адресу [http://localhost:3000](http://localhost:3000) 
В нашем случае это нужно чтобы можно было быстро и режиме live reload что менять в коде и смотреть как выгялдит не пересобирая билд расширения и не обновляя его вручную в browser://extensions

Все функции которые обращаются к апи замоканы для localhost, будут возвращать тестовые даные т.к. все равно корс ошибки будут да и смысла нет деать обходные варианты чтобы в прод постучаться с адреса разработки 
Если нужно проверить прод то используй `yarn watch` и обновляй расширение 


### `yarn build`

Собирает билд для продакшена

### `yarn watch`

Запускает пересобрку билда при измении в коде, удобно если нужно проверять расширение именно на странице где рендерит компоненты

# Как работать с моками

В файле `src/service/mock/mock-response-list.ts` есть массив с имененм запроса и ответом на него описанный вручную 
Все очень просто, либо вручню меняем ответ для готового запроса, либо если новый запрос то создать объект и маппить строго импортирую имя из `src/chrome/actions.ts` (в нём тоже нужно добавить имя твоего запроса)
Проводвские запросы лужат тут `src/chrome/function/getter.tsx`, в нём тоже создаем новый вызов импортируя имя из `actions`