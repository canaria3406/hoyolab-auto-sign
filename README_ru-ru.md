<h1 align="center">
    <img width="120" height="120" src="pic/logo.svg" alt=""><br>
    hoyolab-auto-sign
</h1>

<p align="center">
    <img src="https://img.shields.io/github/license/canaria3406/hoyolab-auto-sign?style=flat-square">
    <img src="https://img.shields.io/github/stars/canaria3406/hoyolab-auto-sign?style=flat-square">
    <br><a href="/README_zh-tw.md">繁體中文</a>　<a href="/README.md">English</a>　<b>Русский</b>
</p>

Легкий, безопасный и бесплатный скрипт, который автоматически собирает ежедневные награды HoYoLAB.
Поддерживает Genshin Impact, Honkai Impact 3rd и Honkai: Star Rail. Поддержка нескольких учетных записей.

## Возможности
* **Легкий** - Скрипт требует минимальной настройки и состоит всего из 90 строк кода.
* **Безопасный** - Скрипт можно самостоятельно развернуть в Google Apps Script, не беспокоясь об утечке данных.
* **Бесплатный** - Google Apps Script в настоящее время является бесплатным сервисом.
* **Простой** - Скрипт может запускаться без браузера и автоматически уведомит вас через Discord или Telegram.

## Установка
1. Перейдите к [Google Apps Script](https://script.google.com/home/start) и создайте новый проект с вашим пользовательским именем.
2. Выберите редактор и вставьте код( [Версия Discord](https://github.com/canaria3406/hoyolab-auto-sign/blob/main/src/main-discord.gs) / [Версия Telegram](https://github.com/canaria3406/hoyolab-auto-sign/blob/main/src/main-telegram.gs) ). Обратитесь к приведенным ниже инструкциям, чтобы настроить конфигурационный файл и сохранить его.
3. Выберите "Главная" и нажмите кнопку "Выполнить" вверху.
   Предоставьте необходимые разрешения и подтвердите правильность конфигурации (выполнение начато > завершено).
4. Нажмите кнопку запуска с левой стороны и добавьте новый триггер.  
   Выберите функцию для запуска: главная  
   Выберите источник события: управляемый временем  
   Выберите тип триггера, основанного на времени: Дневной таймер  
   Выберите время суток: рекомендуется выбирать любое непиковое время с 09:00 до 15:00.

## Конфигурация

```javascript
const profiles = [
  { token: "account_mid_v2=123xyzabcd_hi; account_id_v2=26XXXXX20; ltoken_v2=v2_CANARIAXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX3406; ltmid_v2=123xyzabcd_hi; ltuid_v2=26XXXXX20;", 
    genshin: true, 
    honkai_star_rail: true, 
    honkai_3: false, 
    accountName: "ВАШ НИК" }
];
```

> HoYoLAB изменила правила для токенов в июле 2023 года, перейдя с предыдущих "ltoken" и "ltuid" на "ltoken_v2" и "ltuid_v2".
Пожалуйста, выйдите из HoYoLAB с помощью своего браузера, затем войдите снова и используйте [getToken.js](https://github.com/canaria3406/hoyolab-auto-sign/blob/main/src/getToken.js), чтобы получить новый токен для Google Apps Script.

<details>
<summary><b>Настройки HoYoLAB</b></summary>

1. **token** - Пожалуйста, введите токен для регистрации на странице HoYoLAB.

   После входа на [страницу регистрации в HoYoLAB](https://www.hoyalab.com/circles), нажмите клавишу F12, чтобы войти в консоль.
Вставьте следующий код и запустите его, чтобы получить токен. Скопируйте токен и заключите его в "кавычки".
   ```javascript
   function getCookie(name) {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2) return parts.pop().split(';').shift();
   }
   let token = 'Error';
   if (document.cookie.includes('ltoken=')) {
      token = `ltoken=${getCookie('ltoken')}; ltuid=${getCookie('ltuid')};`;
   } else if (document.cookie.includes('ltoken_v2=')) {
      token = `account_mid_v2=${getCookie('account_mid_v2')}; account_id_v2=${getCookie('account_id_v2')}; ltoken_v2=${getCookie('ltoken_v2')}; ltmid_v2=${getCookie('ltmid_v2')}; ltuid_v2=${getCookie('ltuid_v2')};`;
   }
   let ask = confirm(token + '\n\nPress enter, then paste the token into your Google Apps Script Project');
   if (ask) {
      copy(token);
      msg = token;
   } else {
      msg = 'Cancel';
   }
   ```

2. **genshin**

   Следует ли включать автоматическую регистрацию для Genshin Impact.  
   Если вы хотите, установите для него значение true. Если нет, пожалуйста, установите для него значение false.  
   Если вы не играете в Genshin Impact или ваша учетная запись не привязана к uid, пожалуйста, установите для нее значение false.

3. **honkai_star_rail**

   Включать ли автоматическую регистрацию для Honkai: Star Rail.  
   Если вы хотите, установите для него значение true. Если нет, пожалуйста, установите для него значение false.  
   Если вы не играете в Honkai: Star Rail или ваша учетная запись не привязана к uid, пожалуйста, установите для нее значение false.

4. **honkai_3**

   Включать ли автоматическую регистрацию для Honkai Impact 3rd.  
   Если вы хотите, установите для него значение true. Если нет, пожалуйста, установите для него значение false.  
   Если вы не играете в Honkai Impact 3rd или ваша учетная запись не привязана к uid, пожалуйста, установите для нее значение false.

5. **accountName** - Пожалуйста, введите свой индивидуальный ник.

Пожалуйста, введите здесь свой ник из HoYoLAB или внутриигровой ник.

</details>

<details>
<summary><b>Настройки уведомления discord (только для <a href="https://github.com/canaria3406/hoyolab-auto-sign/blob/main/src/main-discord.gs">Discord версии</a>)</b></summary>

```javascript
const discord_notify = true
const myDiscordID = "20000080000000040"
const discordWebhook = "https://discord.com/api/webhooks/1050000000000000060/6aXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXnB"
```

1. **discord_notify**

   Следует ли включать Discord notify.  
   Если вы хотите включить автоматическое уведомление о регистрации, установите для него значение true. Если нет, пожалуйста, установите для него значение false.

2. **myDiscordID** - Пожалуйста, введите свой user ID от Discord.

   Хотите ли вы, чтобы вас пинговали при неудачной регистрации.
Скопируйте свой ID Discord, который выглядит как "23456789012345678", и введите его в "кавычки".
Вы можете обратиться к [этой статье](https://support.discord.com/hc/en-us/articles/206346498), чтобы найти свой ID Discord.
Если вы не хотите, чтобы вас проверяли, оставьте поле "кавычки" пустым.

3. **discordWebhook** - Пожалуйста, введите вебхук Discord для канала сервера для отправки уведомления.

   Вы можете обратиться к [этой статье](https://support.discord.com/hc/en-us/articles/228383668) для создания веб-узла Discord.
Как только вы закончите создание Discord webhook, вы получите URL-адрес вашего Discord вебхука, который как `https://discord.com/api/webhooks/1234567890987654321/PekopekoPekopekoPekopeko06f810494a4dbf07b726924a5f60659f09edcaa1`.
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

   Следует ли включать уведомление Telegram.  
   Если вы хотите включить автоматическую регистрацию в уведомлении, установите для нее значение true. Если нет, пожалуйста, установите для него значение false.

2. **myTelegramID** - Пожалуйста, введите свой Telegram ID.

   Используйте команду `/getid`, чтобы найти свой идентификатор пользователя Telegram, отправив сообщение [@IDBot].(https://t.me/myidbot ).).
Скопируйте свой ID Telegram, который выглядит как "123456780", и введите его в "кавычки".

3. **telegramBotToken** - Пожалуйста, введите свой токен Telegram-бота.

   Используйте команду `/newbot`, чтобы создать нового бота в Telegram, отправив сообщение [@BotFather](https://t.me/botfather).
   Как только вы закончите создание бота, вы получите свой токен Telegram-бота, который выглядит как `110201543:AAHdqTcvCH1vGWJxfSeofSAs0K5PALDsaw`.
   Скопируйте свой токен Telegram-бота и заполните его в "кавычках".
   Для получения более подробных инструкций вы можете обратиться к [этой статье](https://core.telegram.org/bots/features#botfather).

</details>

## Демо
Если процесс автоматической регистрации завершится успешно, будет отправлено сообщение "OK".  
Если вы уже зарегистрировались сегодня, будет отправлено сообщение "Traveler/Trailblazer/Captain, you've already checked in today".

<details>
<summary><b>Один аккаунт HoYoLAB с уведомлением Discord и пингом.</b></summary>

Включены авто-отметки Genshin Impact и Honkai: Star Rail, включите Discord уведомления, пинг в Discord.

```javascript
const profiles = [
  { token: "account_mid_v2=123xyzabcd_hi; account_id_v2=26XXXXX20; ltoken_v2=v2_CANARIAXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX3406; ltmid_v2=123xyzabcd_hi; ltuid_v2=26XXXXX20;", 
    genshin: true, 
    honkai_star_rail: true, 
    honkai_3: false, 
    accountName: "HuTao" }
];

const discord_notify = true
const myDiscordID = "240000800000300040"
const discordWebhook = "https://discord.com/api/webhooks/10xxxxxxxxxxxxxxx60/6aXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXnB"
```
![image](https://github.com/canaria3406/hoyolab-auto-sign/blob/main/pic/E02.png)

</details>

<details>
<summary><b>Два аккаунта HoYoLAB с авто-отметкой и уведомлением в Telegram.</b></summary>

Включены авто-отметки Genshin Impact на аккаунте А, и Honkai Impact 3rd на аккаунте Б, включены уведомления в Telegram.

```javascript
const profiles = [
  { token: "account_mid_v2=123xyzabcd_hi; account_id_v2=26XXXXX20; ltoken_v2=v2_CANARIAXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX3406; ltmid_v2=123xyzabcd_hi; ltuid_v2=26XXXXX20;", 
    genshin: true, 
    honkai_star_rail: false, 
    honkai_3: false, 
    accountName: "accountA" },
  { token: "account_mid_v2=456qwertyu_hi; account_id_v2=28XXXXX42; ltoken_v2=v2_GENSHINXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX5566; ltmid_v2=456qwertyu_hi; ltuid_v2=28XXXXX42;", 
    genshin: false, 
    honkai_star_rail: false, 
    honkai_3: true, 
    accountName: "accountB" }
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
2023-04-27 Добавьте переключатель для уведомления Discord.
2023-05-12 Обновление процесса gettoken[#2](https://github.com/canaria3406/hoyolab-auto-sign/pull/2).
2023-05-12 Добавлена поддержка уведомлений Telegram[#3](https://github.com/canaria3406/hoyolab-auto-sign/pull/3).
2023-05-13 Поддержка нескольких учетных записей HoYoLAB[#4](https://github.com/canaria3406/hoyolab-auto-sign/pull/4)