# hoyolab-genshin-auto-sign
hoyolab自動簽到script，每月約可自動領取60原石，堪比蚊子腿

## 特色
* **簡單** - 僅需少量的設定即可運作，程式碼僅約60行
* **安全** - 自行部屬至Google，不必擔心資料外洩的問題
* **免費** - Google App Script目前是免費使用的佛心服務
* **輕巧** - 無須電腦瀏覽器即可自動幫你簽到，並由Discord自動通知

## Demo

若自動簽到完成，則傳送 OK  
若今天已簽到過，則傳送 旅行者，你已經簽到過了~  
![image](https://github.com/canaria3406/hoyolab-genshin-auto-sign/blob/main/01.png)

## 配置

1. 進入[Google App Script](https://script.google.com/home/start)，新增專案
2. 選擇編輯器，貼上[程式碼](https://github.com/canaria3406/hoyolab-genshin-auto-sign/blob/main/src/main.gs)，並參考下述說明配置config檔，完成後儲存
3. 選擇觸發條件，新增觸發條件  
   選擇您要執行的功能: main  
   選取活動來源: 時間驅動  
   選取時間型觸發條件類型: 日計時器  
   選取時段: 自行選擇，建議選擇1000~1600之離峰任意時段

## config檔設定

```javascript
const token = ""
const myDiscordID = ""
const discordWebhook = ""
```

由上到下依序為hoyolab簽到token、Discord ID、Discord Webhook連結

1. **請填入hoyolab簽到頁面的token**  
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

2. **請填入自己的 Discord ID**  
   Discord ID 取得方法可參考[此篇文章](https://www.tech-girlz.com/2022/02/discord-user-id-user-link.html)，複製ID並填入"括號"即可
   
3. **請填入發送通知的伺服器頻道之 Discord Webhook**  
   Discord Webhook 建立方式可參考[此篇文章](https://help.tumblr.com/hc/zh-hk/articles/4421081082775-Discord-Webhook)，複製webhook網址並填入"括號"即可
