const profiles = [
  {
    token: "ltoken_v2=gBxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxCY; ltuid_v2=26XXXXX20;",
    genshin: true,
    honkai_star_rail: true,
    honkai_3: false,
    tears_of_themis: false,
    zenless_zone_zero: false,
    accountName: "YOUR NICKNAME"
  }
];

const telegram_notify = true
const myTelegramID = "1XXXXXXX0"
const telegramBotToken = ""

/** The above is the config. Please refer to the instructions on https://github.com/canaria3406/hoyolab-auto-sign/ for configuration. **/
/** The following is the script code. Please DO NOT modify. **/

const urlDict = {
  Genshin: 'https://sg-hk4e-api.hoyolab.com/event/sol/sign?lang=en-us&act_id=e202102251931481',
  Star_Rail: 'https://sg-public-api.hoyolab.com/event/luna/os/sign?lang=en-us&act_id=e202303301540311',
  Honkai_3: 'https://sg-public-api.hoyolab.com/event/mani/sign?lang=en-us&act_id=e202110291205111',
  Tears_of_Themis: 'https://sg-public-api.hoyolab.com/event/luna/os/sign?lang=en-us&act_id=e202308141137581',
  Zenless_Zone_Zero: 'https://sg-public-api.hoyolab.com/event/luna/zzz/os/sign?lang=en-us&act_id=e202406031448091'
};

/** 
  The below code is written due to the some game(s) requiring a extra header. 
  More info about it on :  https://github.com/canaria3406/hoyolab-auto-sign/issues/52 
**/
const headerDict = {
  default: {
    'Accept': 'application/json, text/plain, */*',
    'Accept-Encoding': 'gzip, deflate, br',
    'Connection': 'keep-alive',
    'x-rpc-app_version': '2.34.1',
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36',
    'x-rpc-client_type': '4',
    'Referer': 'https://act.hoyolab.com/',
    'Origin': 'https://act.hoyolab.com',
  },
  Genshin: {

  },
  Star_Rail: {

  },
  Honkai_3: {

  },
  Tears_of_Themis: {

  },
  Zenless_Zone_Zero: {
    'x-rpc-signgame': 'zzz',
  }
}

async function main(){
  const messages = await Promise.all(profiles.map(autoSignFunction));
  const hoyolabResp = `${messages.join('\n\n')}`

  if (telegram_notify && telegramBotToken && myTelegramID) {
    postWebhook(hoyolabResp);
  }
}

function autoSignFunction({
  token,
  genshin = false,
  honkai_star_rail = false,
  honkai_3 = false,
  tears_of_themis = false,
  zenless_zone_zero = false,
  accountName
}) {
  const urlsnheaders = [];

  if (genshin) urlsnheaders.push({ url: urlDict.Genshin, headers: { Cookie: token, ...headerDict["default"], ...headerDict["Genshin"]} });
  if (honkai_star_rail) urlsnheaders.push({ url: urlDict.Star_Rail, headers: { Cookie: token, ...headerDict["default"], ...headerDict["Star_Rail"]} });
  if (honkai_3) urlsnheaders.push({ url: urlDict.Honkai_3, headers: { Cookie: token, ...headerDict["default"], ...headerDict["Honkai_3"]} });
  if (tears_of_themis) urlsnheaders.push({ url: urlDict.Tears_of_Themis, headers: { Cookie: token, ...headerDict["default"], ...headerDict["Tears_of_Themis"]} });
  if (zenless_zone_zero) urlsnheaders.push({ url: urlDict.Zenless_Zone_Zero, headers: { Cookie: token, ...headerDict["default"], ...headerDict["Zenless_Zone_Zero"]} });

  const options = {
    method: 'POST',
    muteHttpExceptions: true,
  };

  let response = `Check-in completed for ${accountName}`;

  var sleepTime = 0
  const httpResponses = []
  for (const urlnheaders of urlsnheaders) {
    Utilities.sleep(sleepTime);
    httpResponses.push(UrlFetchApp.fetch(urlnheaders.url, { ...options, headers: urlnheaders.headers }));
    sleepTime = 1000;
  }

  for (const [i, hoyolabResponse] of httpResponses.entries()) {
    const responseJson = JSON.parse(hoyolabResponse);
    const checkInResult = responseJson.message;
    const gameName = Object.keys(urlDict).find(key => urlDict[key] === urlsnheaders[i].url)?.replace(/_/g, ' ');
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

  UrlFetchApp.fetch('https://api.telegram.org/bot' + telegramBotToken + '/sendMessage', options);
}
