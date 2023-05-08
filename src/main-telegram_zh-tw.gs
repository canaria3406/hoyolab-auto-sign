const token = "ltoken=gBxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxCY; ltuid=26XXXXX20;"

const genshin = true
const honkai_star_rail = true
const honkai_3 = false

const telegram_notify = true
const telegramBotToken = "6XXXXXXXXX:AAAAAAAAAAXXXXXXXXXX8888888888Peko"
const myTelegramID = "1XXXXXXX0"

/** 以上為設定檔，請參考 https://github.com/canaria3406/hoyolab-auto-sign/ 之說明進行設定**/
/** 以下為程式碼，請勿更動 **/

function main(){

  let hoyolabResp = autoSignFunction();

  if(telegram_notify == true){
    if(telegramBotToken){
      if(myTelegramID){
        postWebhook(hoyolabResp);
      }
    }
  }

}

function autoSignFunction() {

  const signurl_gs = "https://sg-hk4e-api.hoyolab.com/event/sol/sign?lang=zh-tw&act_id=e202102251931481"
  const signurl_hsr = "https://sg-public-api.hoyolab.com/event/luna/os/sign?lang=zh-tw&act_id=e202303301540311"
  const signurl_bh3 = "https://sg-public-api.hoyolab.com/event/mani/sign?lang=zh-tw&act_id=e202110291205111"

  const header = {
    Cookie: token
  };

  const options = {
    method: 'POST',
    headers: header,
    muteHttpExceptions: true,
  };

  let response = "";

  if(genshin == true){
    let hoyolabResponse_gs = UrlFetchApp.fetch(signurl_gs,options);
    response += JSON.parse(hoyolabResponse_gs).message + "\n";
  }

  if(honkai_star_rail == true){
    let hoyolabResponse_hsr = UrlFetchApp.fetch(signurl_hsr,options);
    response += JSON.parse(hoyolabResponse_hsr).message + "\n";
  }

  if(honkai_3 == true){
    let hoyolabResponse_bh3 = UrlFetchApp.fetch(signurl_bh3,options);
    response += JSON.parse(hoyolabResponse_bh3).message + "\n";
  }

  return response;
}

function postWebhook(data) {

  let payload = JSON.stringify({
    "chat_id": myTelegramID,
    "text": data,
    "parse_mode": "HTML"
  });

  const options = {
    method: 'POST',
    contentType: 'application/json',
    payload: payload,
    muteHttpExceptions: true,
  };

  UrlFetchApp.fetch("https://api.telegram.org/bot" + telegramBotToken + "/sendMessage", options);
}
