/** This is an experimental code. **/

// User profiles and Notification settings
const profiles = [
  {
    token: "account_mid_v2=1l9XXXXXXXXXX; account_id_v2=28XXXXXXX; ltoken_v2=v2_CANARIAXXXXXXXXXXXXXXX; ltmid_v2=1lXXXXXXX_XX; ltuid_v2=28XXXXXX;",
    genshin: true,
    honkai_star_rail: true,
    honkai_3: false,
    accountName: "YOUR NICKNAME"
  }
];

const discord_notify = true;
const myDiscordID = "1XXXXXXX0";
const discordWebhook = "";

const telegram_notify = true;
const myTelegramID = "1XXXXXXX0";
const telegramBotToken = "";

/** The above is the config. Please refer to the instructions on https://github.com/canaria3406/hoyolab-auto-sign/ for configuration. **/
/** The following is the script code. Please DO NOT modify. **/

// URLs for different games
const urlDict = {
  Genshin: 'https://sg-hk4e-api.hoyolab.com/event/sol/sign?lang=en-us&act_id=e202102251931481',
  Star_Rail: 'https://sg-public-api.hoyolab.com/event/luna/os/sign?lang=en-us&act_id=e202303301540311',
  Honkai_3: 'https://sg-public-api.hoyolab.com/event/mani/sign?lang=en-us&act_id=e202110291205111'
};

// Function to sign in for each user profile
function autoSignFunction(profile, urlDict) {
  Logger.log(`Starting autoSignFunction for ${profile.accountName}`);
  const urls = [];

  if (profile.genshin) urls.push(urlDict.Genshin);
  if (profile.honkai_star_rail) urls.push(urlDict.Star_Rail);
  if (profile.honkai_3) urls.push(urlDict.Honkai_3);

  // Initialize response variable
  let response = `Check-in completed for ${profile.accountName}`;

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
      response += `\n${gameName}: Auto check-in failed due to CAPTCHA blocking.`;
    } else {
      response += `\n${gameName}: ${checkInResult}`;
    }
  }

  Logger.log(`Finished autoSignFunction for ${profile.accountName}`);
  return response;
}

// Function to send a message to Discord
function postWebhookDiscord(data) {
  Logger.log('Starting postWebhook function for Discord');
  let payload = JSON.stringify({
    'username': 'auto-sign',
    'avatar_url': 'https://i.imgur.com/LI1D4hP.png',
    'content': data
  });

  const options = {
    method: 'POST',
    contentType: 'application/json',
    payload: payload,
    muteHttpExceptions: true
  };

  UrlFetchApp.fetch(discordWebhook, options);
  Logger.log('Finished postWebhook function for Discord');
}

// Function to send a message to Telegram
function postWebhookTelegram(data) {
  Logger.log('Starting postWebhook function for Telegram');
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
  Logger.log('Finished postWebhook function for Telegram');
}

// Main function
function main() {
  Logger.log('Starting main function');
  
  var messages = [];
  for (var i = 0; i < profiles.length; i++) {
    messages.push(autoSignFunction(profiles[i], urlDict));
  }
  var hoyolabResp = messages.join('\n\n');

  if (discord_notify && discordWebhook) {
    Logger.log('Sending message to Discord');
    postWebhookDiscord(hoyolabResp);
  }

  if (telegram_notify && telegramBotToken && myTelegramID) {
    Logger.log('Sending message to Telegram');
    postWebhookTelegram(hoyolabResp);
  }
  
  Logger.log('Finished main function');
}