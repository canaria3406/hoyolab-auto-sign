<h1 align="center">
    <img width="150" height="150" src="pic/logo.svg" alt=""><br>
    Hoyolab-Auto-SignIn
</h1>

<p align="center">
    <img src="https://img.shields.io/github/license/canaria3406/hoyolab-auto-sign?style=flat-square">
    <img src="https://img.shields.io/github/stars/canaria3406/hoyolab-auto-sign?style=flat-square">
    <br><a href="/README_zh-tw.md">繁體中文</a>　<b>English</b>　<a href="/README_ru-ru.md">Русский</a>
</p>

A lightweight, secure, and free script that automatically collect HoYoLAB daily check in rewards.  
Supports Genshin Impact, Honkai Impact 3rd, and Honkai: Star Rail. Support multiple accounts.

## Features
* **Lightweight** - The script only requires minimal configuration and it's only around 110 lines of code.
* **Secure** - The script can be self-deployed to Google Apps Script, no worries about data leaks.
* **Free** - Google Apps Script is currently a free service.
* **Simple** - The script can run without a browser and will automatically notify you through Discord or Telegram.

## Setup
1. Go to [Google Apps Script](https://script.google.com/home/start) and create a new project with your custom name.
2. Select the editor and paste the code( [Discord version](https://github.com/canaria3406/hoyolab-auto-sign/blob/main/src/main-discord.gs) / [Telegram version](https://github.com/canaria3406/hoyolab-auto-sign/blob/main/src/main-telegram.gs) / [Experimental](https://github.com/canaria3406/hoyolab-auto-sign/blob/main/src/main-disc_tele.gs) ). Refer to the instructions below to configure the config file and save it.
3. Select "main" and click the "Run" button at the top.
   
   ![image](https://github.com/NatsumeAoii/hoyolab-auto-sign/blob/main/pic/E04.png)
4. Grant the necessary permissions and confirm that the configuration is correct (Execution started > completed).
5. Click the `Trigger` button on the left side / left tab and add a new trigger on `Add Trigger` button at bottom right.  
   Select the function to run: main  
   Select the event source: Time-driven  
   Select the type of time based trigger: Day timer  
   Select the time of day: recommended to choose any off-peak time between 09:00 to 15:00 or 09:00 AM to 03:00 PM.

## Configuration

```javascript
const profiles = [
  {
    token: "account_mid_v2=1l9XXXXXXXXXX; account_id_v2=28XXXXXXX; ltoken_v2=v2_CANARIAXXXXXXXXXXXXXXX; ltmid_v2=1lXXXXXXX_XX; ltuid_v2=28XXXXXX;",
    genshin: true,
    honkai_star_rail: true,
    honkai_3: true,
    accountName: "YOUR NAME"
  }
];
```

> HoYoLAB has changed the rules for tokens on July 2023, switching from the previous "ltoken" and "ltuid" to "ltoken_v2" and "ltuid_v2".  

> [!IMPORTANT]
> HoYoLAB has changed the cookie to HttpOnly cookie. It is no longer possible to read the cookies by using the getToken.js code.  
> Please use the method of manually copying the cookie to obtain the account_mid_v2, account_id_v2, ltoken_v2, ltmid_v2, and ltuid_v2.

<details>
<summary><b>HoYoLAB cookie settings</b></summary>

   **Follow this Intruction to get tokens**      
   1. Go to HoYoLAB (https://www.hoyolab.com/) and log in.
   2. Go to your profile page.
   3. Open the developer tools (F12 or Ctrl+Shift+I).
   4, Go to the "Network" tab.
   4. Click on the "Preserve Log" / "Persist Logs" button.
      
      ![image](https://github.com/NatsumeAoii/hoyolab-auto-sign/blob/main/pic/E05.png)  
   6. Refresh the page.
   7. Click on the getGameRecordCard request where the method is "GET" (it should be named "getGameRecordCard" with your HoYoLab UID).
      
      ![image](https://github.com/NatsumeAoii/hoyolab-auto-sign/blob/main/pic/E06.png)  
   8. Go to the "Cookies" tab.
   9.  Copy the "account_mid_v2", "account_id_v2", "ltoken_v2", "ltmid_v2", and "ltuid_v2"
      ![image](https://github.com/NatsumeAoii/hoyolab-auto-sign/blob/main/pic/E07.png)  

</details>

<details>
<summary><b>Discord notification settings (only for <a href="https://github.com/canaria3406/hoyolab-auto-sign/blob/main/src/main-discord.gs">Discord version</a>)</b></summary>

```javascript
const discord_notify = true
const myDiscordID = "20000080000000040"
const discordWebhook = "https://discord.com/api/webhooks/1050000000000000060/6aXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXnB"
```

1. **discord_notify**

   Whether to enable Discord notify.  
   If you want to enable auto check-in notify, set it to true. If not, please set it to false.

2. **myDiscordID** - Please enter your Discord user ID.

   Whether you want to be ping when there is an unsuccessful check-in.  
   Copy your Discord user ID which like `23456789012345678` and fill it in "quotes".  
   You can refer to [this article](https://support.discord.com/hc/en-us/articles/206346498) to find your Discord user ID.  
   If you don't want to be pinged, leave the "quotes" empty.

3. **discordWebhook** - Please enter the Discord webhook for the server channel to send notify.

   You can refer to [this article](https://support.discord.com/hc/en-us/articles/228383668) to create a Discord webhook.  
   Once you have finished creating the Discord webhook, you will receive your Discord webhook URL, which like `https://discord.com/api/webhooks/1234567890987654321/PekopekoPekopekoPekopeko06f810494a4dbf07b726924a5f60659f09edcaa1`.  
   Copy the webhook URL and paste it in "quotes".

</details>

<details>
<summary><b>Telegram notification settings (only for <a href="https://github.com/canaria3406/hoyolab-auto-sign/blob/main/src/main-telegram.gs">Telegram version</a>)</b></summary>

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
   Copy your Telegram ID which like `123456780` and fill it in "quotes".  

3. **telegramBotToken** - Please enter your Telegram Bot Token.

   Use the `/newbot` command to create a new bot on Telegram by messaging [@BotFather](https://t.me/botfather).  
   Once you have finished creating the bot, you will receive your Telegram Bot Token, which like `110201543:AAHdqTcvCH1vGWJxfSeofSAs0K5PALDsaw`.  
   Copy your Telegram Bot Token and fill it in "quotes".  
   For more detailed instructions, you can refer to [this article](https://core.telegram.org/bots/features#botfather). 

</details>

## Demo
If the auto check in process is success, it will send "OK".  
If you have already check in today, it will send "Traveler/Trailblazer/Captain, you've already checked in today"  

<details>
<summary><b>Single HoYoLAB account auto check-in with Discord notification and ping.</b></summary>
Enable Genshin Impact and Honkai: Star Rail auto check in, enable Discord notify, ping in Discord.

```javascript
/** Example **/
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
<summary><b>Two HoYoLAB accounts auto check-in with Telegram notification.</b></summary>
Enable Genshin Impact auto check-in on accountA, Honkai Impact 3rd auto check-in on accountB, enable Telegram notify.

```javascript
/** Example **/
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

## Changelog
- 2022-12-30: Project launched.
- 2023-04-27: Added support for Honkai Impact 3rd, and Honkai: Star Rail.
- 2023-04-27: Added switch for Discord notify.
- 2023-05-12: Updated get token process ([#2](https://github.com/canaria3406/hoyolab-auto-sign/pull/2)).
- 2023-05-12: Added Telegram notify support ([#3](https://github.com/canaria3406/hoyolab-auto-sign/pull/3)).
- 2023-05-13: Added support for multiple HoYoLAB accounts ([#4](https://github.com/canaria3406/hoyolab-auto-sign/pull/4)).
- 2024-02-02: Improved readability, maintainability and added an experimental version which have discord and telegram notification in 1 code.
