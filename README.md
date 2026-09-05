# Торты от Вероники

Простой сайт-визитка для заказов тортов через WhatsApp. Хостинг — **GitHub Pages** (бесплатно).

## Быстрый старт

1. Откройте `js/config.js` и укажите свой номер WhatsApp:

```js
whatsappNumber: "79001234567", // без + и пробелов
```

2. Откройте `index.html` в браузере, чтобы посмотреть сайт локально.

## Публикация на GitHub Pages

1. Создайте новый репозиторий на GitHub (например `torty-ot-veroniki`).
2. В папке проекта выполните:

```bash
git add .
git commit -m "Первая версия сайта Торты от Вероники"
git remote add origin https://github.com/ВАШ_ЛОГИН/torty-ot-veroniki.git
git push -u origin main
```

3. На GitHub: **Settings → Pages → Build and deployment**
   - Source: **Deploy from a branch**
   - Branch: **main** / folder **/** (root)
4. Через 1–2 минуты сайт будет по адресу:

`https://ВАШ_ЛОГИН.github.io/torty-ot-veroniki/`

## Разделы сайта

- **Главная** — бренд и кнопка заказа
- **О себе** — история
- **Торты** — примеры ассортимента
- **Заказ** — шаги и WhatsApp

## Что можно заменить позже

- Фото на свои (положите файлы в папку `images/` и поменяйте пути в `index.html`)
- Тексты про вкусы и оплату
- Цвета в `css/styles.css` (переменные в `:root`)
