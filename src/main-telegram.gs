const token = "ltoken=gBxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxCY; ltuid=26XXXXX20;"

const genshin = true
const honkai_star_rail = true
const honkai_3 = false

const telegram_notify = true
const telegramBotToken = ""
const myTelegramID = "1XXXXXXX0"

/** The above is the config. Please refer to the instructions on https://github.com/canaria3406/hoyolab-auto-sign/ for configuration. **/
/** The following is the script code. Please DO NOT modify. **/

function main(){

  let hoyolabResp = autoSignFunction();

  if(telegram_notify == true) {
    if(telegramBotToken && myTelegramID) {
      postWebhook(hoyolabResp);
    }
  }

}

function autoSignFunction() {

  const signurl_gs = 'https://sg-hk4e-api.hoyolab.com/event/sol/sign?lang=en-us&act_id=e202102251931481'
  const signurl_hsr = 'https://sg-public-api.hoyolab.com/event/luna/os/sign?lang=en-us&act_id=e202303301540311'
  const signurl_bh3 = 'https://sg-public-api.hoyolab.com/event/mani/sign?lang=en-us&act_id=e202110291205111'

  const header = {
    Cookie: token
  };

  const options = {
    method: 'POST',
    headers: header,
    muteHttpExceptions: true,
  };

  let response = '';

  if(genshin == true) {
    let hoyolabResponse_gs = UrlFetchApp.fetch(signurl_gs,options);
    response += JSON.parse(hoyolabResponse_gs).message + '\n';
  }

  if(honkai_star_rail == true) {
    let hoyolabResponse_hsr = UrlFetchApp.fetch(signurl_hsr,options);
    response += JSON.parse(hoyolabResponse_hsr).message + '\n';
  }

  if(honkai_3 == true) {
    let hoyolabResponse_bh3 = UrlFetchApp.fetch(signurl_bh3,options);
    response += JSON.parse(hoyolabResponse_bh3).message + '\n';
  }

  return response;
}

function postWebhook(data) {

  let payload = JSON.stringify({
    'chat_id': myTelegramID,
    'text': data,
    'parse_mode': 'HTML'
  });

  const options = {
    method: 'POST',
    contentType: 'application/json',
    payload: payload,
    muteHttpExceptions: true,
  };

  UrlFetchApp.fetch('https://api.telegram.org/bot' + telegramBotToken + '/sendMessage', options);
}
