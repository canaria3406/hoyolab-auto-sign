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
* **Secure** - The script can be self-deployed to Google App Script, no worries about data leaks.
* **Free** - Google App Script is currently a free service.
* **Simple** - The script can run without a browser and will automatically notify you through Discord Webhook.

## Demo
If the auto check in process is success, it will send "OK".  
If you have already check in today, it will send "Traveler/Trailblazer/Captain, you've already checked in today"
![image](https://github.com/canaria3406/hoyolab-auto-sign/blob/main/pic/01.png)

## Setup
1. Go to [Google App Script](https://script.google.com/home/start) and create a new project with your custom name.
2. Select the editor and [paste the code](https://github.com/canaria3406/hoyolab-auto-sign/blob/main/src/main.gs). Refer to the instructions below to configure the config file and save it.
3. Select "main" and click the "Run" button at the top. Grant the necessary permissions and confirm that the configuration is correct (Execution started > completed).
4. Click the trigger button on the left side and add a new trigger.
   Select the function to run: main
   Select the event source: Time-driven
   Select the type of time based trigger: Day timer
   Select the time of day: recommended to choose any off-peak time between 0900 to 1500.

## Configuration

```javascript
const token = ""

const genshin = true
const honkai_star_rail = true
const honkai_3 = false

const discord_notify = true
const myDiscordID = ""
const myDiscordName = "YOUR NICKNAME"
const discordWebhook = ""
```

1. **token** - Please enter the token for hoyolab check-in page.

   After entering the [hoyolab check-in page](https://www.hoyolab.com/circles), press F12 to enter the console.  
   Paste the following code and run it to get the token. Copy the token and fill it in "quotes".
   ```javascript
   function getCookie(name) {
   const value = `; ${document.cookie}`;
   const parts = value.split(`; ${name}=`);
   if (parts.length === 2) return parts.pop().split(';').shift();
   }
   console.log('ltoken='+getCookie('ltoken')+'; ltuid='+getCookie('ltuid')+';');
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

5. **discord_notify**

   Whether to enable Discord notify.  
   If you want to enable auto check in notify, set it to true. If not, please set it to false.

6. **myDiscordID** - Please enter your Discord user ID.

   You can refer to [this article](https://support.discord.com/hc/en-us/articles/206346498) to find your Discord user ID. Copy your Discord user ID and fill it in "quotes".
   If you don't want to be tagged, leave the "quotes" empty.

7. **myDiscordName** - Please enter your customized nickname.

   If you leave the myDiscordID "quotes" empty, please enter your customized Discord name here.

8. **discordWebhook** - Please enter the Discord webhook for the server channel to send notify.

   You can refer to [this article](https://support.discord.com/hc/en-us/articles/228383668) to create a Discord webhook.
   Copy the webhook URL and paste it in "quotes".

## Example
Enable Honkai Impact 3rd auto check in, enable Discord notify, do not tag in Discord.
![image](https://github.com/canaria3406/hoyolab-auto-sign/blob/main/pic/02.png)

Enable Genshin Impact and Honkai: Star Rail auto check in, enable Discord notify, tag in Discord.
![image](https://github.com/canaria3406/hoyolab-auto-sign/blob/main/pic/03.png)

## Change Log
2022-12-30 Project launched.  
2023-04-27 Add support for Honkai Impact 3rd, and Honkai: Star Rail.  
2023-04-27 Add switch for Discord notify.  