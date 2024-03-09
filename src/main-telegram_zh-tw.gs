// 使用者資料和 Telegram 設定
const profiles = [
  {
    token: "account_mid_v2=1l9XXXXXXXXXX; account_id_v2=28XXXXXXX; ltoken_v2=v2_CANARIAXXXXXXXXXXXXXXX; ltmid_v2=1lXXXXXXX_XX; ltuid_v2=28XXXXXX;",
    genshin: true,
    honkai_star_rail: true,
    honkai_3: false,
    accountName: "您的暱稱"
  }
];

const telegram_notify = true;
const myTelegramID = "1XXXXXXX0";
const telegramBotToken = "";

// 不同遊戲的網址
const urlDict = {
  Genshin: 'https://sg-hk4e-api.hoyolab.com/event/sol/sign?lang=en-us&act_id=e202102251931481',
  Star_Rail: 'https://sg-public-api.hoyolab.com/event/luna/os/sign?lang=en-us&act_id=e202303301540311',
  Honkai_3: 'https://sg-public-api.hoyolab.com/event/mani/sign?lang=en-us&act_id=e202110291205111'
};

// 為每個使用者資料進行簽到的函式
function autoSignFunction(profile, urlDict) {
  Logger.log(`開始為 ${profile.accountName} 執行 autoSignFunction`);
  const urls = [];

  if (profile.genshin) urls.push(urlDict.Genshin);
  if (profile.honkai_star_rail) urls.push(urlDict.Star_Rail);
  if (profile.honkai_3) urls.push(urlDict.Honkai_3);

  // 初始化回應變數
  let response = `${profile.accountName} 的簽到已完成`;

  const options = {
    method: 'POST',
    headers: {
      Cookie: profile.token,
      'Accept': 'application/json, text/plain, */*',
      'Accept-Encoding': 'gzip, deflate, br',
      'Connection': 'keep-alive',
      'x-rpc-app_version': '2.34.1',
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36',
      'x-rpc-client_type': '4',
      'Referer': 'https://act.hoyolab.com/',
      'Origin': 'https://act.hoyolab.com'
    },
    muteHttpExceptions: true,
  };

  const httpResponses = UrlFetchApp.fetchAll(urls.map(url => ({ url, ...options })));

  for (const [i, hoyolabResponse] of httpResponses.entries()) {
    const responseJson = JSON.parse(hoyolabResponse);
    const checkInResult = responseJson.message;
    const gameName = Object.keys(urlDict).find(key => urlDict[key] === urls[i])?.replace(/_/g, ' ');
    const bannedCheck = responseJson.data?.gt_result?.is_risk;

    if (bannedCheck) {
      response += `\n${gameName}: 自動簽到因 CAPTCHA 阻擋而失敗。`;
    } else {
      response += `\n${gameName}: ${checkInResult}`;
    }
  }

  Logger.log(`為 ${profile.accountName} 完成 autoSignFunction`);
  return response;
}

// 發送訊息到 Telegram 的函式
function postWebhook(data) {
  Logger.log('開始執行 postWebhook 函式');
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
  Logger.log('完成 postWebhook 函式');
}

// 主函式
function main() {
  Logger.log('開始主函式');
  
  var messages = [];
  for (var i = 0; i < profiles.length; i++) {
    messages.push(autoSignFunction(profiles[i], urlDict));
  }
  var hoyolabResp = messages.join('\n\n');

  if (telegram_notify && telegramBotToken && myTelegramID) {
    Logger.log('正在發送訊息到 Telegram');
    postWebhook(hoyolabResp);
  }
  
  Logger.log('完成主函式');
}