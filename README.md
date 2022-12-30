# hoyolab-genshin-auto-sign

## 特色
* **簡單** - 僅需少量的設定即可運作，程式碼僅約60行
* **安全** - 自行部屬至Google，不必擔心資料外洩的問題
* **免費** - Google App Script目前是免費使用的佛心服務
* **輕巧** - 不用開著電腦瀏覽器即可自動幫你簽到，並由Discord自動通知

## config檔設定

```javascript
const token = ""
const myDiscordID = ""
const discordWebhook = ""
```

由上到下依序為hoyolab簽到token、Discord ID、Discord Webhook連結

1. 請填入hoyolab簽到頁面的token  
   進入[hoyolab簽到頁面](https://act.hoyolab.com/ys/event/signin-sea-v3/index.html?act_id=e202102251931481)後，按F12進入console，  
   貼上以下程式碼後執行即可取得token，**請注意token包含分號;，須一併複製並貼入"括號"**
   ```javascript
   function getCookie(name) {
   const value = `; ${document.cookie}`;
   const parts = value.split(`; ${name}=`);
   if (parts.length === 2) return parts.pop().split(';').shift();
   }
   console.log('ltoken='+getCookie('ltoken')+'; ltuid='+getCookie('ltuid')+';');
   ```

2. 請填入自己的 Discord ID  
   Discord ID 取得方法可參考[此篇文章](https://www.tech-girlz.com/2022/02/discord-user-id-user-link.html)，複製ID並填入"括號"即可
   
3. 請填入藥發送通知的伺服器頻道之 Discord Webhook  
   Discord Webhook 連結建立請參考[此篇文章](https://help.tumblr.com/hc/zh-hk/articles/4421081082775-Discord-Webhook)，複製webhook網址並填入"括號"即可
