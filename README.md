<h1 align="center">
    <img width="120" height="120" src="pic/logo.svg" alt=""><br>
    hoyolab-auto-sign
</h1>

<p align="center">
    <img src="https://img.shields.io/github/license/canaria3406/hoyolab-auto-sign">
    <img src="https://img.shields.io/github/stars/canaria3406/hoyolab-auto-sign">
    <br><a href="https://github.com/canaria3406/hoyolab-auto-sign/blob/main/README_zh-tw.md">繁體中文</a>．<a href="https://github.com/canaria3406/hoyolab-auto-sign/blob/main/README.md">English</a>
</p>

A lightweight, secure, and free script that automatically collect Hoyolab daily check in rewards.  
Supports Genshin Impact, Honkai Impact 3rd, and Honkai: Star Rail.

## Features
* **Lightweight** - The script only requires minimal configuration and is only 90 lines of code.
* **Secure** - The script can be self-deployed to Google Apps Script, no worries about data leaks.
* **Free** - Google Apps Script is currently a free service.
* **Simple** - The script can run without a browser and will automatically notify you through Discord or Telegram.

## Setup
1. Go to [Google Apps Script](https://script.google.com/home/start) and create a new project with your custom name.
2. Select the editor and paste the code( [Discord version](https://github.com/canaria3406/hoyolab-auto-sign/blob/main/src/main-discord.gs) / [Telegram version](https://github.com/canaria3406/hoyolab-auto-sign/blob/main/src/main-telegram.gs) ). Refer to the instructions below to configure the config file and save it.
3. Select "main" and click the "Run" button at the top.  
   Grant the necessary permissions and confirm that the configuration is correct (Execution started > completed).
4. Click the trigger button on the left side and add a new trigger.  
   Select the function to run: main  
   Select the event source: Time-driven  
   Select the type of time based trigger: Day timer  
   Select the time of day: recommended to choose any off-peak time between 0900 to 1500.

## Configuration

```javascript
const profiles = [
  { token: "ltoken=gBxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxCY;ltuid=26XXXXX20;", 
    genshin: true, 
    honkai_star_rail: true, 
    honkai_3: false, 
    accountName: "YOUR NICKNAME" }
];
```

<details>
<summary><b>hoyolab settings</b></summary>

1. **token** - Please enter the token for hoyolab check-in page.

   After entering the [hoyolab check-in page](https://www.hoyolab.com/circles), press F12 to enter the console.  
   Paste the following code and run it to get the token. Copy the token and fill it in "quotes".
   ```javascript
   function getCookie(name) {
     const value = `; ${document.cookie}`;
     const parts = value.split(`; ${name}=`);
     if (parts.length === 2) return parts.pop().split(';').shift();
   }
   let token = 'ltoken=' + getCookie('ltoken') + '; ltuid=' + getCookie('ltuid') + ';'
   let ask = confirm(token + '\n\nPress enter, then paste the token into your Google Apps Script Project');
   if (ask == true) {
     copy(token);
     msg = token;
   } else {
     msg = 'Cancel';
   }
   ```

2. **genshin**

   Whether to enable auto check in for Genshin Impact.  
   If you want, set it to true. If not, please set it to false.  
   If you do not play Genshin Impact, or your account is not bound to a uid, please set it to false.

3. **honkai_star_rail**

   Whether to enable auto check in for Honkai: Star Rail.  
   If you want, set it to true. If not, please set it to false.  
   If you do not play Honkai: Star Rail, or your account is not bound to a uid, please set it to false.

4. **honkai_3**

   Whether to enable auto check in for Honkai Impact 3rd.  
   If you want, set it to true. If not, please set it to false.  
   If you do not play Honkai Impact 3rd, or your account is not bound to a uid, please set it to false.

5. **accountName** - Please enter your customized nickname.

   Please enter your customized Discord or in-game nickname here.

</details>

<details>
<summary><b>discord notify settings (only for <a href="https://github.com/canaria3406/hoyolab-auto-sign/blob/main/src/main-discord.gs">Discord version</a>)</b></summary>

```javascript
const discord_notify = true
const myDiscordID = ""
const discordWebhook = "https://discord.com/api/webhooks/10xxxxxxxxxxxxxxx60/6aXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXnB"
```

1. **discord_notify**

   Whether to enable Discord notify.  
   If you want to enable auto check in notify, set it to true. If not, please set it to false.

2. **myDiscordID** - Please enter your Discord user ID.

   You can refer to [this article](https://support.discord.com/hc/en-us/articles/206346498) to find your Discord user ID.  
   Copy your Discord user ID and fill it in "quotes".  
   If you don't want to be tagged, leave the "quotes" empty.

3. **discordWebhook** - Please enter the Discord webhook for the server channel to send notify.

   You can refer to [this article](https://support.discord.com/hc/en-us/articles/228383668) to create a Discord webhook.  
   Copy the webhook URL and paste it in "quotes".

</details>

<details>
<summary><b>telegram notify settings (only for <a href="https://github.com/canaria3406/hoyolab-auto-sign/blob/main/src/main-telegram.gs">Telegram version</a>)</b></summary>

```javascript
const telegram_notify = true
const myTelegramID = "1XXXXXXX0"
const telegramBotToken = "6XXXXXXXXX:AAAAAAAAAAXXXXXXXXXX8888888888Peko"
```

1. **telegram_notify**

   Whether to enable Telegram notify.  
   If you want to enable auto check in notify, set it to true. If not, please set it to false.

2. **myTelegramID** - Please enter your Telegram ID.

   Use the `/getid` command to find your Telegram user ID by messaging [@IDBot](https://t.me/myidbot).  
   Copy your Telegram ID which like `1XXXXXXX0` and fill it in "quotes".  

3. **telegramBotToken** - Please enter your Telegram Bot Token.

   Use the `/newbot` command to create a new bot on Telegram by messaging [@BotFather](https://t.me/botfather).  
   Once you have finished creating the bot, you will receive your Telegram Bot Token, which like `110201543:AAHdqTcvCH1vGWJxfSeofSAs0K5PALDsaw`.  
   Copy your Telegram Bot Token and fill it in "quotes".  
   For more detailed instructions, you can refer to [this article](https://core.telegram.org/bots/features#botfather). 

</details>

## Demo

<details>
<summary><b>Enable Genshin Impact and Honkai: Star Rail auto check in, enable Discord notify, tag in Discord.</b></summary>

```javascript
const profiles = [
  { token: "ltoken=gBxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxCY;ltuid=26XXXXX20;", 
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
<summary><b>Enable Genshin Impact auto check in on accountA, Honkai Impact 3rd auto check in on accountB, enable Telegram notify.</b></summary>

```javascript
const profiles = [
  { token: "ltoken=gBxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxCY;ltuid=26XXXXX20;", 
    genshin: true, 
    honkai_star_rail: false, 
    honkai_3: false, 
    accountName: "accountA" },
  { token: "ltoken=gAxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxNA;ltuid=28XXXXX42;", 
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

## Changelog
2022-12-30 Project launched.  
2023-04-27 Add support for Honkai Impact 3rd, and Honkai: Star Rail.  
2023-04-27 Add switch for Discord notify.  
2023-05-28 Add Telegram notify support.