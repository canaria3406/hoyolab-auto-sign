const profiles = [
  { token: "", 
    gi: true, 
    hsr: true, 
    hi3: true, 
    accountName: "Tên của bạn" }
];

const telegram_notify = true
const myTelegramID = "1XXXXXXX0"
const telegramBotToken = ""

/** TẤT CẢ HƯỚNG DẪN VÀ BẢN QUYỀN THUỘC https://github.com/canaria3406/hoyolab-auto-sign **/
/** ĐÂY LÀ BẢN MOD THÔNG BÁO TRÊN TELEGRAM BẰNG TIẾNG VIỆT **/

const urlDict = {
  Genshin: 'https://sg-hk4e-api.hoyolab.com/event/sol/sign?lang=vi-vn&act_id=e202102251931481',
  Star_Rail: 'https://sg-public-api.hoyolab.com/event/luna/os/sign?lang=vi-vn&act_id=e202303301540311',
  Honkai_3: 'https://sg-public-api.hoyolab.com/event/mani/sign?lang=vi-vn&act_id=e202110291205111'
}

async function main(){

  const messages = await Promise.all(profiles.map(autoSignFunction));
  const hoyolabResp = `${messages.join('\n\n')}`

  if (telegram_notify && telegramBotToken && myTelegramID) {
    postWebhook(hoyolabResp);
  }

}

function autoSignFunction({ token, gi, hsr, hi3, accountName }) {

  const urls = [];

  if (hi3) urls.push(urlDict.Honkai_Impact_3);
  if (gi) urls.push(urlDict.Genshin_Impact);
  if (hsr) urls.push(urlDict.Honkai_Star_Rail);

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

  let response = `Đã diểm danh thành công cho tài khoản ${accountName}`;

  const httpResponses = UrlFetchApp.fetchAll(urls.map(url => ({ url, ...options })));

  for (const [i, hoyolabResponse] of httpResponses.entries()) {
    const responseJson = JSON.parse(hoyolabResponse)
    const checkInResult = responseJson.message;
    const codeinputGameName = Object.keys(urlDict).find(key => urlDict[key] === urls[i]);
    switch (codeinputGameName) {
      case 'Gensshin_Impact':
      gameName = '**Genshin Impact**';
      break;
      case 'Honkai_Star_Rail':
      gameName = '**Honkai: Star Rail**';
      break;
      case 'Honkai_Impact_3':
      gameName = '**Honkai Impact 3**';
      break;
    }
    const bannedCheck = responseJson.data?.gt_result?.is_risk;
    if (bannedCheck) {
      response += `\n${gameName}: Điểm danh không thành công do bị chặn CAPTCHA.`;
    } else {
      response += `\n${gameName}: ${checkInResult}`;
    }
  };

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
