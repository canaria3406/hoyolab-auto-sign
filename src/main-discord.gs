const profiles = [
  { token: "ltoken=gBxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxCY; ltuid=26XXXXX20;", 
    genshin: true, 
    honkai_star_rail: true, 
    honkai_3: false, 
    accountName: "YOUR NICKNAME" }
];

const discord_notify = true
const myDiscordID = ""
const discordWebhook = ""

/** The above is the config. Please refer to the instructions on https://github.com/canaria3406/hoyolab-auto-sign for configuration. **/
/** The following is the script code. Please DO NOT modify. **/

const urlDict = {
  Genshin: 'https://sg-hk4e-api.hoyolab.com/event/sol/sign?lang=en-us&act_id=e202102251931481',
  Star_Rail: 'https://sg-public-api.hoyolab.com/event/luna/os/sign?lang=en-us&act_id=e202303301540311',
  Honkai_3: 'https://sg-public-api.hoyolab.com/event/mani/sign?lang=en-us&act_id=e202110291205111'
}

function main() {

  let hoyolabResp = discordPing();

  profiles.forEach(profile => {
    hoyolabResp += autoSignFunction(profile) + '\n\n';
  });

  if(discord_notify == true) {
    if(discordWebhook) {
      postWebhook(hoyolabResp);
    }
  }

}

function discordPing() {
  if(discord_notify && myDiscordID) {
    return `<@${myDiscordID}>\n`;
  } else {
    return "";
  }
}

function autoSignFunction({ token, genshin, honkai_star_rail, honkai_3, accountName }) {

  const urls = [];

  if (genshin) urls.push(urlDict.Genshin);
  if (honkai_star_rail) urls.push(urlDict.Star_Rail);
  if (honkai_3) urls.push(urlDict.Honkai_3);

  const header = {
    Cookie: token
  };

  const options = {
    method: 'POST',
    headers: header,
    muteHttpExceptions: true,
  };

  let response = `Check-in completed for ${accountName}`;

  urls.forEach(url => {
    let hoyolabResponse = UrlFetchApp.fetch(url,options);
    const checkInResult = JSON.parse(hoyolabResponse).message;
    const gameName = Object.keys(urlDict).find(key => urlDict[key] === url)?.replace(/_/g, ' ');
    response += `\n${gameName}: ${checkInResult}`;
  });

  return response;
}

function postWebhook(data) {

  let payload = JSON.stringify({
    'username': 'auto-sign',
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
