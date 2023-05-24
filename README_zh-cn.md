<h1 align="center">
    <img width="120" height="120" src="pic/logo.svg" alt=""><br>
    hoyolab-auto-sign
</h1>

<p align="center">
    <img src="https://img.shields.io/github/license/canaria3406/hoyolab-auto-sign">
    <img src="https://img.shields.io/github/stars/canaria3406/hoyolab-auto-sign">
    <br><a href="https://github.com/canaria3406/hoyolab-auto-sign/blob/main/README_zh-tw.md">繁體中文</a>．<a href="https://github.com/canaria3406/hoyolab-auto-sign/blob/main/README_zh-cn.md">简体中文</a>．<a href="https://github.com/canaria3406/hoyolab-auto-sign/blob/main/README.md">English</a>
</p>

hoyolab自动签到脚本，每月约可领取60石，堪比蚊子腿。  
支持 原神、崩坏：星穹铁道、崩坏三。支持多账号。

## 特色
* **轻巧** - 仅需少量的设定即可操作，程式代码仅90行
* **安全** - 自行部署至Google Apps Script，不必担心资料外泄的问题
* **免费** - Google Apps Script目前是免费使用的良心服务
* **简单** - 无需电脑浏览器即可自动帮你签到，并由 Discord 或 Telegram 自动通知

## 配置
1. 進入[Google Apps Script](https://script.google.com/home/start)，新增專案，名稱可自訂。
2. 選擇編輯器，貼上程式碼( [Discord版](https://github.com/canaria3406/hoyolab-auto-sign/blob/main/src/main-discord_zh-tw.gs) / [Telegram版](https://github.com/canaria3406/hoyolab-auto-sign/blob/main/src/main-telegram_zh-tw.gs) )，並參考下述說明配置config檔，完成後儲存。
3. 在上方選擇main、點選上方的[**執行**]，並授予權限，確認配置是否正確(開始執行>執行完畢)。
4. 在左側選擇觸發條件，新增觸發條件  
   選擇您要執行的功能: main  
   選取活動來源: 時間驅動  
   選取時間型觸發條件類型: 日計時器  
   選取時段: 自行選擇，建議選擇0900~1500之離峰任意時段

## config檔設定

```javascript
const profiles = [
  { token: "ltoken=gBxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxCY; ltuid=26XXXXX20;", 
    genshin: true, 
    honkai_star_rail: true, 
    honkai_3: false, 
    accountName: "你的名子" }
];
```

<details>
<summary><b>hoyolab 設定</b></summary>

1. **token** - 請填入hoyolab簽到頁面的token

   進入[hoyolab簽到頁面](https://www.hoyolab.com/circles)後，按F12進入console，  
   貼上以下程式碼後執行即可取得token，**請注意token包含分號;，須一併複製並貼入"括號內"**
   ```javascript
   function getCookie(name) {
     const value = `; ${document.cookie}`;
     const parts = value.split(`; ${name}=`);
     if (parts.length === 2) return parts.pop().split(';').shift();
   }
   let token = 'ltoken=' + getCookie('ltoken') + '; ltuid=' + getCookie('ltuid') + ';';
   let ask = confirm(token + '\n\n按下確定複製，並將取得的token貼至Google Apps Script專案當中');
   if (ask == true) {
     copy(token);
     msg = token;
   } else {
     msg = 'Cancel';
   }
   ```

2. **genshin**

   是否要進行 **原神** 的自動簽到。若要進行自動簽到則為true，若不要請填入false。  
   若您沒有遊玩**原神**，或帳號未綁定uid，請填寫false。

3. **honkai_star_rail**

   是否要進行 **崩壞：星穹鐵道** 的自動簽到。若要進行自動簽到則為true，若不要請填入false。  
   若您沒有遊玩**崩壞：星穹鐵道**，或帳號未綁定uid，請填寫false。

4. **honkai_3**

   是否要進行 **崩壞3rd** 的自動簽到。若要進行自動簽到則為true，若不要請填入false。  
   若您沒有遊玩**崩壞3rd**，或帳號未綁定uid，請填寫false。

5. **accountName** - 请输入你的昵称

   请输入你的Hoyolab昵称或游戏内昵称，供通知使用。

</details>

<details>
<summary><b>discord 通知设置 (适用于 <a href="https://github.com/canaria3406/hoyolab-auto-sign/blob/main/src/main-discord_zh-tw.gs">Discord版</a>)</b></summary>

```javascript
const discord_notify = {
  on_run: false,
  on_error: true
}
const myDiscordID = "20000080000000040"
const discordWebhook = "https://discord.com/api/webhooks/1050000000000000060/6aXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXnB"
```

1. **discord_notify**

   是否要进行Discord的自动签到tag。  
   如果希望每次执行时都被tag，请将 `on_run` 设定为 true。如果不需要每次执行时都被tag，请将其设定为 false。  
   如果希望在执行失败时被tag，请将 `on_error` 设定为 true。如果不需要在执行失败被tag，请将其设定为 false。

2. **myDiscordID** - 请填入自己的 Discord ID

   Discord ID 取得方法可参考[此篇文章](https://www.tech-girlz.com/2022/02/discord-user-id-user-link.html)。  
   你的 Discord ID 看起来会像`23456789012345678`，复制ID并填入"括号内"即可。  
   若您不希望被tag，请让"括号内"保持空白。
   
3. **discordWebhook** - 请填入发送通知的服务器频道之 Discord Webhook

   Discord Webhook 建立方式可参考[此篇文章](https://help.tumblr.com/hc/zh-hk/articles/4421081082775-Discord-Webhook)。  
   当你建立 Discord Webhook 后，您会取得 Discord Webhook 网址，看起来会像`https://discord.com/api/webhooks/1234567890987654321/PekopekoPekopekoPekopeko06f810494a4dbf07b726924a5f60659f09edcaa1`。  
   复制 Webhook 網址 并填入"括号内"即可。

</details>

<details>
<summary><b>telegram 通知设定 (适用于 <a href="https://github.com/canaria3406/hoyolab-auto-sign/blob/main/src/main-telegram_zh-tw.gs">Telegram版</a>)</b></summary>

```javascript
const telegram_notify = true
const myTelegramID = "1XXXXXXX0"
const telegramBotToken = "6XXXXXXXXX:AAAAAAAAAAXXXXXXXXXX8888888888Peko"
```

1. **telegram_notify**

   是否要进行Telegram的自动签到通知。若要进行自动签到通知則為true，若不要请填入false。

2. **myTelegramID** - 请填入您的 Telegram ID.

   向 [@IDBot](https://t.me/myidbot) 发送 `/getid` 指令以取得您的 Telegram ID，  
   你的 Telegram ID 看起来会像`123456780`，复制并填入"括号内"即可。

3. **telegramBotToken** - 请填入您的 Telegram Bot Token.

   向 [@BotFather](https://t.me/botfather) 发送 `/newbot` 指令以建立新的 Telegram Bot。  
   当你建立 Telegram Bot 后，您会取得 Telegram Bot Token，看起来会像`1145141919810:AAHomo11c4v5C1H41s0K5PALDsaw`。  
   复制Token并填入"括号内"即可。  
   你可以参考[此篇文章](https://core.telegram.org/bots/features#botfather)以取得更详细的说明。

</details>

## Demo
若自动签到完成，则发送 OK  
若今天已签到过，則发送 旅行者/开拓者/船长，你已经签到过了~  

<details>
<summary><b>范例 单账号自动签到、进行 Discord 通知、进行 Discord tag</b></summary>
进行原神及星穹铁道自动签到、进行 Discord 通知、进行 Discord tag

```javascript
const profiles = [
  { token: "ltoken=gBxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxCY; ltuid=26XXXXX20;", 
    genshin: true, 
    honkai_star_rail: true, 
    honkai_3: false, 
    accountName: "胡桃" }
];

const discord_notify = true
const myDiscordID = "240000800000300040"
const discordWebhook = "https://discord.com/api/webhooks/10xxxxxxxxxxxxxxx60/6aXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXnB"
```
![image](https://github.com/canaria3406/hoyolab-auto-sign/blob/main/pic/Z02.png)

</details>

<details>
<summary><b>举例 多账号自动签到、进行 Telegram 通知</b></summary>
以账号A进行原神自动签到、以账号B進行崩壞3自动签到、进行 Telegram 通知

```javascript
const profiles = [
  { token: "ltoken=gBxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxCY; ltuid=26XXXXX20;", 
    genshin: true, 
    honkai_star_rail: false, 
    honkai_3: false, 
    accountName: "账号A" },
  { token: "ltoken=gAxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxNA; ltuid=28XXXXX42;", 
    genshin: false, 
    honkai_star_rail: false, 
    honkai_3: true, 
    accountName: "账号B" }
];

const telegram_notify = true
const myTelegramID = "1XXXXXXX0"
const telegramBotToken = "6XXXXXXXXX:AAAAAAAAAAXXXXXXXXXX8888888888Peko"
```
![image](https://github.com/canaria3406/hoyolab-auto-sign/blob/main/pic/Z03.png)

</details>

## Changelog
2022-12-30 公开源代码  
2023-04-27 新增 崩坏：星穹铁道、崩坏三 支持  
2023-04-27 新增 Discord 通知开关  
2023-05-12 更新 getToken 函式[#2](https://github.com/canaria3406/hoyolab-auto-sign/pull/2)  
2023-05-12 新增 Telegram 版本[#3](https://github.com/canaria3406/hoyolab-auto-sign/pull/3)  
2023-05-13 支持多账号[#4](https://github.com/canaria3406/hoyolab-auto-sign/pull/4)
