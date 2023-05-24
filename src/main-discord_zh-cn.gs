const profiles = [
  { token: "ltoken=gBxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxCY; ltuid=26XXXXX20;", 
    genshin: true, 
    honkai_star_rail: true, 
    honkai_3: false, 
    tears_of_themis: false,
    accountName: "你的名字" }
];

const discord_notify = {
  on_run: false,
  on_error: true
}
const myDiscordID = ""
const discordWebhook = ""

/** 以上为设定项，请参考 https://github.com/canaria3406/hoyolab-auto-sign 的说明进行设定**/
/** 以下为程序代码，请勿改动 **/

const urlDict = {
  Genshin: 'https://sg-hk4e-api.hoyolab.com/event/sol/sign?lang=zh-cn&act_id=e202102251931481',
  Star_Rail: 'https://sg-public-api.hoyolab.com/event/luna/os/sign?lang=zh-cn&act_id=e202303301540311',
  Honkai_3: 'https://sg-public-api.hoyolab.com/event/mani/sign?lang=zh-cn&act_id=e202110291205111',
  Tears_of_Themis: 'https://sg-public-api.hoyolab.com/event/luna/os/sign?lang=zh-cn&act_id=e202202281857121'
}

async function main() {

  const messages = await Promise.all(profiles.map(autoSignFunction));
  const hoyolabResp = `${discordPing(discord_notify.on_run)}\n${messages.join('\n\n')}`

  if(discordWebhook) {
    postWebhook(hoyolabResp);
  }

}

function discordPing(pingWanted) {
  if(pingWanted && myDiscordID) {
    return `<@${myDiscordID}> `;
  } else {
    return '';
  }
}

function autoSignFunction({ token, genshin, honkai_star_rail, honkai_3, tears_of_themis, accountName }) {

  const urls = [];

  if (genshin) urls.push(urlDict.Genshin);
  if (honkai_star_rail) urls.push(urlDict.Star_Rail);
  if (honkai_3) urls.push(urlDict.Honkai_3);
  if (tears_of_themis) urls.push(urlDict.Tears_of_Themis);

  const header = {
    Cookie: token
  };

  const options = {
    method: 'POST',
    headers: header,
    muteHttpExceptions: true,
  };

  let response = `${accountName} 的自动签到操作已完成`;

  const httpResponses = UrlFetchApp.fetchAll(urls.map(url => ({ url, ...options })));

  for (const [i, hoyolabResponse] of httpResponses.entries()) {
    const checkInResult = JSON.parse(hoyolabResponse).message;
    const enGameName = Object.keys(urlDict).find(key => urlDict[key] === urls[i]);
    switch (enGameName) {
      case 'Genshin':
      gameName = '原神';
      break;
      case 'Star_Rail':
      gameName = '星穹铁道';
      break;
      case 'Honkai_3':
      gameName = '崩坏三';
      break;
      case 'Tears_of_Themis':
      gameName = '未定事件簿';
      break;
    }
    const isError = checkInResult != "OK";
    response += `\n${gameName}: ${isError ? discordPing(discord_notify.on_error) : ""}${checkInResult}`;
  };

  return response;
}

function postWebhook(data) {

  let payload = JSON.stringify({
    'username': '自动签到',
    'avatar_url': 'https://i.imgur.com/LI1D4hP.png',
    'content': data
  });

  const options = {
    method: 'POST',
    contentType: 'application/json',
    payload: payload,
    muteHttpExceptions: true,
  };

  UrlFetchApp.fetch(discordWebhook, options);
}