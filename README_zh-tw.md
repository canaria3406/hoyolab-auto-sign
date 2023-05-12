<h1 align="center">
    <img width="120" height="120" src="pic/logo.svg" alt=""><br>
    hoyolab-auto-sign
</h1>

<p align="center">
    <img src="https://img.shields.io/github/license/canaria3406/hoyolab-auto-sign">
    <img src="https://img.shields.io/github/stars/canaria3406/hoyolab-auto-sign">
    <br><a href="https://github.com/canaria3406/hoyolab-auto-sign/blob/main/README_zh-tw.md">繁體中文</a>．<a href="https://github.com/canaria3406/hoyolab-auto-sign/blob/main/README.md">English</a>
</p>

hoyolab自動簽到script，每月約可自動領取60石，堪比蚊子腿。  
支援 原神、崩壞：星穹鐵道、崩壞3rd。

## 特色
* **輕巧** - 僅需少量的設定即可運作，程式碼僅90行
* **安全** - 自行部屬至Google Apps Script，不必擔心資料外洩的問題
* **免費** - Google Apps Script目前是免費使用的佛心服務
* **簡單** - 無須電腦瀏覽器即可自動幫你簽到，並由 Discord 或 Telegram 自動通知

## Demo
若自動簽到完成，則傳送 OK  
若今天已簽到過，則傳送 旅行者/開拓者/艦長，你已經簽到過了~  
![image](https://github.com/canaria3406/hoyolab-auto-sign/blob/main/pic/01.png)

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
  { token: "ltoken=gBxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxCY;ltuid=26XXXXX20;", 
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
   let token = 'ltoken=' + getCookie('ltoken') + '; ltuid=' + getCookie('ltuid') + ';'
   let ask = confirm(token + '\n\n按下確定，並將取得的token貼至Google Apps Script專案當中');
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

5. **accountName** - 請輸入你的暱稱

   請輸入你的Discord暱稱或遊戲暱稱，供通知使用。

</details>

<details>
<summary><b>discord 通知設定 (適用於 <a href="https://github.com/canaria3406/hoyolab-auto-sign/blob/main/src/main-discord_zh-tw.gs">Discord版</a>)</b></summary>

```javascript
const discord_notify = true
const myDiscordID = ""
const discordWebhook = "https://discord.com/api/webhooks/10xxxxxxxxxxxxxxx60/6aXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXnB"
```

1. **discord_notify**

   是否要進行Discord的自動簽到通知。若要進行自動簽到通知則為true，若不要請填入false。

2. **myDiscordID** - 請填入自己的 Discord ID

   Discord ID 取得方法可參考[此篇文章](https://www.tech-girlz.com/2022/02/discord-user-id-user-link.html)，複製ID並填入"括號內"即可。  
   若您不希望被tag，請讓"括號內"保持空白。
   
3. **discordWebhook** - 請填入發送通知的伺服器頻道之 Discord Webhook

   Discord Webhook 建立方式可參考[此篇文章](https://help.tumblr.com/hc/zh-hk/articles/4421081082775-Discord-Webhook)，複製webhook網址並填入"括號內"即可。

</details>

<details>
<summary><b>telegram 通知設定 (適用於 <a href="https://github.com/canaria3406/hoyolab-auto-sign/blob/main/src/main-telegram_zh-tw.gs">Telegram版</a>)</b></summary>

```javascript
const telegram_notify = true
const myTelegramID = "1XXXXXXX0"
const telegramBotToken = "6XXXXXXXXX:AAAAAAAAAAXXXXXXXXXX8888888888Peko"
```

1. **telegram_notify**

   是否要進行Telegram的自動簽到通知。若要進行自動簽到通知則為true，若不要請填入false。

2. **myTelegramID** - 請填入您的 Telegram ID.

   向 [@IDBot](https://t.me/myidbot) 傳送 `/getid` 指令以取得您的 Telegram ID，複製ID並填入"括號內"即可。

3. **telegramBotToken** - 請填入您的 Telegram Bot Token.

   向 [@BotFather](https://t.me/botfather) 傳送 `/newbot` 指令以建立新的 Telegram Bot。  
   當你建立 Telegram Bot 後，您會取得 Telegram Bot Token，看起來會像`110201543:AAHdqTcvCH1vGWJxfSeofSAs0K5PALDsaw`。  
   複製Token並填入"括號內"即可。  
   你可以參考[此篇文章](https://core.telegram.org/bots/features#botfather)以獲得更詳細的說明。

</details>

## Example 
進行 崩壞3rd 簽到、進行 Discord 通知、不進行 Discord tag  
![image](https://github.com/canaria3406/hoyolab-auto-sign/blob/main/pic/02.png)

進行 原神、崩壞：星穹鐵道 簽到、進行 Discord 通知、進行 Discord tag  
![image](https://github.com/canaria3406/hoyolab-auto-sign/blob/main/pic/03.png)

## Changelog
2022-12-30 專案公開  
2023-04-27 新增 崩壞：星穹鐵道、崩壞3rd 支援  
2023-04-27 新增 Discord 通知開關
2023-05-28 新增 Telegram 通知版本