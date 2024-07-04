<h1 align="center">
    <img width="120" height="120" src="pic/logo.svg" alt=""><br>
    hoyolab-auto-sign
</h1>

<p align="center">
    <img src="https://img.shields.io/github/license/canaria3406/hoyolab-auto-sign?style=flat-square" alt="">
    <img src="https://img.shields.io/github/stars/canaria3406/hoyolab-auto-sign?style=flat-square" alt="">
    <br><a href="/README_zh-tw.md">繁體中文</a>　<a href="/README.md">English</a>　<b>Русский</b>
</p>

Легковесный, безопасный и бесплатный скрипт, который автоматически собирает ежедневные награды HoYoLAB.
Поддерживает Genshin Impact, Honkai Impact 3rd, Honkai: Star Rail, Tears of Themis и Zenless Zone Zero. Поддерживает нескольких учетных записей.

## Преимущества

- **Легковесность** - скрипт требует минимальной настройки и состоит всего из 90 строк кода.
- **Безопасность** - скрипт можно самостоятельно развернуть в Google Apps Script, не беспокоясь об утечке данных.
- **Бесплатность** - Google Apps Script в настоящее время является бесплатным сервисом.
- **Простота** - скрипт может запускаться без браузера и автоматически уведомит вас через Discord или Telegram.

## Установка

1. Перейдите в [Google Apps Script](https://script.google.com/home/start) и создайте новый проект с вашим пользовательским именем.
2. Выберите редактор и вставьте код( [Версия Discord](https://github.com/canaria3406/hoyolab-auto-sign/blob/main/src/main-discord.gs) / [Версия Telegram](https://github.com/canaria3406/hoyolab-auto-sign/blob/main/src/main-telegram.gs) ). Обратитесь к приведенным ниже инструкциям, чтобы настроить конфигурационный файл и сохранить его.
3. Выберите "main" и нажмите кнопку "Выполнить" наверху.
   Предоставьте необходимые разрешения и подтвердите правильность конфигурации (выполнение начато > завершено).
4. Нажмите кнопку "Триггеры" с левой стороны и добавьте новый триггер.\
   Выберите функцию: main\
   Выберите источник мероприятия: триггер по времени\
   Выберите тип триггера: по дням\
   Выберите время: рекомендуется выбирать любое не пиковое время с 09:00 до 15:00.

## Конфигурация

```javascript
const profiles = [
  {
    token: "ltoken_v2=v2_CANARIAXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX3406; ltuid_v2=26XXXXX20;",
    genshin: true,
    honkai_star_rail: true,
    honkai_3: false,
    tears_of_themis: false,
    zenless_zone_zero: false,
    accountName: "ВАШ НИК"
  }
];
```

> HoYoLAB изменила правила для токенов в июле 2023 года, перейдя с предыдущих "ltoken" и "ltuid" на "ltoken_v2" и "ltuid_v2".

> \[!IMPORTANT\]
> HoYoLAB изменила куки на HttpOnly. Теперь невозможно считывать файлы куки с использованием кода getToken.js.\
> Пожалуйста, воспользуйтесь методом ручного копирования файла куки для получения ltoken_v2 и ltuid_v2.

<details>
<summary><b>Настройки HoYoLAB</b></summary>

1. **token** - Введите токен для сбора наград на странице HoYoLAB.

   После входа на [страницу сбора наград в HoYoLAB](https://www.hoyalab.com/circles), нажмите клавишу F12, чтобы войти в консоль.\
   ~~Вставьте следующий код и запустите его, чтобы получить токен. Скопируйте токен и заключите его в "кавычки".~~\\

   > HoYoLAB изменила куки на HttpOnly. Теперь невозможно считывать файлы куки с использованием кода getToken.js.\
   > Пожалуйста, воспользуйтесь методом ручного копирования файла куки для получения ltoken_v2 и ltuid_v2.

2. **genshin**

   Включение автоматического сбора наград для Genshin Impact.\
   Если вы хотите включить, установите для него значение true. Если нет, установите для него значение false.\
   Если вы не играете в Genshin Impact или ваша учетная запись не привязана к uid, установите для него значение false.

3. **honkai_star_rail**

   Включение автоматического сбора наград для Honkai: Star Rail.\
   Если вы хотите включить, установите для него значение true. Если нет, установите для него значение false.\
   Если вы не играете в Honkai: Star Rail или ваша учетная запись не привязана к uid, установите для него значение false.

4. **honkai_3**

   Включение автоматического сбора наград для Honkai Impact 3rd.\
   Если вы хотите включить, установите для него значение true. Если нет, установите для него значение false.\
   Если вы не играете в Honkai Impact 3rd или ваша учетная запись не привязана к uid, установите для него значение false.

5. **tears_of_themis**

   Включение автоматического сбора наград для Tears of Themis.\
   Если вы хотите включить, установите для него значение true. Если нет, установите для него значение false.\
   Если вы не играете в Tears of Themis или ваша учетная запись не привязана к uid, установите для него значение false.

6. **zenless_zone_zero**

   Включение автоматического сбора наград для Zenless Zone Zero.\
   Если вы хотите включить, установите для него значение true. Если нет, установите для него значение false.\
   Если вы не играете в Zenless Zone Zero или ваша учетная запись не привязана к uid, установите для него значение false.

7. **accountName** - Введите свой индивидуальный ник.

   Пожалуйста, введите здесь свой ник из HoYoLAB или игровой ник.

</details>

<details>
<summary><b>Настройки уведомления discord (только для <a href="https://github.com/canaria3406/hoyolab-auto-sign/blob/main/src/main-discord.gs">Discord версии</a>)</b></summary>

```javascript
const discord_notify = true
const myDiscordID = "20000080000000040"
const discordWebhook = "https://discord.com/api/webhooks/1050000000000000060/6aXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXnB"
```

1. **discord_notify**

   Включение уведомлений Discord.\
   Если вы хотите включить автоматическое уведомление о сборе наград, установите для него значение true. Если нет, установите для него значение false.

2. **myDiscordID** - Введите свой user ID от Discord.

   Если вы хотите, чтобы вас уведомляли о сборе наград, то скопируйте свой ID Discord, который выглядит как "23456789012345678", и вставьте его в "кавычки".\
   Вы можете обратиться к [этой статье](https://support.discord.com/hc/en-us/articles/206346498), чтобы найти свой ID Discord.\
   Если вы не хотите, чтобы вас уведомляли, оставьте "кавычки" пустыми.

3. **discordWebhook** - Введите вебхук Discord для канала сервера для отправки уведомления.

   Вы можете обратиться к [этой статье](https://support.discord.com/hc/en-us/articles/228383668) для создания вебхука Discord.
   Как только вы закончите создание вебхук Discord, вы получите URL-адрес вашего Discord вебхука, который выглядит как `https://discord.com/api/webhooks/1234567890987654321/PekopekoPekopekoPekopeko06f810494a4dbf07b726924a5f60659f09edcaa1`.
   Скопируйте URL-адрес вебхука и вставьте его в "кавычки".

</details>

<details>
<summary><b>Настройка уведомлений Telegram (толлько для <a href="https://github.com/canaria3406/hoyolab-auto-sign/blob/main/src/main-telegram.gs">Telegram версии</a>)</b></summary>

```javascript
const telegram_notify = true
const myTelegramID = "1XXXXXXX0"
const telegramBotToken = "6XXXXXXXXX:AAAAAAAAAAXXXXXXXXXX8888888888Peko"
```

1. **telegram_notify**

   Включение уведомлений Telegram.\
   Если вы хотите включить автоматическое уведомление о сборе наград, установите для нее значение true. Если нет, установите для него значение false.

2. **myTelegramID** - Введите свой Telegram ID.

   Используйте команду `/getid`, чтобы найти свой идентификатор пользователя Telegram, отправив сообщение \[@IDBot\].(https://t.me/myidbot ).).
   Скопируйте свой ID Telegram, который выглядит как "123456780", и вставьте его в "кавычки".

3. **telegramBotToken** - Введите свой токен Telegram-бота.

   Используйте команду `/newbot`, чтобы создать нового бота в Telegram, отправив сообщение [@BotFather](https://t.me/botfather).
   Как только вы закончите создание бота, вы получите свой токен Telegram-бота, который выглядит как `110201543:AAHdqTcvCH1vGWJxfSeofSAs0K5PALDsaw`.
   Скопируйте свой токен Telegram-бота и вставьте его в "кавычки".
   Для получения более подробных инструкций, вы можете обратиться к [этой статье](https://core.telegram.org/bots/features#botfather).

</details>

## Примеры

Если процесс автоматического сбора наград завершится успешно, будет отправлено сообщение "OK".\
Если вы уже собрали награды сегодня, будет отправлено сообщение "Traveler/Trailblazer/Captain, you've already checked in today".

<details>
<summary><b>Один аккаунт HoYoLAB с уведомлением в Discord.</b></summary>

Включены авто-отметки Genshin Impact и Honkai: Star Rail, включены Discord уведомления, уведомления об ошибках в Discord.

```javascript
const profiles = [
  {
    token: "account_mid_v2=123xyzabcd_hi; account_id_v2=26XXXXX20; ltoken_v2=v2_CANARIAXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX3406; ltmid_v2=123xyzabcd_hi; ltuid_v2=26XXXXX20;",
    genshin: true,
    honkai_star_rail: true,
    accountName: "HuTao"
  }
];

const discord_notify = true
const myDiscordID = "240000800000300040"
const discordWebhook = "https://discord.com/api/webhooks/10xxxxxxxxxxxxxxx60/6aXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXnB"
```

![image](https://github.com/canaria3406/hoyolab-auto-sign/blob/main/pic/E02.png)

</details>

<details>
<summary><b>Два аккаунта HoYoLAB с авто-отметкой и уведомлениями в Telegram.</b></summary>

Включены авто-отметки Genshin Impact на аккаунте А, и Honkai Impact 3rd на аккаунте Б, включены уведомления в Telegram.

```javascript
const profiles = [
  {
    token: "account_mid_v2=123xyzabcd_hi; account_id_v2=26XXXXX20; ltoken_v2=v2_CANARIAXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX3406; ltmid_v2=123xyzabcd_hi; ltuid_v2=26XXXXX20;",
    genshin: true,
    accountName: "accountA"
  },
  {
    token: "account_mid_v2=456qwertyu_hi; account_id_v2=28XXXXX42; ltoken_v2=v2_GENSHINXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX5566; ltmid_v2=456qwertyu_hi; ltuid_v2=28XXXXX42;",
    honkai_3: true,
    accountName: "accountB"
  }
];

const telegram_notify = true
const myTelegramID = "1XXXXXXX0"
const telegramBotToken = "6XXXXXXXXX:AAAAAAAAAAXXXXXXXXXX8888888888Peko"
```

![image](https://github.com/canaria3406/hoyolab-auto-sign/blob/main/pic/E03.png)

</details>

## Журнал изменений

2022-12-30 Проект запущен.
2023-04-27 Добавлена поддержка Honkai Impact 3rd и Honkai: Star Rail.
2023-04-27 Добавлен переключатель для уведомления Discord.
2023-05-12 Обновление процесса gettoken[#2](https://github.com/canaria3406/hoyolab-auto-sign/pull/2).
2023-05-12 Добавлена поддержка уведомлений Telegram[#3](https://github.com/canaria3406/hoyolab-auto-sign/pull/3).
2023-05-13 Поддержка нескольких учетных записей HoYoLAB[#4](https://github.com/canaria3406/hoyolab-auto-sign/pull/4)
