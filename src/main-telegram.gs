/**--------------------------------------------------------------------------------------------------------------
IMPORTANT: Cookies Data should not be shared with anyone
First set environment variables by accessing Project Settings > Script Properties
Create the following secret properties: 
  i)token : ltoken_v2=gBxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxCY; ltuid_v2=26XXXXX20;
  ii)telegramBotToken : xxxxxxx |help : (https://medium.com/geekculture/generate-telegram-token-for-bot-api-d26faf9bf064) 
  iii)myTelegramID : 323098397 |help : (https://www.alphr.com/telegram-find-user-id/)
-----------------------------------------------------------------------------------------------------------------**/

const scriptProperties = PropertiesService.getScriptProperties();
const profiles = [
  {
    token: scriptProperties.getProperty('token'),//
    genshin: true,
    honkai_star_rail: true,
    honkai_3: false,
    accountName: "YOUR NICKNAME"
  }
];

const telegram_notify = true
const myTelegramID = scriptProperties.getProperty('myTelegramID')
const telegramBotToken = scriptProperties.getProperty('telegramBotToken')

/** The above is the config. Please refer to the instructions on https://github.com/canaria3406/hoyolab-auto-sign/ for configuration. **/
/** The following is the script code. Please DO NOT modify. **/

const urlDict = {
  Genshin: 'https://sg-hk4e-api.hoyolab.com/event/sol/sign?lang=en-us&act_id=e202102251931481',
  Star_Rail: 'https://sg-public-api.hoyolab.com/event/luna/os/sign?lang=en-us&act_id=e202303301540311',
  Honkai_3: 'https://sg-public-api.hoyolab.com/event/mani/sign?lang=en-us&act_id=e202110291205111'
};

async function main(){
  const messages = await Promise.all(profiles.map(autoSignFunction));
  const hoyolabResp = `${messages.join('\n\n')}`

  if (telegram_notify && telegramBotToken && myTelegramID) {
    postWebhook(hoyolabResp);
  }
}

function autoSignFunction({ token, genshin, honkai_star_rail, honkai_3, accountName }) {
  const urls = [];

  if (genshin) urls.push(urlDict.Genshin);
  if (honkai_star_rail) urls.push(urlDict.Star_Rail);
  if (honkai_3) urls.push(urlDict.Honkai_3);

  const header = {
    Cookie: token,
    'Accept': 'application/json, text/plain, */*',
    'Accept-Encoding': 'gzip, deflate, br',
    'Connection': 'keep-alive',
    'x-rpc-app_version': '2.34.1',
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36',
    'x-rpc-client_type': '4',
    'Referer': 'https://act.hoyolab.com/',
    'Origin': 'https://act.hoyolab.com'
  };

  const options = {
    method: 'POST',
    headers: header,
    muteHttpExceptions: true,
  };

  let response = `Check-in completed for ${accountName}`;

  const httpResponses = UrlFetchApp.fetchAll(urls.map(url => ({ url, ...options })));

  for (const [i, hoyolabResponse] of httpResponses.entries()) {
    const responseJson = JSON.parse(hoyolabResponse);
    const checkInResult = responseJson.message;
    const gameName = Object.keys(urlDict).find(key => urlDict[key] === urls[i])?.replace(/_/g, ' ');
    const bannedCheck = responseJson.data?.gt_result?.is_risk;

    if (bannedCheck) {
      response += `\n${gameName}: Auto check-in failed due to CAPTCHA blocking.`;
    } else {
      response += `\n${gameName}: ${checkInResult}`;
    }
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
    muteHttpExceptions: true
  };

  UrlFetchApp.fetch('https://api.telegram.org/bot' + telegramBotToken + '/sendMessage?', options);
}
